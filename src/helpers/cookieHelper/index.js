import hash from 'object-hash';

import { maxAge } from '../../constants/numberConstants';
import { cookieName } from '../../constants/textConstants';

export function getCookieData(user) {
  return {cookieName, data: {
    user,
    tokenHash: hash({
      id: user.uid,
      token: user.refreshToken,
    }),
  }, options: { maxAge }}
}

export function setCookie(cookies, user) {
  const cookie = getCookieData(user);
  cookies.set(cookieName, cookie.data, cookie.options);
}

export function validateCookie(cookie) {
  const testHash = hash({
    id: cookie.user.uid,
    token: cookie.user.stsTokenManager.refreshToken,
  })

  return testHash === cookie.tokenHash;
}

export function isLoggedIn(cookies, firebase) {
  const cookie = cookies.get(cookieName);
    if (!cookie && !firebase.auth().currentUser) {
      return false;
    }

    if(!validateCookie(cookie)) {
      return false
    }
    
    return true;
}