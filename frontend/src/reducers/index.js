// Root Reducer
import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import profile from './alert';

export default combineReducers({
  alert,
  auth,
  profile,
});
