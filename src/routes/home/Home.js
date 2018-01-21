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
import s from './Home.css';

class Home extends React.Component {

  render() {
    return (
      <div className={s.root}>
        <div className={s.banner}>
          <h1 className={s.bannerTitle}>Smart contracts on Bitcoin</h1>
          <p className={s.bannerDesc}>Use Bitcoin for your next ICO</p>
        </div>
        <div className={s.container}>
          <h1>React.js News</h1>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
