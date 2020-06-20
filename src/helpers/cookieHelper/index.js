import hash from 'object-hash';

// expires: milliseconds * seconds * minutes * hours * days;
const expiresIn = 1000 * 60 * 10 * 1 * 1;

export function getUserIdToken(user, callback) {
  user.getIdToken().then((idToken) => {
    callback(user, idToken);
  });
}

export function setCookie(idToken) {
  const values = { expirationDate: new Date() + expiresIn, token: idToken };
  const cookie = { values, tokenHash: hash({ values }) };

  localStorage.setItem(idToken, cookie);
  // TODO
}

export function FetchCookie(idToken) {
  var returnValue = {
    found: false,
    valid: false,
    expired: true,
    cookie: undefined,
  };
  const cookie = localStorage.getItem(idToken);

  if (cookie) {
    returnValue.cookie = cookie;
    returnValue.found = true;
    returnValue.valid = hash(cookie.values) === cookie.hash;
    returnValue.expired = Date() < cookie.values.expirationDate;
  }
  return returnValue;
}
