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

  return (
    <Fragment>
      <h1 className='text-red-500 text-2xl'> Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome{' '}
        {user && user.username.charAt(0).toUpperCase() + user.username.slice(1)}
      </p>
      {profile !== null ? (
        <Fragment>
          {/* Testing Modal purposes */}
          {/* <button
            className='bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
            type='button'
            onClick={() => setShowModal(true)}
          >
            Open regular modal
          </button> */}

          {showAlbumModal ? (
            <>
              <div className='h-full w-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                <div className='h-5/6 w-5/6 overflow-y-autorelative my-6 mx-auto max-w-3xl'>
                  {/*content*/}
                  <div className=' h-full border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                    {/*header*/}
                    <div className='h-1/6 flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
                      <h3 className='text-3xl font-semibold'>
                        Add your favorite albums
                      </h3>
                      <button
                        className='p-1 ml-auto bg-transparent border-0 text-black float-right text-xl leading-none font-semibold outline-none focus:outline-none'
                        onClick={() => setShowAlbumModal(false)}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-6 w-6'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                        </svg>
                      </button>
                    </div>
                    {/*body*/}
                    <div className='h-full w-full relative p-6 flex-auto overflow-scroll'>
                      <SearchAlbum />
                    </div>
                    {/*footer*/}
                    <div className=' h-3.5 flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
                      <button
                        className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                        type='button'
                        onClick={() => setShowAlbumModal(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
            </>
          ) : null}

          {/*  Testing Modal Purposes */}

          <DashboardActions setShowAlbumModal={setShowAlbumModal} />
          <ArtistRec />
          <GenreRec />
          <TrackRec />
          <div className='flex flex-row gap-x-10'>
            <Album albums={profile.albums} />
            <Artist artists={profile.artists} />
            <Track tracks={profile.tracks} />
          </div>
          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus' /> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
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
