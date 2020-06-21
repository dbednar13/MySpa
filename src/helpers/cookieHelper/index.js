import hash from 'object-hash';

import { maxAge } from '../../constants/numberConstants';
import { cookieName } from '../../constants/textConstants';

export default function getCookieData(user) {
  return {cookieName, data: {
    user,
    tokenHash: hash({
      id: user.uid,
      email: user.email,
    }),
  }, options: { maxAge }}
}
