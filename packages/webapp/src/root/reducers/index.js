import { combineReducers } from 'redux';

import profile from '../../profile/reducers/profile';
import user from '../../user/reducers/user';

const rootReducer = combineReducers({
  profile,
  user,
});

export default rootReducer;
