/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Contact from './Contact';

export const path = '/contact';
export const action = async (state) => {
  const title = 'Contact Us';
  state.context.onSetTitle(title);
  return <Contact title={title} />;
};
