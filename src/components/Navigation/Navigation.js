/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';

class Navigation extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount () {
    const isLoggedIn = !!localStorage.getItem("icox_key");
    this.setState({
      isLoggedIn
    })
  }

  render() {

    return (
      <div className={s.root} role="navigation">
        <Link className={s.link} to="/about">
          About
        </Link>
        {/* <Link className={s.link} to="/contact"> */}
          {/* Contact */}
        {/* </Link> */}
        <Link className={s.link} to="/list-tokens">
          Newest Tokens
        </Link>
        {/* <span className={s.spacer}> | </span> */}

        {
          this.state.isLoggedIn ? <Link className={s.link} to="/admin">Create Token</Link> : null
        }


        {/* </Link> */}
        {/* <span className={s.spacer}>or</span> */}
        <Link className={cx(s.link, s.highlight)} to="/login">
          Start Your ICO
        </Link>
      </div>
    );
  }
}

export default withStyles(s)(Navigation);
