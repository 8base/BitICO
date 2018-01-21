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
import config from './../../config';

class Register extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.auth = new auth0.WebAuth(config.auth0);
  }

  componentDidMount() {

    if (window.location.hash.length === 0) {
      return;
    }

    const credentials = {};

    window.location.hash.split(/&|#/).forEach((item) => {
      if (item.indexOf("=") > -1) {
        const keyPair = item.split('=');
        credentials[keyPair[0]] = keyPair[1];
      }
    });

    localStorage.setItem("icox_key", JSON.stringify(credentials));
    window.location.pathname = "/admin";
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
