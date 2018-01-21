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

const Purchase = Model.define(
  'Purchase',
  {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataType.INTEGER,
    },

    tokenId: {
      type: DataType.INTEGER,
    },

    createdAt: {
      type: DataType.DATE
    },

    updatedAt: {
      type: DataType.DATE
    },

  },
  {
    timestamps: true,
  },
);

export default Purchase;
