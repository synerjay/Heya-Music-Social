import {
  GET_PROFILE,
  GET_MEMBERPROFILE,
  PROFILE_ERROR,
  CLEAR_MEMBERPROFILE,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_TOKEN,
  NO_TOKEN,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  memberProfile: null,
  accessToken: null,
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
    case GET_MEMBERPROFILE:
      return {
        ...state,
        memberProfile: payload,
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
    case CLEAR_MEMBERPROFILE:
      return {
        ...state,
        memberProfile: null,
        loading: false,
      };
    case GET_TOKEN:
      console.log('TOKEN');
      return {
        ...state,
        accessToken: payload,
        loading: false,
      };
    case NO_TOKEN:
      return {
        ...state,
        accessToken: null,
      };
    default:
      return state;
  }
}
