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

const User = Model.define(
  'User',
  {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    email: {
      type: DataType.STRING(255),
      validate: { isEmail: true },
      allowNull: false,
    },

    fullName: {
      type: DataType.STRING(255),
    },

    btcAddress: {
      type: DataType.STRING(35),
    },

    btcPrivateKey: {
      type: DataType.STRING(64),
    },

    rskAddress: {
      type: DataType.STRING(40),
    },

    rskPrivateKey: {
      type: DataType.STRING(64),
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
    indexes: [{ fields: ['email'] }],
    timestamps: true,
    paranoid: true,
  },
);

export default User;
