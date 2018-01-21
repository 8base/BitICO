/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import axios from 'axios';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LinearProgress from 'material-ui/LinearProgress';
import {Row, Col, Container} from 'react-grid-system';

import s from "./ViewToken.css";
import TokenFields from './../../data/ui-models/TokenFields';


class Admin extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      record: {},
      completed: 0,
    }
  }

  componentDidMount () {

    this.timer = setTimeout(() => this.progress(5), 1000);

    const credentials = JSON.parse(localStorage.getItem("icox_key"));
    const id = parseInt(window.location.href.match(/\/(\d)$/)[1], 10);

    const params = {
      method: 'GET',
      url: `/token/${id}`,
      headers: {
        authorization: `Bearer ${credentials.access_token}`,
        id_token: credentials.id_token,
      }
    };

    axios(params).then(response => {

      const record = response.data.data || {};
      this.setState({record})
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }


  progress(completed) {
    if (completed > 100) {
      this.setState({completed: 100});
    } else {
      this.setState({completed});
      const diff = Math.random() * 10;
      this.timer = setTimeout(() => this.progress(completed + diff), 1000);
    }
  }

  render() {

    if (!this.state.record.tokenName) {
      return (
        <div>
          Loading
        </div>
      )
    }

    return (

      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.state.record.tokenName}</h1>

          <LinearProgress mode="determinate" value={this.state.completed} />

          <Container>
            <Row>
              <Col sm={4}>
                <h4 className={s["info-h4"]}>{TokenFields.btcValuePerToken.name}</h4>
                <p className={s["info-p"]}>{this.state.record.btcValuePerToken}</p>
              </Col>
              <Col sm={4}>
                <h4 className={s["info-h4"]}>{TokenFields.allocation.name}</h4>
                <p className={s["info-p"]}>{this.state.record.allocation}</p>
              </Col>
              <Col sm={4}>
                <h4 className={s["info-h4"]}>{TokenFields.softCap.name}</h4>
                <p className={s["info-p"]}>{this.state.record.softCap}</p>
              </Col>
            </Row>
            <Row>
              <Col sm={4}>
                <h4 className={s["info-h4"]}>{TokenFields.hardCap.name}</h4>
                <p className={s["info-p"]}>{this.state.record.hardCap}</p>
              </Col>
              <Col sm={4}>
                <h4 className={s["info-h4"]}>{TokenFields.fundStartDate.name}</h4>
                <p className={s["info-p"]}>{TokenFields.fundStartDate.format(this.state.record.fundStartDate)}</p>
              </Col>
              <Col sm={4}>
                <h4 className={s["info-h4"]}>{TokenFields.fundEndDate.name}</h4>
                <p className={s["info-p"]}>{TokenFields.fundEndDate.format(this.state.record.fundEndDate)}</p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Admin);
