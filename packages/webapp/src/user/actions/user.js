import { post } from 'axios';

export const actionTypes = {
  AUTHENTICATE_REQUEST: '@BOLT/USER/AUTHENTICATE/REQUEST',
  AUTHENTICATE_SUCCESS: '@BOLT/USER/AUTHENTICATE/SUCCESS',
  AUTHENTICATE_FAILURE: '@BOLT/USER/AUTHENTICATE/FAILURE',
  UNAUTHENTICATE_REQUEST: '@BOLT/USER/UNAUTHENTICATE/REQUEST',
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

export const authenticate = ({ email, password }) => async dispatch => {
  dispatch(authenticateRequest());

  try {
    const response = await post('/me', { email, password });
    const user = await response.data;
    dispatch(authenticateSuccess(user));
  } catch (error) {
    dispatch(authenticateFailure(error));
  }
};

export const unauthenticate = () => async dispatch => {
  dispatch(unauthenticateRequest());
};
