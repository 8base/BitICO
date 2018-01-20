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

import s from './Admin.css';

const fields = [
  {
    name: 'Token Logo',
    type: 'file',
  },
  {
    name: 'Token Name',
    example: 'Ex: BitBam',
    type: 'text',
  },
  {
    name: 'Token Ticker',
    example: 'Ex: COI',
    type: 'text',
  },
  {
    name: 'Total Supply',
    example: 'Ex: 1,000,000',
    type: 'number',
  },
  {
    name: 'Allocation',
    example: 'Ex: 300,000',
    type: 'number',
  },
  {
    name: 'Soft Cap',
    type: 'number',
  },
  {
    name: 'Hard Cap',
    type: 'number',
  },
  {
    name: 'Fund Start Date',
    type: 'date',
  },
  {
    name: 'Fund End Date',
    type: 'date',
  },
  {
    name: 'BTC Value Per Token',
    example: 'Ex: 0.00001',
    type: 'number',
  },
];

class Admin extends React.Component {

  static handleSubmit(event) {
    event.preventDefault();
  }

  constructor(props) {
    super(props);
    this.state = {};

    fields.forEach(f => {
      this.state[f.name] = '';
    });

    this.handleChange = this.handleChange.bind(this);
    Admin.handleSubmit = Admin.handleSubmit.bind(this);
  }

  handleChange(key, val) {
    const obj = {};
    obj[key] = val;
    this.setState(obj);
  }

  render() {
    return (
      <div className={s.root}>
        <form onSubmit={() => Admin.handleSubmit()} className={s.container}>
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
                f.type === "text" || f.type === "number" ?
                  <TextField
                    hintText={f.example || f.name}
                    floatingLabelText={f.name}
                    onChange={(e, n) => this.handleChange(f.name, n)}
                  />
                  :
                  null
              }

              {
                f.type === "date" ?
                  <DatePicker
                    hintText={f.name}
                    onChange={(e, n) => this.handleChange(f.name, n)}
                  />
                  :
                  null
              }

            </fieldset>
          ))}

          <RaisedButton
            label="Submit"
            primary
            onClick={() => Admin.handleSubmit()}
          />
        </form>
      </div>
    );
  }
}

export default withStyles(s)(Admin);
