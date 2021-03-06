import React, { Fragment, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchAlbum from '../search/SearchAlbum';
import CustomModal from '../layout/CustomModal';
import SearchArtists from '../search/SearchArtists';
import SearchTracks from '../search/SearchTracks';
import ProfileForm from '../profile-forms/ProfileForm';
import PostForm from '../posts/PostForm';
import Settings from '../layout/Settings';

const PrivateRoute = ({
  name,
  component: Component,
  auth: { isAuthenticated, loading, user },
  profile: { profile },
  ...rest
}) => {
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [showArtistModal, setShowArtistModal] = useState(false);
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  const [showSideBar, setShowSideBar] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <main className='flex w-full h-screen'>
            {showProfileModal ? (
              <CustomModal
                component={ProfileForm}
                setShowModal={setShowProfileModal}
              />
            ) : null}

            {showPostForm ? (
              <CustomModal
                title='Add your favorite albums'
                component={PostForm}
                setShowModal={setShowPostForm}
                history={props.history}
              />
            ) : null}

            {showAlbumModal ? (
              <CustomModal
                title='Add your favorite albums'
                component={SearchAlbum}
                setShowModal={setShowAlbumModal}
              />
            ) : null}

            {showArtistModal ? (
              <CustomModal
                // localProfile={localProfile}
                title='Add your favorite artists'
                component={SearchArtists}
                setShowModal={setShowArtistModal}
              />
            ) : null}

            {showTrackModal ? (
              <CustomModal
                title='Add your favorite tracks'
                component={SearchTracks}
                setShowModal={setShowTrackModal}
              />
            ) : null}

            {showSettings ? (
              <CustomModal
                component={Settings}
                setShowModal={setShowSettings}
              />
            ) : null}

            {showSideBar ? (
              <aside className='w-64  h-full bg-gray shadow-md hidden sm:block'>
                <div className='w-64   flex flex-col justify-between h-screen p-4 bg-gray-800'>
                  <div className='text-sm'>
                    <div
                      onClick={() => setShowProfileModal(true)}
                      className='bg-gray-900 text-white p-5 rounded cursor-pointer text-center'
                    >
                      <h1 className='text-green-500 text-xl'>{name}</h1>
                      <p className='text-lg'>
                        <i className='fas fa-user'></i> Welcome{' '}
                        {user &&
                          user.username.charAt(0).toUpperCase() +
                            user.username.slice(1)}
                      </p>
                      <div class='w-full mt-2 cursor-pointer flex justify-center'>
                        {profile && (
                          <img
                            class='w-16 h-16 rounded-full mb-2'
                            src={profile.avatar}
                          />
                        )}
                      </div>
                      <p>Edit Profile</p>
                    </div>
                    <div
                      onClick={() => setShowPostForm(true)}
                      className='flex flex-row items-center bg-green-600 text-white p-1 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-green-400'
                    >
                      {' '}
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4 mr-2'
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
                      Update Music Status
                    </div>
                    <div
                      onClick={() => setShowArtistModal(true)}
                      className='bg-gray-900 text-white p-1 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-green-400'
                    >
                      Add Favorite Artists
                    </div>
                    {/* <div className='bg-gray-900 flex justify-between items-center text-white p-1 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-green-400'>
              <span>Reports</span>
              <span className='w-4 h-4 bg-blue-600 rounded-full text-white text-center font-normal text-xs'>
                5
              </span>
            </div> */}
                    <div
                      onClick={() => setShowAlbumModal(true)}
                      className='bg-gray-900 text-white p-1 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-green-400'
                    >
                      Add Favorite Albums
                    </div>
                    <div
                      onClick={() => setShowTrackModal(true)}
                      className='bg-gray-900 text-white p-1 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-green-400'
                    >
                      Add Favorite Tracks
                    </div>
                    {/* <div className='bg-gray-900 text-white p-1 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-green-400'>
              Settings
            </div> */}
                  </div>

                  <div
                    onClick={() => setShowSettings(true)}
                    className='flex p-1 text-white bg-gray-900 rounded cursor-pointer text-center text-sm hover:bg-gray-700 hover:text-green-400'
                  >
                    <button className='rounded inline-flex items-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4 mr-2'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                      </svg>
                      <span>Account Settings</span>
                    </button>
                  </div>
                </div>
              </aside>
            ) : null}

            <section className='w-full md:w-4/5 p-4 mt-7 md:mt-0 h-auto'>
              <Component setShowSideBar={setShowSideBar} {...props} />
            </section>
          </main>
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps)(PrivateRoute);
