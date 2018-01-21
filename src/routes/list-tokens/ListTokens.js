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
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import s from './ListTokens.css';
import TokenFields from './../../data/ui-models/TokenFields';

class Admin extends React.Component {

  constructor(props) {
    super(props);

    const tokenHeaders = Object.keys(TokenFields);

    this.state = {
      headers: tokenHeaders,
      records: []
    }
  }

  componentDidMount () {
    const credentials = JSON.parse(localStorage.getItem("icox_key"));

    axios({
      method: 'GET',
      url: '/tokens',
      headers: {
        authorization: `Bearer ${credentials.access_token}`,
        id_token: credentials.id_token,
      }
    }).then(response => {

      const records = [];

      response.data.data.forEach((item) => {
        records.push(item);
      });

      this.setState({records})
    });
  }

  render() {

    if (this.state.records.length === 0) {
      return (
        <div />
      )
    }

    return (
      <div className={s.root}>
        <Table onRowSelection={(d)=> {
          window.location.pathname = `/view-token/${this.state.records[d].id}`;
        }}>
          <TableHeader>
            <TableRow>
              {
                this.state.headers.map((header) => (
                    <TableHeaderColumn key={header}>{header}</TableHeaderColumn>
                  ))
              }
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              this.state.records.map((item) => (
                  <TableRow key={item.tokenTicker}>
                      {
                        this.state.headers.map((header) => (
                          <TableRowColumn key={header}>{item[header]}</TableRowColumn>
                        ))
                      }
                  </TableRow>
                ))
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withStyles(s)(Admin);
