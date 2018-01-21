/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';
import Link from '../Link';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <span className={s.text}>© ICOX</span>
          <span className={s.spacer}>·</span>
          <Link className={s.link} to="/">
            Home
          </Link>
          <span className={s.spacer}>·</span>
          <Link className={s.link} to="/privacy">
            Privacy
          </Link>
          <span className={s.spacer}>·</span>
          <span className={s.link} style={{cursor: "pointer"}}>Log Out</span>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Footer);
