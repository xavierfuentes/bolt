import { get } from 'axios';

export const actionTypes = {
  FETCH_PROFILE_REQUEST: '@EDR/BUSINESS_PROFILE/FETCH/REQUEST',
  FETCH_PROFILE_SUCCESS: '@EDR/BUSINESS_PROFILE/FETCH/SUCCESS',
  FETCH_PROFILE_FAILURE: '@EDR/BUSINESS_PROFILE/FETCH/FAILURE',
};

export const fetchBusinessProfileRequest = () => ({
  type: actionTypes.FETCH_PROFILE_REQUEST,
});

export const fetchBusinessProfileSuccess = profile => ({
  type: actionTypes.FETCH_PROFILE_SUCCESS,
  payload: { profile },
});

export const fetchBusinessProfileFailure = error => ({
  type: actionTypes.FETCH_PROFILE_FAILURE,
  payload: { error },
});

export const fetchBusinessProfile = businessId => async dispatch => {
  dispatch(fetchBusinessProfileRequest());

  try {
    const response = await get(`/company/${businessId}`);
    const profile = await response.data;
    dispatch(fetchBusinessProfileSuccess(profile));
  } catch (error) {
    dispatch(fetchBusinessProfileFailure(error));
  }
};
