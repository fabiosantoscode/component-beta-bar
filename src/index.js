import React from 'react';
import reactCookie from 'react-cookie';
import LinkButton from '@economist/component-link-button';
import BarWrapper from '@economist/component-bar-wrapper';

const googleForm = 'https://docs.google.com/forms/d/1ZCdwituoyhHAPKjCKvDvzRp66zwOv23GrCPH4rGINrE/viewform';
const oneMonthInSeconds = 2592000;
export default class BetaBar extends React.Component {
  static get propTypes() {
    return {
      className: React.PropTypes.string,
      cookieName: React.PropTypes.string,
      cookieValue: React.PropTypes.string,
      closeCookieName: React.PropTypes.string,
      closeCookieValue: React.PropTypes.string,
      reactCookieInstance: React.PropTypes.shape({
        save: React.PropTypes.func,
      }),
      onFallback: React.PropTypes.func,
      alwaysHideCloseButton: React.PropTypes.bool,
      stillRenderWhenClosed: React.PropTypes.bool,
      renderFeedbackLink: React.PropTypes.func,
      renderFallbackLink: React.PropTypes.func,
    };
  }
  static get defaultProps() {
    return {
      cookieName: 'ec_blogsab',
      cookieValue: 'a',
      closeCookieName: 'ec_rvmp_beta_close',
      closeCookieValue: 'x',
      reactCookieInstance: reactCookie,
    };
  }
  constructor(...args) {
    super(...args);
    this.handleFallback = this.handleFallback.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
    if (!this.state) {
      this.state = {};
    }
  }
  componentWillMount() {
    if (typeof window === 'undefined') {
      return;
    }
    const { closeCookieName, closeCookieValue, reactCookieInstance } = this.props;
    if (closeCookieName && closeCookieValue && reactCookieInstance) {
      this.setState({
        wasDismissed: reactCookieInstance.load(this.props.closeCookieName) === this.props.closeCookieValue,
      });
    }
  }
  handleDismiss(event) {
    const { closeCookieName, closeCookieValue, reactCookieInstance } = this.props;
    if (closeCookieName && closeCookieValue && reactCookieInstance) {
      reactCookieInstance.save(closeCookieName, closeCookieValue);
    }

    this.setState({ wasDismissed: true });

    if (event) {
      event.preventDefault();
    }
  }
  handleFallback(event) {
    if (typeof window === 'undefined') {
      return;
    }
    const { cookieName, cookieValue, reactCookieInstance } = this.props;
    if (cookieName && cookieValue && reactCookieInstance) {
      reactCookieInstance.save(cookieName, cookieValue, {
        maxAge: oneMonthInSeconds,
        path: '/',
      });
      if (this.props.onFallback) {
        this.props.onFallback();
      }
    }

    if (event) {
      event.preventDefault();
    }
  }
  render() {
    let classNames = [ 'beta-bar' ];
    if (this.state && this.state.wasDismissed) {
      classNames = classNames.concat([ 'beta-bar--dismissed' ]);
    }

    if (this.props.className) {
      classNames = classNames.concat([ this.props.className ]);
    }

    const feedbackButtonProps = {
      className: 'beta-bar--feedback',
      href: googleForm, target: '_blank',
      children: 'Leave feedback',
    };
    const feedbackButton = this.props.renderFeedbackLink ? this.props.renderFeedbackLink(feedbackButtonProps) : (
      <LinkButton {...feedbackButtonProps} />
    );

    const fallbackButtonProps = {
      className: 'beta-bar--old-version',
      href: '#', onClick: this.handleFallback,
      children: 'Back to old version',
    };
    const fallbackButton = this.props.renderFallbackLink ? this.props.renderFallbackLink(fallbackButtonProps) : (
      <a {...fallbackButtonProps}></a>
    );

    const displayCloseButton = !(this.state && this.state.wasDismissed) &&
      (this.props.alwaysHideCloseButton !== true);
    return (
      <BarWrapper
        className={classNames.join(' ')}
        classNamePrefix="beta-bar"
        onClose={this.handleDismiss}
        close={displayCloseButton}
        stillRenderWhenClosed={this.props.stillRenderWhenClosed}
      >
        You are viewing a beta release of
        <span className="beta-bar--message-economist">
          {" The Economist "}
        </span>
        website. Please tell us what you think.
        <div className="beta-bar--buttons-wrapper">
          {feedbackButton}
          {fallbackButton}
        </div>
      </BarWrapper>
    );
  }
}
