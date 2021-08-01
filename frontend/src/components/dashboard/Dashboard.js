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

  return loading && profile === null ? (
    <div className='w-full h-screen flex justify-center sm:mt-32 md:mt-36 '>
      <ReactLoading type='bars' color='#fff' width={300} />
    </div>
  ) : (
    <Fragment>
      <h1 className='text-red-500 text-2xl'> Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome{' '}
        {user && user.username.charAt(0).toUpperCase() + user.username.slice(1)}
      </p>
      {profile !== null ? (
        <Fragment>
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
          />
          <ArtistRec />
          <GenreRec />
          <TrackRec />
          <div className='flex flex-row justify-center gap-x-10 my-10'>
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
