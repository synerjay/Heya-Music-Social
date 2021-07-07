import React from 'react';
import React, { Fragment, useState } from 'react';

const Login = () => {
  // Component State Hook
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  // The ...formData is a spreader and copies the formData
  // [e.target.name] corresponding to "name" attribute (not the value) of each HTML tags
  // e.target.value -- is the change in value in the fields

  // const onSubmit = (e) => {
  //   // Do axios fetch here
  // };

  return (
    <Fragment>
      <div className='flex justify-center items-center'>
        <div className='shadow-md mt-5 w-5/12 p-3 flex flex-col'>
          <h1 className='large text-primary'>Sign In</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Sign into Your Account
          </p>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                className='max-w-7xl'
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
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
              />
            </div>
            <input type='submit' className='btn btn-primary' value='Login' />
          </form>
          <p className='my-1'>
            Don't have an account? <Link to='/register'>Sign Up</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
