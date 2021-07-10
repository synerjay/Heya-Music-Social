import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
};

export default function foo(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE: // UPDATE_PROFILE has the same action has GET_PROFILE type because we just need to send the payload to the state
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    default:
      return state;
  }
}
