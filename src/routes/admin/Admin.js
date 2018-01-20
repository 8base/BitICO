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
  {
    name: 'Token Logo',
    type: 'file',
  },
  {
    name: 'Token Name',
    type: 'text',
  },
  {
    name: 'Token Ticker',
    type: 'text',
  },
  {
    name: 'Total Supply',
    type: 'number',
  },
  {
    name: 'Allocation',
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
    name: 'RSK Address',
    type: 'textarea',
  },
  {
    name: 'BTC Value Per Token',
    type: 'number',
  },
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
      this.state[f.name] = '';
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
    const formLabelStyle = {
      display: 'block',
      fontSize: '1.2em',
      fontWeight: 400,
      fontFamily: 'Helvetica',
    };

    const labelStyle = {
      display: 'block',
      fontSize: '1.1em',
      fontWeight: 400,
      fontFamily: 'Helvetica',
    };

    return (
      <div className={s.root}>
        <form onSubmit={() => Admin.handleSubmit()} className={s.container}>
          <h1>{this.props.title}</h1>
          {fields.map(f => (
            <fieldset key={f.name} style={{ padding: '1em 0em' }}>
              <label htmlFor={f.name}>
                <span style={formLabelStyle}>{f.name}</span>
                <input
                  type={f.type}
                  value={this.state[f.name]}
                  id={f.name}
                  onChange={e => this.handleChange(e)}
                  style={labelStyle}
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
