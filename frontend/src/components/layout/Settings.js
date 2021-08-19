import React from 'react';
import { connect } from 'react-redux';
import { deleteAccount } from '../../actions/profile';

// Change password and  Delete account button

const Settings = ({ deleteAccount }) => {
  return (
    <div className='max-w-2xl mx-auto w-full space-y-8 p-10 pt-10 bg-gray-800 rounded-xl shadow-lg z-10'>
      <div className='grid  gap-8 grid-cols-1'>
        <div className='flex flex-col '>
          <div className='flex flex-col sm:flex-row items-center'>
            <h2 className='font-semibold text-4xl mr-auto'>Account Settings</h2>
            <div className='w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0'></div>
          </div>
          <div className='mt-5'>
            <form
            // onSubmit={onSubmit}
            >
              <div className='md:flex flex-row items-center md:space-x-8 w-full text-xs'>
                <div className='mb-3 space-y-2 w-full text-sm'>
                  <label className='text-xs font-semibold px-1'>
                    Name <abbr title='required'>*</abbr>
                  </label>
                  <input
                    className='w-full -ml-2 p-1 rounded-lg border-2 bg-gray-900 border-gray-200 outline-none focus:border-green-600'
                    required='required'
                    type='text'
                    placeholder='Name'
                    name='name'
                    // value={name}
                    // onChange={onChange}
                  />
                  <p className='text-red text-xs hidden'>
                    Please fill out this field.
                  </p>
                </div>
              </div>
              <div className='my-2'>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteAccount()}
                >
                  <i className='fas fa-user-minus' /> Delete My Account
                </button>
              </div>

              <div className='mt-5 text-right md:space-x-3 md:block flex flex-col-reverse'>
                <button
                  type='submit'
                  className='mb-2 md:mb-0 bg-green-600 md:px-6 md:py-3 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500'
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, {
  deleteAccount,
})(Settings);
