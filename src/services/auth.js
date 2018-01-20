const jwksRsa = require('jwks-rsa');
const jwt = require('express-jwt');

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

  // Validate the audience and the issuer.
  audience: 'https://icox.auth0.com/api/v2/',
  issuer: `https://icox.auth0.com/`,
  algorithms: ['RS256'],
});


export default checkJwt;
