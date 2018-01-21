/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { UnauthorizedError as Jwt401Error } from 'express-jwt';
import fetch from 'node-fetch';
import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import createFetch from './createFetch';
import router from './router';
import models from './data/models';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import config from './config';
import authUser from "./services/auth";
import {allTokens, createToken, myTokens, tokenById} from "./services/tokens"

const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
/*
app.use(
  expressJwt({
    secret: config.auth.jwt.secret,
    credentialsRequired: false,
    getToken: req => req.cookies.id_token,
  }),
);
*/
// Error handler for express-jwt
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  if (err instanceof Jwt401Error) {
    console.error('[express-jwt-error]', req.cookies.id_token);
    // `clearCookie`, otherwise user can't use web-app until cookie expires
    res.clearCookie('id_token');
  }
  next(err);
});

// app.use(passport.initialize());

if (__DEV__) {
  app.enable('trust proxy');
}
/*
app.get(
  '/login/facebook',
  passport.authenticate('facebook', {
    scope: ['email', 'user_location'],
    session: false,
  }),
);
app.get(
  '/login/facebook/return',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    session: false,
  }),
  (req, res) => {
    const expiresIn = 60 * 60 * 24 * 180; // 180 days
    const token = jwt.sign(req.user, config.auth.jwt.secret, { expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  },
);
*/



app.get("/test", authUser, (req, res) => {
  res.send("asd");
});


app.post("/token/create", authUser, createToken);
app.get("/tokens", authUser, allTokens);
app.get("/my-tokens", authUser, myTokens);
app.get("/token/:tokenId", authUser, tokenById);

// app.use(checkJwt);

const RSKTest = () => {
  var now = new Date();
  var RSKService = require('./services/RSKService').default;
  console.log("starting...");  
  var rskService = new RSKService(0x0e082742330d4a06ef127ca89f78f7283141c572", "923b6888e648c22a69fbb4afe985fe90d61c6c3f5d84b62025e358bb8fcf1776");
  console.log("rskService done");
  /*var crowdsaleInstance = await rskService.deployCrowdsale({
    tokenName: "My Token", 
    tokenSymbol: "TKN",
    startTime: new Date(now.getTime() + 30 * 1000),
    endTime: new Date(2018, 2, 0), 
    rate: 1,
    goal: 4,
    cap: 8,
    wallet: "0x0e082742330d4a06ef127ca89f78f7283141c572",
    onSent: (contract) => {
      console.log("Contract sent");
    },
  });
  console.log('Mined: ', crowdsaleInstance.address);*/
  // rskService.loadCrowdsaleAt("0x143e692b0f131a0fa173705858b734e5527502c9");
  //console.log(rskService.token);
  // console.log(rskService.buyTokens("0x0e082742330d4a06ef127ca89f78f7283141c572", 1e-18));  
  // console.log(rskService.tokenBalance("0x0e082742330d4a06ef127ca89f78f7283141c572"));
  console.log("account: ", personal.newAccount("passphrase"));
}

const BTCTest = () => {
  const BTCService = new BTCService();
  const balance = BTCService.getBalance("mybLjNKLvHdvpqgSVnKFhpiMtfsgTzX9RQ");
  console.log("balance: ", balance);
}

app.get('/test', async (req, res, next) => {
  BTCTest();
  res.send('done');
});

//
// Register API middleware
// -----------------------------------------------------------------------------
/* app.post(
  '/graphql',
  checkJwt,
  expressGraphQL(async req =>  {
      const idToken = req.headers.id_token;

      const verify = new JWTVerify();
      await verify.updateKeys();
      verify.validate(idToken, (err, data) => {
        console.log("err = ", err);
        console.log("data = ", data);

      });

      return {
        schema,
        graphiql: __DEV__,
        rootValue: { request: req },
        pretty: __DEV__,
      }
    },
  )
); */




//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const css = new Set();

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
      // Universal HTTP client
      fetch: createFetch(fetch, {
        baseUrl: config.api.serverUrl,
        cookie: req.headers.cookie,
      }),
    };

    const route = await router.resolve({
      ...context,
      pathname: req.path,
      query: req.query,
    });

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };

    data.children = ReactDOM.renderToString(

      <App context={context}>{route.component}</App>,

    );

    data.styles = [{ id: 'css', cssText: [...css].join('') }];
    data.scripts = [assets.vendor.js];
    if (route.chunks) {
      data.scripts.push(...route.chunks.map(chunk => assets[chunk].js));
    }
    data.scripts.push(assets.client.js);
    data.app = {
      apiUrl: config.api.clientUrl,
    };

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});



//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
    {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
// const promise = models.sync().catch(err => console.error(err.stack));
models.initRelations();
if (!module.hot) {
  app.listen(config.port, () => {
    console.info(`The server is running at http://localhost:${config.port}/`);
  });
/*
  promise.then(() => {
    app.listen(config.port, () => {
      console.info(`The server is running at http://localhost:${config.port}/`);
    });
  });
*/
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

export default app;
