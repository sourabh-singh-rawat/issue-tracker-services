import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
  uid: undefined,
  displayName: undefined,
  email: undefined,
  metadata: {
    creationTime: undefined,
    lastSignInTime: undefined,
  },
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_USER:
      const { user } = payload;
      const {
        uid,
        email,
        displayName,
        metadata: { creationTime, lastSignInTime },
      } = user;

      return {
        ...state,
        uid,
        displayName,
        email,
        metadata: {
          creationTime,
          lastSignInTime,
        },
      };

    default:
      return state;
  }
};
