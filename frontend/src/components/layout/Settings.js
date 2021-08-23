import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteAccount } from '../../actions/profile';
import { changePassword } from '../../actions/auth';
import { setAlert } from '../../actions/alert';

// Change password and  Delete account button

const initialState = {
  new_password1: '',
  new_password2: '',
};

const Settings = ({ auth: { user }, deleteAccount, changePassword }) => {
  const [formData, setFormData] = useState(initialState);

  const { new_password1, new_password2 } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();

    if (new_password1 !== new_password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      changePassword({ new_password1, new_password2 });
    }
  };

  return (
    <div className='max-w-2xl mx-auto w-full space-y-8 p-10 pt-10 bg-gray-800 rounded-xl shadow-lg z-10'>
      <div className='grid  gap-8 grid-cols-1'>
        <div className='flex flex-col '>
          <div className='flex flex-col sm:flex-row items-center'>
            <h2 className='flex items-center font-semibold text-2xl mr-auto'>
              Account Settings{' '}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='ml-2 h-7 w-7'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                />
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
            </h2>
            <div className='w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0'></div>
          </div>
          <div className='mt-5'>
            <form onSubmit={onSubmit}>
              <div className='md:flex flex-row items-center md:space-x-8 w-full text-xs'>
                <div className='mb-3 space-y-5 w-full text-sm'>
                  <label className='text-sm font-semibold px-1'>
                    Change Password
                  </label>
                  <input
                    className='w-full -ml-2 p-1 rounded-lg border-2 bg-gray-900 border-gray-200 outline-none focus:border-green-600'
                    required='required'
                    type='password'
                    placeholder='New Password'
                    name='new_password1'
                    value={new_password1}
                    onChange={onChange}
                  />
                  <input
                    className='w-full -ml-2 p-1 rounded-lg border-2 bg-gray-900 border-gray-200 outline-none focus:border-green-600'
                    required='required'
                    type='password'
                    placeholder='Confirm New Password'
                    name='new_password2'
                    value={new_password2}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className='mt-0 text-right md:space-x-3 md:block flex flex-col-reverse'>
                <button
                  type='submit'
                  disabled={user && user.username == 'guest' ? true : false}
                  className='mb-2 md:mb-0 bg-green-600 md:px-6 md:py-3 px-1 py-1 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500'
                >
                  {user && user.username == 'guest' ? (
                    <>Sorry, Guests cannot change the password</>
                  ) : (
                    <>Save New Password</>
                  )}
                </button>
              </div>
            </form>

            <div className='mt-32 flex flex-row-reverse '>
              <div className='flex flex-col'>
                <p className='flex items-center justify-center text-center text-xs text-red-600 uppercase mb-2 font-bold'>
                  {user && user.username == 'guest' ? (
                    <>Guests cannot delete this account</>
                  ) : (
                    <>Danger Zone</>
                  )}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 text-yellow-400'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                </p>
                <button
                  disabled={user && user.username == 'guest' ? true : false}
                  className='mb-2 w-96 md:w-auto md:mb-0 md:px-6 bg-red-700 md:py-3 px-5 py-1 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-800'
                  onClick={() => deleteAccount()}
                >
                  <i className='fas fa-user-minus' /> Delete My Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deleteAccount,
  changePassword,
})(Settings);
