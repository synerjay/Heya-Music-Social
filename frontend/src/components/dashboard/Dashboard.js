import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getAccessToken,
  getCurrentProfile,
  deleteAccount,
} from '../../actions/profile';
import { Link } from 'react-router-dom';
import DashboardActions from './ DashboardActions';
import Album from './Album';
import Artist from './Artist';
import Track from './Track';
import ArtistRec from '../recommendations/ArtistRec';
import GenreRec from '../recommendations/GenreRec';
import TrackRec from '../recommendations/TrackRec';
import SearchAlbum from '../search/SearchAlbum';
import CustomModal from '../layout/CustomModal';
import SearchArtists from '../search/SearchArtists';
import SearchTracks from '../search/SearchTracks';
import Spinner from '../layout/Spinner';
import ReactLoading from 'react-loading';
import TestingForm from '../profile-forms/TestingForm';
import ProfileForm from '../profile-forms/ProfileForm';

const Dashboard = ({
  accessToken,
  getCurrentProfile,
  getAccessToken,
  deleteAccount,
  auth: { user, token },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getAccessToken();
    getCurrentProfile();
  }, []);

  // Get another Spotify Key after every one hour expiration time
  useEffect(() => {
    const interval = setInterval(() => {
      getAccessToken();
    }, 1000 * 60 * 60); // one hour

    return () => clearInterval(interval); // unmount & cleanup
  }, [accessToken]);

  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [showArtistModal, setShowArtistModal] = useState(false);
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  return loading && profile === null ? (
    <div className='w-full h-screen flex justify-center sm:mt-32 md:mt-36 '>
      <ReactLoading type='bars' color='#fff' width={300} />
    </div>
  ) : (
    // <Fragment>
    <main className='flex w-full h-screen'>
      <aside className='w-96  h-full bg-gray shadow-md hidden sm:block'>
        <div className='w-64   flex flex-col justify-between h-screen p-4 bg-gray-800'>
          <div className='text-sm'>
            <div
              onClick={() => setShowProfileModal(true)}
              className='bg-gray-900 text-white p-5 rounded cursor-pointer text-center'
            >
              <h1 className='text-green-500 text-xl'> Dashboard</h1>
              <p className='text-lg'>
                <i className='fas fa-user'></i> Welcome{' '}
                {user &&
                  user.username.charAt(0).toUpperCase() +
                    user.username.slice(1)}
              </p>
              <div class='w-full mt-2 cursor-pointer flex justify-center'>
                <img class='w-16 h-16 rounded-full' src={profile.avatar_url} />
              </div>
            </div>
            <div
              onClick={() => setShowProfileModal(true)}
              className='bg-gray-900 text-white p-1 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-green-400'
            >
              Edit Profile
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
            <div className='bg-gray-900 text-white p-1 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-green-400'>
              Settings
            </div>
          </div>

          <div className='flex p-1 text-white bg-red-500 rounded cursor-pointer text-center text-sm'>
            <button className='rounded inline-flex items-center'>
              <svg
                className='w-4 h-4 mr-2'
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
          </div>
        </div>
      </aside>

      <section className='w-full md:w-4/5 p-4 h-auto'>
        {/* <div className='w-full h-64 border-dashed border-4 p-4 text-md'> */}
        {/*  */}
        {profile !== null ? (
          <Fragment>
            {showProfileModal ? (
              <CustomModal
                component={ProfileForm}
                setShowModal={setShowProfileModal}
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

            {/*  Testing Modal Purposes */}

            <DashboardActions
              setShowAlbumModal={setShowAlbumModal}
              setShowArtistModal={setShowArtistModal}
              setShowTrackModal={setShowTrackModal}
              setShowProfileModal={setShowProfileModal}
            />
            <GenreRec />
            <ArtistRec />
            <TrackRec />
            <div className='flex flex-row justify-center gap-x-10 my-10'>
              <Album albums={profile.albums} />
              <Artist artists={profile.artists} />
              <Track tracks={profile.tracks} />
            </div>
            <div className='my-2'>
              <button
                className='btn btn-danger'
                onClick={() => deleteAccount()}
              >
                <i className='fas fa-user-minus' /> Delete My Account
              </button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <h2 className='text-4xl'> First things first</h2>
            <p className='text-sm my-1'>
              To best recommend you new music, please let us know who you are.
            </p>
            {/* <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link> */}
            <ProfileForm />
          </Fragment>
        )}
        {/* </div> */}
      </section>
    </main>
    // </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  accessToken: state.profile.accessToken,
});

export default connect(mapStateToProps, {
  getAccessToken,
  getCurrentProfile,
  deleteAccount,
})(Dashboard);
