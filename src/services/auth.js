import jwt, { UnauthorizedError } from "express-jwt"
import JWTVerify from "./jwtVerify";
import users from "./users"

const jwksRsa = require('jwks-rsa');

// const jwt = require('express-jwt');

const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://icox.auth0.com/.well-known/jwks.json`,
  }),

  requestProperty: 'auth',

  // Validate the audience and the issuer.
  audience: 'https://icox.auth0.com/api/v2/',
  issuer: `https://icox.auth0.com/`,
  algorithms: ['RS256'],
});


const authUser = (req, res, next) => {
  checkJwt(req, res, async () => {
    const idToken = req.header("id_token");
    if (!idToken) {
      return next(new UnauthorizedError("id_token", { message: "Id token is missing" }));
    }

    const verify = new JWTVerify();
    await verify.updateKeys();
    verify.validate(idToken, async (err, data) => {
      if (err) {
        return next(new UnauthorizedError("id_token", err));
      }

      req.user = await users.findOrCreateUser(data);
      next();

      return null;
    });

    return null;
  });

};

export default authUser;
