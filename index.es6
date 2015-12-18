/* global window document */
import React from 'react';
import Icon from '@economist/component-icon';
import reactCookie from 'react-cookie';
import LinkButton from '@economist/component-link-button';
import BarWrapper from '@economist/component-bar-wrapper';

const betaText = [
  (
    <span key="1" className="beta-bar--message-first">
      You're viewing a beta release of
      <span className="beta-bar--message-economist">
        {" The Economist"}
      </span>
      's new website
    </span>
  ),
  (
    <span key="2" className="beta-bar--message-second">
      {' We would like to hear what you think'}
    </span>
  ),
];

const googleForm = 'https://docs.google.com/forms/d/1ZCdwituoyhHAPKjCKvDvzRp66zwOv23GrCPH4rGINrE/viewform';

export default class BetaBar extends React.Component {
  static propTypes = {
    cookieName: React.PropTypes.string,
    cookieValue: React.PropTypes.string,
    closeCookieName: React.PropTypes.string,
    closeCookieValue: React.PropTypes.string,
    reactCookieInstance: React.PropTypes.shape({
      save: React.PropTypes.func,
    }),
    onFallback: React.PropTypes.func,
  }
  static defaultProps = {
    cookieName: 'ec_blogsab',
    cookieValue: 'b',
    closeCookieName: 'ec_rvmp_beta_close',
    closeCookieValue: 'x',
    reactCookieInstance: reactCookie,
  }
  constructor(...args) {
    super(...args);
    this.handleFallback = this.handleFallback.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
    if (!this.state) {
      this.state = {};
    }
  }
  handleFallback(event) {
    if (typeof window === 'undefined' || typeof location === 'undefined') { return; }
    const { cookieName, cookieValue, reactCookieInstance } = this.props;

    if (cookieName && cookieValue && reactCookieInstance) {
      reactCookieInstance.save(cookieName, cookieValue, {
        maxAge: 30 * 24 * 60 * 60,
      });
      if (this.props.onFallback) {
        this.props.onFallback();
      }
    }

    if (event) {
      event.preventDefault();
    }
  }
  handleDismiss(event) {
    const { closeCookieName, closeCookieValue, reactCookieInstance } = this.props;

    if (closeCookieName && closeCookieValue && reactCookieInstance) {
      reactCookieInstance.save(closeCookieName, closeCookieValue)
    }

    this.setState({ wasDismissed: true });

    if (event) {
      event.preventDefault();
    }
  }
  componentWillMount() {
    if (typeof window === 'undefined') { return; }
    const { closeCookieName, closeCookieValue, reactCookieInstance } = this.props;
    if (closeCookieName && closeCookieValue && reactCookieInstance) {
      this.setState({
        wasDismissed: reactCookieInstance.load(this.props.closeCookieName) === this.props.closeCookieValue,
      });
    }
  }
  render() {
    if (this.state && this.state.wasDismissed) {
      return (
        <div className="beta-bar__dismissed"></div>
      );
    }
    const feedbackButton = (
      <LinkButton className="beta-bar--feedback" href={googleForm}>
        Leave feedback
      </LinkButton>
    );
    const fallbackButton = (
      <a
        className="beta-bar--old-version"
        href="#"
        onClick={this.handleFallback}
      >
        Back to old version
      </a>
    );
    return (
      <BarWrapper className="beta-bar" classNamePrefix="beta-bar" onClose={this.handleDismiss}>
        {betaText}
        <div className="beta-bar--buttons-wrapper">
          {feedbackButton}
          {fallbackButton}
        </div>
      </BarWrapper>
    );
  }
}
