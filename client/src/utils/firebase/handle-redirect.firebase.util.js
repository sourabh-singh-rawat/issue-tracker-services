import { getRedirectResult } from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import storeUserInfoInDatabase from './database.utils';

// eslint-disable-next-line consistent-return
const handleRedirectedAuth = async () => {
  try {
    const redirectedResult = await getRedirectResult(auth);

    if (redirectedResult) {
      // eslint-disable-next-line no-console
      console.log('handling user redirected...');
      const { user } = redirectedResult;
      // store redirected user back in the database or update there information
      if (user) await storeUserInfoInDatabase(user);

      return user;
    }
  } catch (error) {
    return error;
  }
};

export default handleRedirectedAuth;
