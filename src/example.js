import React from 'react';
import BetaBar from './';
import LinkButton from '@economist/component-link-button';
/* eslint-disable id-match */
/* eslint-disable  react/display-name */
import { createI13nNode } from 'react-i13n';

const I13nFeedbackLink = createI13nNode(LinkButton, {
  isLeafNode: true,
  bindClickEvent: true,
  follow: true,
});

const I13nFallbackLink = createI13nNode('a', {
  isLeafNode: true,
  bindClickEvent: true,
  follow: true,
});

// this ensures the cookie is never written
const fakeCookie = {
  load: () => {},
  save: () => {},
};
export default (
  <div>
    <BetaBar reactCookieInstance={fakeCookie}/>
    <p>Tracked version</p>
    <BetaBar reactCookieInstance={fakeCookie}
      renderFeedbackLink={(props) => <I13nFeedbackLink
        i13nModel={{
          action: 'click',
          element: 'Feedback link',
        }}
        {...props}
                                     />}
      /* eslint-disable react/no-multi-comp */
      renderFallbackLink={(props) => <I13nFallbackLink i13nModel={{
        action: 'click',
        element: 'Fallback version link',
      }}
      /* eslint-enable react/no-multi-comp */
        {...props}
                                     />}
    />
  </div>
);
