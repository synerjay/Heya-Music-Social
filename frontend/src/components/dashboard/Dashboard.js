import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getAccessToken,
  getCurrentProfile,
  deleteAccount,
} from '../../actions/profile';
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
import ReactLoading from 'react-loading';
import ProfileForm from '../profile-forms/ProfileForm';

const Dashboard = ({
  accessToken,
  getCurrentProfile,
  getAccessToken,
  deleteAccount,
  setShowSideBar,
  auth: { user, token },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getAccessToken();
    getCurrentProfile();
  }, []);

  useEffect(() => {
    if (!loading && !profile) {
      setShowSideBar(false);
    } else {
      setShowSideBar(true);
    }
  }, [profile, loading]);

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
  const [showSettings, setShowSettings] = useState(false);

  return loading && profile === null ? (
    <div className='w-full h-screen flex justify-center sm:mt-32 md:mt-36 '>
      <ReactLoading type='bars' color='#fff' width={300} />
    </div>
  ) : (
    <Fragment>
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

          {/* <DashboardActions
            setShowAlbumModal={setShowAlbumModal}
            setShowArtistModal={setShowArtistModal}
            setShowTrackModal={setShowTrackModal}
            setShowProfileModal={setShowProfileModal}
          /> */}
          <GenreRec profile={profile} accessToken={accessToken} />
          <ArtistRec profile={profile} accessToken={accessToken} />
          <TrackRec profile={profile} accessToken={accessToken} />
          <Track tracks={profile.tracks} />
          <Album albums={profile.albums} />
          <Artist artists={profile.artists} />
          {/* <div className='flex flex-col justify-center gap-x-2 md:gap-x-10 my-10'>
            <Album albums={profile.albums} />
            <Artist artists={profile.artists} />
            <Track tracks={profile.tracks} />
          </div> */}
          {/* <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus' /> Delete My Account
            </button>
          </div> */}
        </Fragment>
      ) : (
        <Fragment>
          <h2 className='text-4xl font-semibold text-green-500 text-center'>
            {' '}
            First things first
          </h2>
          <p className='text-md my-1 text-center'>
            To best recommend you new music, please let us know who you are.
          </p>
          <ProfileForm />
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
