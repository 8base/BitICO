import * as jwkToPem from "jwk-to-pem";

const request = require("request");

const jwt = require("jsonwebtoken");

class JWTVerify {
  tokenExpiration = null;
  iss = null;
  pems = null;
  iss = `https://icox.auth0.com/`;

  updateKeys () {
    if (this.pems != null) {
      return this.pems;
    }
    return new Promise(resolve => {
      request(`https://icox.auth0.com/.well-known/jwks.json`, (error, response) => {
        if (!error && response.statusCode === 200) {
          this.pems = {};
          const body = JSON.parse(response.body);
          this.populateKeys(body);
          resolve();
        } else {
          throw new Error("Can't download jwks.json");
        }
      });
    });
  }

  populateKeys(body) {
    const { keys } = body;

    // Convert each key to PEM
    for (let i = 0; i < keys.length; i+=1) {
      const keyId = keys[i].kid;
      const modulus = keys[i].n;
      const exponent = keys[i].e;
      const keyType = keys[i].kty;
      const jwk = { kty: keyType, n: modulus, e: exponent };
      const pem = jwkToPem(jwk);
      this.pems[keyId] = pem;
    }

  }

  validate(accessKey, callback) {
    const decodedJwt = jwt.decode(accessKey, { complete: true });

    if (!decodedJwt) {
      return callback(new Error(`Not a valid JWT token`), null);
    }

    if (decodedJwt.payload.iss !== this.iss) {
      return callback(new Error(`token is not from your User Pool`), null);
    }


    const { kid } = decodedJwt.header;
    const pem = this.pems[kid];

    if (!pem) {
      return callback(new Error(`Invalid id token`), null);
    }

    jwt.verify(
      accessKey,
      pem,
      {
        issuer: this.iss,
        maxAge: this.tokenExpiration
      },
      (err, payload) => {
        if (err) {
          if (err instanceof jwt.TokenExpiredError) {
            return callback(new Error(err.message), null);
          }
            return callback(new Error(err.message), null);

        }
        return callback(null, payload);
      }
    );

    return null;
  }
}


export default JWTVerify;
