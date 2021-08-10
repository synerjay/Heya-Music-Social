import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import {
  GET_PROFILE,
  GET_MEMBERPROFILE,
  CLEAR_MEMBERPROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_TOKEN,
  NO_TOKEN,
} from './types';

const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;

// Get Current User's Profile

export const getCurrentProfile = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token); // This needs to be included in GET requests or django will reject it!!!
  }

  try {
    // axios get response from Django backend /profile/me
    const res = await axios.get('/profile/me'); // this endoint is HUGE problem

    console.log(res.data.profile);
    dispatch({
      type: GET_PROFILE,
      payload: res.data.profile,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all Profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_MEMBERPROFILE }); // we need clear profile here so that the previous user's profile doesnt get remained in the browser

  try {
    const res = await axios.get('/profile/members');

    dispatch({
      type: GET_PROFILES,
      payload: res.data.profiles, // .profiles to get the specific array of profiles
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Profile By ID

export const getProfileById = (userId) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token); // This needs to be included in GET requests or django will reject it!!!
  }

  try {
    const res = await axios.get(`/profile/member/${userId}`);

    dispatch({
      type: GET_MEMBERPROFILE,
      payload: res.data.profile,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or Update a Profile

export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    // making a request to the backend always use aync/await because it returns a promise
    // when sending data, you need to make a config object constant to send to the backend just like in login auth action

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const res = await axios.post('/profile/', formData, config);

      // Since the response to the post action to node is a profile data, the dispatch type is just GET_PROFILE
      //the same type as getCurrentProfile
      dispatch({
        type: GET_PROFILE,
        payload: res.data.profile,
      });

      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      );

      // if its not an edit (aka first time created) go back to dashboard
      // if (!edit) {
      //   history.push('/dashboard'); <-- // This is causing problems at first profile creation!
      // }
    } catch (err) {
      const errors = err.response.data.errors;
      dispatch(
        setAlert(
          'Oops! Something went wrong. Please try refreshing the page.',
          'danger'
        )
      );

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Delete User Account

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This cannot be undone.')) {
    try {
      await axios.delete('/profile/');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
    } catch (err) {
      dispatch(
        setAlert(
          'Oops! Something went wrong. Please try refreshing the page.',
          'danger'
        )
      );
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// Add Album, Artists, Tracks below

//Add an Album

export const addAlbum = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    // make a PUT request instead of request because in the backend, we made experience node a PUT request
    const res = await axios.put('/profile/album', formData, config);

    // Since the response to the post action to node is a profile data, the dispatch type is just GET_PROFILE
    //the same type as getCurrentProfile
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.profile,
    });
    console.log(res.data.profile);

    dispatch(setAlert('Album Added to Favorites', 'success'));

    // if its not an edit (aka first time created) go back to dashboard
    // history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(err.response);
    dispatch(
      setAlert(
        'Oops! Something went wrong. Please try refreshing the page.',
        'danger'
      )
    );

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Artist

export const addArtist = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    // make a PUT request instead of request because in the backend, we made experience node a PUT request
    const res = await axios.put('/profile/artist', formData, config);

    // Since the response to the post action to node is a profile data, the dispatch type is just GET_PROFILE
    //the same type as getCurrentProfile
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.profile,
    });
    console.log(res.data.profile);

    dispatch(setAlert('Artist Added to Favorites', 'success'));

    // if its not an edit (aka first time created) go back to dashboard
    // history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(err.response);
    dispatch(
      setAlert(
        'Oops! Something went wrong. Please try refreshing the page.',
        'danger'
      )
    );

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Favorite Track

export const addTrack = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    // make a PUT request instead of request because in the backend, we made experience node a PUT request
    const res = await axios.put('/profile/track', formData, config);

    // Since the response to the post action to node is a profile data, the dispatch type is just GET_PROFILE
    //the same type as getCurrentProfile
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.profile,
    });
    console.log(res.data.profile);

    dispatch(setAlert('Track Added to Favorites', 'success'));

    // if its not an edit (aka first time created) go back to dashboard
    // history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(err.response);
    dispatch(
      setAlert(
        'Oops! Something went wrong. Please try refreshing the page.',
        'danger'
      )
    );

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Genre, Artist, Track

// Delete Genre

export const deleteAlbum = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/profile/album/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.profile,
    });

    dispatch(setAlert('Album Removed From Favorites', 'success'));
  } catch (err) {
    dispatch(
      setAlert(
        'Oops! Something went wrong. Please try refreshing the page.',
        'danger'
      )
    );
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteArtist = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/profile/artist/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.profile,
    });

    dispatch(setAlert('Artist Removed From Favorites', 'success'));
  } catch (err) {
    dispatch(
      setAlert(
        'Oops! Something went wrong. Please try refreshing the page.',
        'danger'
      )
    );
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteTrack = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/profile/track/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.profile,
    });

    dispatch(setAlert('Track Removed From Favorites', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Spotify Access Token (Non-Async-Await Promise-based Axios Post request)

export const getAccessToken = () => (dispatch) => {
  try {
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' + btoa(REACT_APP_CLIENT_ID + ':' + REACT_APP_CLIENT_SECRET),
      },
      data: 'grant_type=client_credentials',
      method: 'POST',
    }).then((tokenResponse) => {
      // Once we get a Spotify token we can get the Genres list using the token
      dispatch({
        type: GET_TOKEN,
        payload: tokenResponse.data.access_token,
      });
      console.log('Successfully Recieve Spotify Token');
      console.log(tokenResponse.data);
    });
  } catch (err) {
    dispatch({
      type: NO_TOKEN,
    });
  }
};
