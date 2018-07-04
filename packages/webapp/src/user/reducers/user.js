import { actionTypes } from '../actions/user';

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actionTypes.AUTHENTICATE_SUCCESS:
      return payload.user;
    case actionTypes.UNAUTHENTICATE_REQUEST:
      return {};
    default:
      return state;
  }
};

export default reducer;
