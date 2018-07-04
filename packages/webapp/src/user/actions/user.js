export const actionTypes = {
  AUTHENTICATE_REQUEST: '@EDR/USER/AUTHENTICATE/REQUEST',
  AUTHENTICATE_SUCCESS: '@EDR/USER/AUTHENTICATE/SUCCESS',
  AUTHENTICATE_FAILURE: '@EDR/USER/AUTHENTICATE/FAILURE',
  UNAUTHENTICATE_REQUEST: '@EDR/USER/UNAUTHENTICATE/REQUEST',
};

export const authenticateRequest = () => ({
  type: actionTypes.AUTHENTICATE_REQUEST,
});

export const authenticateSuccess = user => ({
  type: actionTypes.AUTHENTICATE_SUCCESS,
  payload: {
    user,
  },
});

export const authenticateFailure = error => ({
  type: actionTypes.AUTHENTICATE_FAILURE,
  payload: {
    error,
  },
});

export const unauthenticateRequest = () => ({
  type: actionTypes.UNAUTHENTICATE_REQUEST,
});

export const authenticate = ({ businessId, password }) => async dispatch => {
  const user = {
    id: 1,
    business: { id: businessId },
  };
  dispatch(authenticateSuccess(user));
};

export const unauthenticate = () => async dispatch => {
  dispatch(unauthenticateRequest());
};
