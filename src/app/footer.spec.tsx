/* tslint:disable:no-unused-variable */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';

import {Footer} from './footer';

describe('Footer', () => {
  it('should be a footer', () => {
    const footer = TestUtils.renderIntoDocument(<Footer/>);
    const footerNode = ReactDOM.findDOMNode(footer as React.ReactInstance);
    expect(footerNode.tagName).toEqual('FOOTER');
  });
});
