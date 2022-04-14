import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
  uid: undefined,
  email: undefined,
  displayName: undefined,
  metadata: {
    creationTime: undefined,
    lastSignInTime: undefined,
  },
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  if (type === USER_ACTION_TYPES.SET_USER) {
    const { uid, email, displayName, metadata } = payload;

    return {
      ...state,
      uid,
      email,
      displayName,
      metadata,
    };
  }

  return { ...state };
};
