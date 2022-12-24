const formErrors = {
  project: {
    NAME_MAX_LENGTH_ERROR: {
      limit: 255,
      message: '"Name" length must be less than or equal to 60 characters long',
    },
    DESCRIPTION_MAX_LENGTH_ERROR: {
      limit: 4000,
      message:
        '"Description" length must be less than or equal to 4000 characters long',
    },
  },
  issue: {
    NAME_MAX_LENGTH_ERROR: {
      limit: 255,
      message: '"Name" length must be less than or equal to 60 characters long',
    },
    DESCRIPTION_MAX_LENGTH_ERROR: {
      limit: 4000,
      message:
        '"Description" length must be less than or equal to 4000 characters long',
    },
  },
};

export default formErrors;
