/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Sequelize from 'sequelize';
import mySQLConfig from "../../config/mysql";


const sequelize = new Sequelize(
  mySQLConfig.database,
  mySQLConfig.username,
  mySQLConfig.password,
  mySQLConfig,
);

export default sequelize;
