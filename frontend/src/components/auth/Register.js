import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  //Component State Hook
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  // The ...formData is a spreader and copies the formData
  // [e.target.name] corresponding to "name" attribute (not the value) of each HTML tags
  // e.target.value -- is the change in value in the fields

  // const onSubmit = (e) => {
  //   // e.preventDefault();
  //   // Do axios post request here
  // };

  return (
    <Fragment>
      <div className='container-form flex justify-between w-auto'>
        <div className='iphone bg-gray-500 w-1/2 rounded-3xl border-gray-900 border-4'></div>
        <div className='p-10 w-3/6'>
          <h1 className='large text-primary'>Sign Up</h1>
          <p className='lead'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-9 inline-block mr-1'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z' />
            </svg>{' '}
            Create Your Account
          </p>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
                required
              />
              <small className='form-text'>
                This site uses Gravatar so if you want a profile image, use a
                Gravatar email
              </small>
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
                minLength='6'
              />
            </div>
            <div className='form-group'>
              <input
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

export default Register;
