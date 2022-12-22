import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase.config';

const logout = async () => {
  try {
    await signOut(auth);
    return window.localStorage.clear();
  } catch (error) {
    return error;
  }
};

export default { logout };
