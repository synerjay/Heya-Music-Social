import axios from 'axios';
import { setAlert } from './alert';
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
} from './types';

// Get Many Posts method

export const getPosts = () => async (dispatch) => {
  dispatch({ type: CLEAR_POST });

  try {
    const res = await axios.get('/updates/');

    dispatch({
      type: GET_POSTS,
      payload: res.data.posts,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Like

export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/updates/like/${id}`);
    // what's return or the response data is an array of likes or (an array of users who liked the post)

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data.post.likes },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove Like

export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/updates/like/${id}`);
    // what's return or the response data is an array of likes or (an array of users who liked the post)

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data.post.likes },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/updates/${id}`);

    dispatch({
      type: DELETE_POSTS,
      payload: id,
    });

    dispatch(setAlert('Post Successfully Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Post - whenever there is an action that needs to put in the payload, data should be passed in the func argument

export const addPost = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('/updates/', formData);
    // in a post request to the backend, the data is inputed in the second argument of the axios.post method

    dispatch({
      type: ADD_POST,
      payload: res.data.post,
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Individual Post by Id (Discussion link in the PostItem component)

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/updates/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data.post,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Comment to a Post

export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await axios.post(`/updates/message/${postId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data.post.messages,
    });

    dispatch(setAlert('Comment Successfully Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Deleting a Comment

export const deleteComment = (postId, id) => async (dispatch) => {
  try {
    await axios.delete(`/updates/message/${postId}/${id}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: id,
    });

    dispatch(setAlert('Comment Successfully Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
