/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import sequelize from '../sequelize';
import User from './User';
import Token from './Token';
/*
import UserClaim from './UserClaim';
import UserProfile from './UserProfile';
*/

User.hasMany(Token, {
  foreignKey: 'userId',
  as: 'tokens',
});

/*

User.hasMany(UserClaim, {
  foreignKey: 'userId',
  as: 'claims',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasOne(UserProfile, {
  foreignKey: 'userId',
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});
*/

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User, Token };
