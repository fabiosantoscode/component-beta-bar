import 'babel-polyfill';
import BetaBar from '../src';
import React from 'react';
import chai from 'chai';
import spies from 'chai-spies';
import BarWrapper from '@economist/component-bar-wrapper';

chai.should();
chai.use(spies);

describe('BetaBar component', () => {
  /* eslint-disable init-declarations */
  let reactCookieInstance;
  beforeEach(() => {
    reactCookieInstance = {
      save: chai.spy(),
      load: chai.spy(),
    };
  });
  /* eslint-enable init-declarations */
  it('is compatible with React.Component', () => {
    BetaBar.should.be.a('function').and.respondTo('render');
  });
  it('renders a React element', () => {
    React.isValidElement(
      <BetaBar />
    ).should.equal(true);
  });
  describe('handleFallback', () => {
    it('sets a cookie', () => {
      const component = new BetaBar({
        cookieName: 'foo',
        cookieValue: 'bar',
        reactCookieInstance,
      }, {});
      component.handleFallback();
      reactCookieInstance.save.should.have.been.called.once();
      reactCookieInstance.save.should.have.been.called.with(
        'foo',
        'bar',
        {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        }
      );
    });
    it('calls props.onFallback', () => {
      const onFallback = chai.spy();
      const component = new BetaBar({
        cookieName: 'foo-close',
        cookieValue: 'bar-close',
        reactCookieInstance,
        onFallback,
      }, { });
      component.handleFallback();
      onFallback.should.have.been.called.once();
    });
  });
  describe('handleDismiss', () => {
    it('sets a cookie', () => {
      const component = new BetaBar({
        closeCookieName: 'foo-close',
        closeCookieValue: 'bar-close',
        reactCookieInstance,
      }, {});
      chai.spy.on(component, 'setState');
      component.handleDismiss();
      reactCookieInstance.save.should.have.been.called.once();
      reactCookieInstance.save.should.have.been.called.with(
        'foo-close',
        'bar-close'
      );
      component.setState.should.have.been.called.with({
        wasDismissed: true,
      });
    });
    it('this cookie sets state.wasDismissed', () => {
      reactCookieInstance.load = chai.spy((...args) => {
        if (args.indexOf('foo-close') !== -1) {
          return 'bar-close';
        }
        return null;
      });
      const component = new BetaBar({
        closeCookieName: 'foo-close',
        closeCookieValue: 'bar-close',
        reactCookieInstance,
      }, { });
      chai.spy.on(component, 'setState');
      component.componentWillMount();
      component.setState.should.have.been.called.once();
      component.setState.should.have.been.called.with({
        wasDismissed: true,
      });
    });
    it('when state.wasDismissed, nothing is rendered', () => {
      const component = new BetaBar({ });
      component.state.wasDismissed = true;
      const element = component.render();
      element.props.className.should.equal('beta-bar beta-bar--dismissed');
      element.type.should.equal(BarWrapper);
    });
  });
});
