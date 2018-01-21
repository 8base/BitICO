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
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Row, Col, Container} from 'react-grid-system';
import numeral from "numeral";
import LinearProgress from 'material-ui/LinearProgress';
import s from "./ViewToken.css";
import TokenFields from './../../data/ui-models/TokenFields';


class ViewToken extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      record: {},
      purchase: "",
      userBTCBalance: "",
    }
  }

  componentDidMount () {

    const credentials = JSON.parse(localStorage.getItem("icox_key"));

    const id = parseInt(window.location.pathname.match(/(\d*)$/)[1], 10);

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

    }).catch(error => {
      console.log(error);
    });

    setInterval(()=>{
      this.getTokenBalance();
      this.getUserBTCBalance();
    }, 5000);
  }

  onPurchaseInputChange (e) {
    this.setState({
      purchase: e.target.value
    })
  }

  getTokenBalance () {

    const credentials = JSON.parse(localStorage.getItem("icox_key"));
    const id = parseInt(window.location.pathname.match(/(\d*)$/)[1], 10);

    const params = {
      method: 'GET',
      url: `/fetch-balance/token/${id}`,
      headers: {
        authorization: `Bearer ${credentials.access_token}`,
        id_token: credentials.id_token,
      }
    };

    axios(params).then(response => {

      const record = this.state.record;
      record.userTokenBalance = parseFloat(response.data.data);

      this.setState({
        record: record
      });

      console.log("Token Balance", response);
    }).catch(error => {
      console.log(error);
    })
  }

  getUserBTCBalance () {

    const credentials = JSON.parse(localStorage.getItem("icox_key"));

    const params = {
      method: 'GET',
      url: `/fetch-balance/btc`,
      headers: {
        authorization: `Bearer ${credentials.access_token}`,
        id_token: credentials.id_token,
      }
    };

    axios(params).then(response => {
      console.log("BTC Balance ", response);
    }).catch(error => {
      console.log(error);
    })
  }

  makePurchase () {

    const credentials = JSON.parse(localStorage.getItem("icox_key"));

    const params = {
      method: 'POST',
      url: `/token/${this.state.record.id}/purchase/${numeral(this.state.purchase).value()}`,
      headers: {
        authorization: `Bearer ${credentials.access_token}`,
        id_token: credentials.id_token,
      },
    };

    axios(params).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error);
    })
  }

  render() {

    if (!this.state.record.tokenName) {
      return (
        <div className={s.root}>
          <div className={s.container}>
          <h4 className={s["info-h4"]}>Total Funding Raised</h4>
          <p className={s["info-p"]}>Loading</p>
          </div>
        </div>
      )
    }

    const totalMoney = parseFloat(this.state.record.hardCap);

    return (

      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.state.record.tokenName} ({this.state.record.tokenTicker})</h1>

          <h4 className={s["info-h4"]}>Total Funding Raised</h4>
          <LinearProgress mode="determinate" value={parseFloat(this.state.record.totalRaised)/totalMoney} style={{height: "30px"}} />

          <h4 className={s["info-h4"]}>Soft Cap Raised</h4>
          <LinearProgress mode="determinate" value={parseFloat(this.state.record.softCap)/totalMoney} style={{height: "40px"}} color="#592877"/>

          <Container>
            <Row>
              <Col sm={6}>
                <h4 className={s["info-h4"]}>{TokenFields.rate.name}</h4>
                <p className={s["info-p"]}>{this.state.record.rate}</p>
              </Col>
              <Col sm={6}>
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
            <Row>
              <Col sm={4}>
                <h4 className={s["info-h4"]}>Your Current Balance</h4>
                <p className={s["info-p"]}>{this.state.record.userTokenBalance} {this.state.record.tokenTicker}</p>
              </Col>
              <Col sm={4}>
                <h4 className={s["info-h4"]}>Purchase More</h4>
                <p className={s["info-p"]}>{this.state.record.hardCap}</p>
              </Col>
              <Col sm={4}>
                <h4 className={s["info-h4"]}>Purchase More {`"${this.state.record.tokenName}"`}</h4>
                <TextField
                  hintText="Ex: 25,000"
                  floatingLabelText="Purchase Amount"
                  style={{fontSize: '22px', fontFamily:'Helvetica', fontWeight: 400}}
                  onChange={(e) => {this.onPurchaseInputChange(e)}}
                />
                <RaisedButton label="Purchase" primary onClick={()=> this.makePurchase()} style={{textTransform:'capitalize'}} />

                <h4 className={s["info-h4"]}>Your Balance {`"${this.state.record.tokenName}"`}</h4>
                <p className={s["info-p"]}>{this.state.userBTCBalance} BTC</p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ViewToken);
