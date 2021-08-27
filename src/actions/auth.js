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
  CLEAR_PROFILE,
} from './types';
import { setAlert } from './alert';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

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
      dispatch(
        setAlert('Account successfully registered. Welcome!', 'success')
      );
    } catch (err) {
      const errors = err.response.data.errors;
      dispatch(
        setAlert(
          'Oops! Something went terribly wrong. Please try reloading the page.',
          'danger'
        )
      );
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
    dispatch(setAlert('Successfully logged in. Welcome back!', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch(
      setAlert(
        "Oops! The username or password doesn't seem to match. Please try again.",
        'danger'
      )
    );
    if (errors) {
      errors.forEach((error) =>
        dispatch(
          setAlert(
            "Oops! The username or password doesn't seem to match. Please try again.",
            'danger'
          )
        )
      );
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.post('/api/v1/users/auth/logout/');

    dispatch({ type: LOGOUT });
    dispatch(
      setAlert('Successfully logged out. See ya again soon!', 'success')
    );
    window.location.reload(); // add this one or else Django will have a hissy fit about 404 !!
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

//Change Password

export const changePassword =
  ({ new_password1, new_password2 }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ new_password1, new_password2 });

    try {
      const res = await axios.post(
        '/api/v1/users/auth/password/change/',
        body,
        config
      );
      dispatch(setAlert(res.data.detail, 'success'));
    } catch (err) {
      const errors = err.response.data.errors;
      dispatch(
        setAlert(
          'Oops! Something went terribly wrong. Please try reloading the page.',
          'danger'
        )
      );
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
    }
  };
