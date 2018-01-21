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
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import axios from "axios";

import s from './Admin.css';

const fields = [
  {
    name: 'Token Logo',
    key:  'tokenLogo',
    type: 'file',
  },
  {
    name: 'Token Name',
    key: 'tokenName',
    example: 'Ex: BitBam',
    type: 'text',
  },
  {
    name: 'Token Ticker',
    key: 'tokenTicker',
    example: 'Ex: COI',
    type: 'text',
    validation: (text) => {
      if (/^[^a-z]*$/.test(text)) {
        return "";
      }

      return "Must be an all caps string";
    },
  },
  {
    name: 'Total Supply',
    key: 'totalSupply',
    example: 'Ex: 1,000,000',
    type: 'number',
    validation: (text) => {
      if (/^(\d+|\d{1,3}(,\d{3})*)(\.\d+)?$/.test(text)) {
        return "";
      }

      return "Must a number without decimals (commas optional but must be properly formatted)";
    },
  },
  {
    name: 'Allocation',
    key: 'allocation',
    example: 'Ex: 300,000',
    type: 'number',
    validation: (text) => {
      if (/^(\d+|\d{1,3}(,\d{3})*)(\.\d+)?$/.test(text)) {
        return "";
      }

      return "Must a number without decimals (commas optional but must be properly formatted)";
    },
  },
  {
    name: 'Soft Cap',
    key: 'softCap',
    type: 'number',
    validation: (text) => {
      if (/^(\d+|\d{1,3}(,\d{3})*)(\.\d+)?$/.test(text)) {
        return "";
      }

      return "Must a number without decimals (commas optional but must be properly formatted)";
    },
  },
  {
    name: 'Hard Cap',
    key: 'hardCap',
    type: 'number',
    validation: (text) => {
      if (/^(\d+|\d{1,3}(,\d{3})*)(\.\d+)?$/.test(text)) {
        return "";
      }

      return "Must a number without decimals (commas optional but must be properly formatted)";
    },
  },
  {
    name: 'Fund Start Date',
    key: 'fundStartDate',
    type: 'date',
  },
  {
    name: 'Fund End Date',
    key: 'fundEndDate',
    type: 'date',
  },
  {
    name: 'BTC Value Per Token',
    key: 'btcValuePerToken',
    example: 'Ex: 0.00001',
    type: 'float',
  },
];

class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

    fields.forEach(f => {
      this.state[f.key] = '';
      this.state[`${f.key  }_error`] = '';
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit () {

    const credentials = JSON.parse(localStorage.getItem("icox_key"));

    const body = {};

    fields.forEach(f => {

      const value = this.state[f.key];
      const { key }= f;

      if (f.type === 'number') {

        body[key] = parseInt(value, 10);

      } else if (f.type === 'float') {

        body[key] = parseFloat(value);

      } else if (f.type === 'date') {

        body[key] = parseInt(new Date(value).getTime()/1000, 10);

      } else {

        body[key] = this.state[f.key];
      }
    });


    axios({
      method: 'post',
      url: '/token/create',
      data: body,
      headers: {
        authorization: `Bearer ${credentials.access_token}`,
        id_token: credentials.id_token,
      }
    });
  }


  handleChange (key, val) {

    const obj = {};
    obj[key] = val;

    for (let i = 0; i < fields.length; i += 1) {

      const field = fields[i];

      if (field.key === key && field.validation) {

        const testErr = field.validation(val);
        obj[`${key}_error`] = testErr;
        break;
      }

    }

    this.setState(obj);
  }

  render() {
    return (
      <div className={s.root}>
        <form onSubmit={() => this.handleSubmit()} className={s.container}>
          <h1>Create Custom Token</h1>

          {fields.map(f => (
            <fieldset key={f.name}>

              {
                f.type === "file"?
                  <RaisedButton
                    label="Upload Icon"
                    primary
                  />
                  :
                  null
              }

              {
                f.type === "text" || f.type === "number" || f.type === "float" ?
                  <TextField
                    hintText={f.example || f.name}
                    floatingLabelText={f.name}
                    onChange={(e, n) => this.handleChange(f.key, n)}
                    errorText={this.state[`${f.key}_error`]}
                  />
                  :
                  null
              }

              {
                f.type === "date" ?
                  <DatePicker
                    hintText={f.name}
                    onChange={(e, n) => this.handleChange(f.key, n)}
                  />
                  :
                  null
              }

            </fieldset>
          ))}

          <RaisedButton
            label="Submit"
            primary
            onClick={() => this.handleSubmit()}
          />
        </form>
      </div>
    );
  }
}

export default withStyles(s)(Admin);
