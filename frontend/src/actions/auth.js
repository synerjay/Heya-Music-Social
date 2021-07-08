import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from './types';

//Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token); // for global axios request header
  } // if there is a token in the local storage then set it setAuthToken function to set in every request

  try {
    const res = await axios.get('/api/v1/users/auth/user/');
    // authenticate users in the backend. If there is a token available, the backend sends user infor as a response
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register =
  ({ username, email, password1, password2 }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ username, email, password1, password2 });

    try {
      const res = await axios.post(
        '/api/v1/users/auth/register/',
        body,
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      setTimeout(() => {
        dispatch(loadUser());
      }, 1000);
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
