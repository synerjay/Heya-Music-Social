import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types';
import { setAlert } from './alert';

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
      }, 500);
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// Login User

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });
  //We use axios to send a post request to /api/users to register.
  //The register action takes in the response from the '/api/users' backend using the post method and store it in the res variable
  try {
    const res = await axios.post('/api/v1/users/auth/login/', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    setTimeout(() => {
      dispatch(loadUser());
    }, 1000);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  // dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.post('/api/v1/users/auth/logout/');

    dispatch({ type: LOGOUT });
    dispatch(setAlert(res.detail, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};
