/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import User from './User';
import Token from './Token';
import Purchase from './Purchase';


const initRelations = () => {
  console.log("here");
  User.hasMany(Token, {
    foreignKey: 'userId',
    as: 'tokens',
  });

  User.belongsToMany(Token, {
    through: Purchase
  });
};

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

/*
function sync(...args) {
  return sequelize.sync(...args);
}
*/

export default { initRelations };
export { User, Token };
