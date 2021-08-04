import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  //Component State Hook
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });

  const { username, email, password1, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  // The ...formData is a spreader and copies the formData
  // [e.target.name] corresponding to "name" attribute (not the value) of each HTML tags
  // e.target.value -- is the change in value in the fields

  // const newUser = {
  //   username,
  //   email,
  //   password1,
  //   password2,
  // };

  const onSubmit = async (e) => {
    e.preventDefault(); // IMPOR-EFFIN-TANT!
    if (password1 !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ username, email, password1, password2 });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div className='container-form flex justify-between w-auto'>
        <div className='iphone bg-gray-500 w-1/2 rounded-3xl border-gray-900 border-4'></div>
        <div className='p-10 w-3/6'>
          <h1 className='large text-primary'>Sign Up</h1>
          <p className='lead'>Create Your Account</p>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                className='bg-gray-800'
                type='text'
                placeholder='Username'
                name='username'
                value={username}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                className='bg-gray-800'
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                className='bg-gray-800'
                type='password'
                placeholder='Password'
                name='password1'
                value={password1}
                onChange={(e) => onChange(e)}
                minLength='6'
              />
            </div>
            <div className='form-group'>
              <input
                className='bg-gray-800'
                type='password'
                placeholder='Confirm Password'
                name='password2'
                value={password2}
                onChange={(e) => onChange(e)}
                minLength='6'
              />
            </div>
            <input type='submit' className='btn btn-primary' value='Register' />
          </form>
          <p className='my-1'>
            Already have an account? <Link to='/login'>Log In</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);

// const config = {
//   headers: {
//     'Content-Type': 'application/json',
//   },
// };
// const body = JSON.stringify(newUser); // need to stringify before sending to Django backend
// const res = await axios.post(
//   '/api/v1/users/auth/register/',
//   body,
//   config
// );
// console.log(res.data);
// } catch (err) {
// console.error(err.response.data);
// }
