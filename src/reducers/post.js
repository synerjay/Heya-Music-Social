import {
  ADD_COMMENT,
  ADD_POST,
  CLEAR_POST,
  DELETE_POSTS,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  REMOVE_COMMENT,
  UPDATE_LIKES,
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function foo(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case DELETE_POSTS:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== payload), // FILTER method: returns ALL posts that have ID that are NOT equal to payload ID
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_POST:
      return {
        ...state,
        post: null,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === payload.id ? { ...post, likes: payload.likes } : post
        ), // we're mapping through every post and if that post has the same id as the payload, then update the likes count of that post. Otherwise, return post
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, messages: payload },
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          messages: state.post.messages.filter(
            (message) => message.id !== payload
          ),
        },
      };
    default:
      return state;
  }
}
