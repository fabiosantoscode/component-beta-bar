import React from 'react';
import BetaBar from './';

// this ensures the cookie is never written
const fakeCookie = {
  load: () => {},
  save: () => {},
};
export default (
  <BetaBar reactCookieInstance={fakeCookie}/>
);
