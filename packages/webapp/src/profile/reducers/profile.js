import { actionTypes } from '../actions/profile';

const INITIAL_STATE = null;

const reducer = (state = INITIAL_STATE, { type, payload } = {}) => {
  switch (type) {
    case actionTypes.FETCH_PROFILE_SUCCESS:
      return payload.profile;
    default:
      return state;
  }
};

export default reducer;
