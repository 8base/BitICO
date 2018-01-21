/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import RaisedButton from "material-ui/RaisedButton";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';

class Home extends React.Component {

  render() {
    return (
      <div>
        <div className={s.banner}>
          <h1 className={s.bannerTitle}>Start Your Own Bitcoin<br /> Powered ICO</h1>
          <p className={s.bannerDesc}>Using the power of smart contracts and asset tokenization</p>
          <a href="/login">
            <RaisedButton label="Get Started" secondary style={{marginTop:"0.5em"}}/>
          </a>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
