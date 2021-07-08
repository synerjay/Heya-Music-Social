import axios from 'axios';

// Making a global header for all axios requests to Django backend

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Or it could be axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// sources to look:
// https://stackoverflow.com/questions/44245588/how-to-send-authorization-header-with-axios
// https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests

export default setAuthToken;
