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
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Admin.css';

const fields = [
  'Token Logo',
  'Token Name',
  'Token Ticker',
  'Total Supply',
  'Fund Supply',
  'Soft Cap',
  'Hard Cap',
  'Fund Start Date',
  'Fund End Date',
  'RSK Address',
  'BTC Value Per Token',
];

class Admin extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  static handleSubmit(event) {
    event.preventDefault();
  }

  constructor(props) {
    super(props);
    this.state = {};

    fields.forEach(f => {
      this.state[f] = '';
    });

    this.handleChange = this.handleChange.bind(this);
    Admin.handleSubmit = Admin.handleSubmit.bind(this);
  }

  handleChange(event) {
    const key = event.target.id;
    const val = event.target.value;
    const obj = {};
    obj[key] = val;
    this.setState(obj);
  }

  render() {
    return (
      <div className={s.root}>
        <form onSubmit={() => Admin.handleSubmit()} className={s.container}>
          <h1>{this.props.title}</h1>
          {fields.map(f => (
            <fieldset key={f}>
              <label htmlFor={f}>
                {f}:
                <input
                  type="text"
                  value={this.state[f]}
                  id={f}
                  onChange={e => this.handleChange(e)}
                />
              </label>
            </fieldset>
          ))}
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default withStyles(s)(Admin);
