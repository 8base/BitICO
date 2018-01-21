/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import DataType from 'sequelize';
import Model from '../sequelize';

const Token = Model.define(
  'Token',
  {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataType.INTEGER,
      allowNull: false,
    },

    tokenLogo: {
      type: DataType.STRING(255),
    },

    tokenName: {
      type: DataType.STRING(255),
      allowNull: false,
      unique: true
    },

    tokenTicker: {
      type: DataType.STRING(255),
      allowNull: false,
      unique: true
    },

/*
    totalSupply: {
      type: DataType.BIGINT,
      allowNull: false,
    },
*/

    allocation: {
      type: DataType.BIGINT,
      allowNull: false,
    },

    softCap: {
      type: DataType.BIGINT,
      allowNull: false,
    },

    hardCap: {
      type: DataType.BIGINT,
      allowNull: false,
    },

    fundStartDate: {
      allowNull: false,
      type: DataType.INTEGER,
    },

    fundEndDate: {
      allowNull: false,
      type: DataType.INTEGER,
    },

    rate: {
      allowNull: false,
      type: DataType.INTEGER,
    },

    crowdsaleRskAddress: {
      type: DataType.STRING(40),
      allowNull: false,
      unique: true
    },

    tokenRskAddress: {
      type: DataType.STRING(40),
      allowNull: false,
      unique: true
    },

    createdAt: {
      allowNull: false,
      type: DataType.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataType.DATE
    },
    deletedAt: {
      type: DataType.DATE
    }
  },
  {
    timestamps: true,
    paranoid: true,
  },
);

export default Token;
