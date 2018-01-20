/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import auth0 from 'auth0-js';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Register.css';

const auth0Config = {
  domain: 'icox.auth0.com',
  clientID: 'r95U770a_EpMnBzUcvtT6b92cusI3A_7',
  redirectUri: 'http://localhost:3000/callback',
  audience: 'https://icox.auth0.com/api/v2/',
  responseType: 'token id_token',
  scope: 'openid email profile',
  nonce: '12345',
};

class Register extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.auth = new auth0.WebAuth(auth0Config);
  }

  login() {
    this.auth.authorize();
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <button onClick={() => this.login()}>Log In</button>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Register);
