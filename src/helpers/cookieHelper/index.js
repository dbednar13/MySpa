export function getUserIdToken(user) {
  user.getIdToken().then((idToken) => {
    console.log('token: ', idToken);
  });
}

export function setCookie() {
  // TODO
}

export function FetchCookie() {
  // TODO
}