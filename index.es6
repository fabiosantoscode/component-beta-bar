/* global window document */
import React from 'react';
import reactCookie from 'react-cookie';
import Icon from '@economist/component-icon';
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
  constructor(...args) {
    super(...args);
    this.handleOldVersion = this.handleOldVersion.bind(this);
  }
  handleOldVersion(ev) {
    // TODO
    ev.preventDefault();
  }
  render() {
    const feedbackButton = (
      <LinkButton className="beta-bar--feedback" href={googleForm}>
        Leave feedback
      </LinkButton>
    );
    const oldVersionButton = (
      <a
        className="beta-bar--old-version"
        href="#"
        onClick={this.handleOldVersion}
      >
        Back to old version
      </a>
    );
    return (
      <BarWrapper className="beta-bar">
        {betaText}
        <div className="beta-bar--buttons-wrapper">
          {feedbackButton}
          {oldVersionButton}
        </div>
      </BarWrapper>
    );
  }
}
