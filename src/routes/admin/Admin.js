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
import Dropzone from 'react-dropzone';
import fields from "./../../data/ui-models/TokenFields";

import s from './Admin.css';

const fieldsAsArray = Object.keys(fields).map(k => fields[k])

class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

    Object.keys(fields).forEach(f => {
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


    if (fields[key].key === key && fields[key].validation) {

      const testErr = fields[key].validation(val);
      obj[`${key}_error`] = testErr;
    }

    this.setState(obj);
  }

  handleFileUpload(accepted) {
    const credentials = JSON.parse(localStorage.getItem("icox_key"));
    const data = new FormData();
    data.append('file', accepted[0]);

    axios({
      url: `/file/upload`,
      method: 'post',
      data,
      headers: {
        authorization: `Bearer ${credentials.access_token}`,
        id_token: credentials.id_token,
      }
    }).then(response => this.uploadSuccess(response));

  }

  uploadSuccess({ data }) {
    this.handleChange("tokenLogo", data.data.filename);
  }


  render() {
    let dropzoneRef;
    return (
      <div className={s.root}>
        <Dropzone ref={(node) => { dropzoneRef = node; }} onDrop={(accepted) => this.handleFileUpload(accepted)} style={{display: "none"}} />
        <form onSubmit={() => this.handleSubmit()} className={s.container}>

          <h1>Create Custom Token</h1>

          {fieldsAsArray.map(f => (
            <fieldset key={f.name}>

              {
                f.type === "file"?
                  <RaisedButton
                    label="Upload Icon"
                    primary
                    onClick={() => { dropzoneRef.open() }}
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
