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
      type: DataType.UUID,
      defaultValue: DataType.UUIDV1,
      primaryKey: true,
    },

    tokenLogo: {
      type: DataType.STRING(255),
    },

    tokenName: {
      type: DataType.STRING(255),
      unique: true
    },

    tokenTicker: {
      type: DataType.STRING(255),
      unique: true
    },

    totalSupply: {
      type: DataType.BIGINT,
    },

    allocation: {
      type: DataType.BIGINT,
    },

    softCap: {
      type: DataType.BIGINT,
    },

    hardCap: {
      type: DataType.BIGINT,
    },

    fundStartDate: {
      type: DataType.INTEGER,
    },

    fundEndDate: {
      type: DataType.INTEGER,
    },

    BTCValuePerToken: {
      type: DataType.DOUBLE(14, 10),
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
