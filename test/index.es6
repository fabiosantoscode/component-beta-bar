import React from 'react';
import BetaBar from '../index.es6';
import BarWrapper from '@economist/component-bar-wrapper';
import { stub, spy } from 'sinon';

describe('BetaBar component', () => {
  it('is compatible with React.Component', () => {
    BetaBar.should.be.a('function').and.respondTo('render');
  });
  it('renders a React element', () => {
    React.isValidElement(
      <BetaBar/>
    ).should.equal(true);
  });
});
