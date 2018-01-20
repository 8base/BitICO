/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Sequelize from 'sequelize';
// import config from '../config';

const sequelize = new Sequelize('icox', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
  define: {
    freezeTableName: true,
  },
});

export default sequelize;
