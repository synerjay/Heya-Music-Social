import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    setOpen(false);
    logout();
  };

  const authLinks = (
    <Fragment>
      <div className='md:flex text-white text-xs hidden sm:block ml-2 gap-x-1 '>
        <Link
          to='/dashboard'
          className='bg-gray-900 hover:bg-gray-700 text-white p-1 rounded cursor-pointer hover:text-green-400'
        >
          Dashboard
        </Link>
        <Link
          to='/posts'
          className='bg-gray-900 hover:bg-gray-700 text-white p-1 rounded cursor-pointer ml-1 hover:text-green-400'
        >
          Music Feed
        </Link>
        <Link
          to='/profiles'
          className='bg-gray-900 hover:bg-gray-700 text-white p-1 rounded cursor-pointer ml-1 hover:text-green-400'
        >
          Members
        </Link>

        <a
          onClick={logout}
          href='#!'
          className='bg-red-500 hover:bg-gray-700 text-white p-1 rounded cursor-pointer ml-1'
        >
          <button className='rounded inline-flex items-center'>
            <svg
              className='w-3 h-3 mr-2'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
                clipRule='evenodd'
              />
            </svg>
            <span className='font-semibold'>Logout</span>
          </button>
        </a>
      </div>
      {/* Responsive Mobile Buttons */}
      <div className='flex justify-around space-x-0 w-1/2 md:hidden'>
        <Link
          to='/post-form'
          className='flex flex-row items-center bg-green-600 text-white p-1 rounded mt-0 cursor-pointer hover:bg-gray-700 hover:text-green-400'
        >
          {' '}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
            />
          </svg>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className='navbar-burger flex items-center text-gray-200 mr-2'
        >
          <svg
            className='block h-4 w-4 fill-current'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <title>Mobile menu</title>
            <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z'></path>
          </svg>
        </button>
      </div>
    </Fragment>
  );

  const guestLinks = (
    <div className='flex text-white text-sm font-bold ml-2 gap-x-3 md:gap-x-5 '>
      <Link
        className='bg-gray-900 hover:bg-gray-700 text-white p-1 rounded cursor-pointer hover:text-green-400'
        to='/login'
      >
        Login
      </Link>
      <Link
        className='bg-green-600 hover:bg-gray-700 text-white p-1 rounded cursor-pointer hover:text-green-200'
        to='/register'
      >
        Sign Up
      </Link>
    </div>
  );

  return (
    <>
      <header className='navbar w-full h-16 md:h-16 bg-gray-800 p-1 flex flex-row justify-between items-center'>
        <Link
          className='text-white text-sm md:text-lg flex font-bold justify-around items-center w-44 md:w-56'
          to='/'
        >
          {' '}
          <svg
            version='1.1'
            id='Capa_1'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            x='0px'
            y='0px'
            width='40px'
            height='40px'
            fill='#10B981'
            viewBox='0 0 429.157 429.157'
            // style={'enable-background:new 0 0 429.157 429.157;'}
            xmlSpace='preserve'
          >
            <g>
              <g>
                <path
                  d='M47.102,247.94v-94.204c0-13.006-10.542-23.552-23.552-23.552C10.542,130.185,0,140.73,0,153.736v94.204
			c0,13.009,10.542,23.552,23.55,23.552C36.56,271.492,47.102,260.949,47.102,247.94z'
                />
                <path
                  d='M122.99,346.078V71.308c0-13.006-10.54-23.552-23.55-23.552S75.889,58.301,75.889,71.308v274.771
			c0,13.009,10.542,23.552,23.552,23.552S122.99,359.087,122.99,346.078z'
                />
                <path
                  d='M198.881,305.516V153.736c0-13.006-10.542-23.552-23.552-23.552s-23.55,10.545-23.55,23.552v151.779
			c0,13.008,10.54,23.552,23.55,23.552S198.881,318.523,198.881,305.516z'
                />
                <path
                  d='M405.605,177.294c-13.012,0-23.551,10.545-23.551,23.552v130.851c0,13.008,10.539,23.552,23.551,23.552
			c13.009,0,23.552-10.544,23.552-23.552V200.846C429.157,187.839,418.614,177.294,405.605,177.294z'
                />
                <path
                  d='M329.721,12.428c-13.008,0-23.547,10.545-23.547,23.552v357.198c0,13.012,10.539,23.552,23.547,23.552
			c13.013,0,23.552-10.54,23.552-23.552V35.98C353.272,22.974,342.726,12.428,329.721,12.428z'
                />
                <path
                  d='M253.832,355.248c13.013,0,23.553-10.544,23.553-23.552V104.679c0-13.006-10.54-23.552-23.553-23.552
			c-13.008,0-23.551,10.545-23.551,23.552v227.017C230.281,344.704,240.824,355.248,253.832,355.248z'
                />
              </g>
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
          </svg>
          heya music social
        </Link>

        <nav className='w-1/2 flex items-center justify-end'>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </nav>
      </header>
      {/* Put new Mobile menu below here */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 overflow-hidden'
          onClose={setOpen}
        >
          <div className='absolute inset-0 overflow-hidden'>
            <Transition.Child
              as={Fragment}
              enter='ease-in-out duration-500'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in-out duration-500'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='absolute inset-0 bg-gray-900 bg-opacity-75 transition-opacity' />
            </Transition.Child>
            <div className='fixed inset-y-0 mt-16 right-0 pl-10 max-w-full flex'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <div className='relative w-screen max-w-md'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-500'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-500'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4'>
                      <button
                        type='button'
                        className='rounded-md text-green-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-300'
                        onClick={() => setOpen(false)}
                      >
                        <span className='sr-only'>Close panel</span>
                        <XIcon className='h-6 w-6' aria-hidden='true' />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className='h-full flex flex-col py-6 bg-gray-800 shadow-xl overflow-y-scroll'>
                    <div className='flex space-x-4 items-center px-4 sm:px-6'>
                      <Dialog.Title className='text-2xl font-bold text-green-500'>
                        Welcome,{' '}
                        {user && (
                          <Link
                            onClick={() => setOpen(false)}
                            className='text-green-500 cursor-pointer'
                            to={`/profile/${user.username}`}
                          >
                            {user.username.charAt(0).toUpperCase() +
                              user.username.slice(1)}
                          </Link>
                        )}
                      </Dialog.Title>
                      <Link
                        onClick={() => setOpen(false)}
                        className='block p-0 text-sm font-semibold text-gray-400 hover:bg-gray-900 hover:text-green-600 rounded'
                        to='/edit-profile'
                      >
                        Edit Profile
                      </Link>
                    </div>
                    <div className='mt-0 relative flex-1 px-4 sm:px-6'>
                      {/* Replace with your content */}
                      <div className='flex flex-col justify-between h-full'>
                        <div>
                          <ul>
                            <li className='mb-1'>
                              <Link
                                onClick={() => setOpen(false)}
                                to='/dashboard'
                                className='block p-4 text-sm font-semibold text-gray-400 hover:bg-gray-900 hover:text-green-600 rounded'
                              >
                                Dashboard
                              </Link>
                            </li>
                            <li className='mb-1'>
                              <Link
                                onClick={() => setOpen(false)}
                                to='/posts'
                                className='block p-4 text-sm font-semibold text-gray-400 hover:bg-gray-900 hover:text-green-600 rounded'
                              >
                                Music Feed
                              </Link>
                            </li>
                            <li className='mb-1'>
                              <Link
                                onClick={() => setOpen(false)}
                                to='/profiles'
                                className='block p-4 text-sm font-semibold text-gray-400 hover:bg-gray-900 hover:text-green-600 rounded'
                              >
                                Members
                              </Link>
                            </li>
                            <li className='mb-1'>
                              <Link
                                onClick={() => setOpen(false)}
                                className='block p-4 text-sm font-semibold text-gray-400 hover:bg-gray-900 hover:text-green-600 rounded'
                                to='/add-artist'
                              >
                                Add Artist
                              </Link>
                            </li>
                            <li className='mb-1'>
                              <Link
                                onClick={() => setOpen(false)}
                                className='block p-4 text-sm font-semibold text-gray-400 hover:bg-gray-900 hover:text-green-600 rounded'
                                to='/add-album'
                              >
                                Add Albums
                              </Link>
                            </li>
                            <li className='mb-1'>
                              <Link
                                onClick={() => setOpen(false)}
                                className='block p-4 text-sm font-semibold text-gray-400 hover:bg-gray-900 hover:text-green-600 rounded'
                                to='/add-track'
                              >
                                Add Tracks
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className='mt-auto'>
                          <div className='pt-6'>
                            <Link
                              onClick={() => setOpen(false)}
                              className='block p-1 mb-3 leading-loose text-xs text-center font-semibold bg-gray-900 hover:bg-gray-900 rounded-xl'
                              to='/settings'
                            >
                              Account Settings
                            </Link>
                            <a
                              onClick={() => handleLogout()}
                              href='#!'
                              className='block p-1 mb-2 leading-loose text-xs text-center text-white font-semibold bg-red-600 hover:bg-red-700  rounded-xl'
                            >
                              Log out
                            </a>
                          </div>
                          <p className='my-4 text-xs text-center text-gray-400'>
                            <span>
                              Copyright Created in React + Django by J.
                              Tolentino © 2021
                            </span>
                          </p>
                        </div>
                      </div>
                      {/* /End replace */}
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
