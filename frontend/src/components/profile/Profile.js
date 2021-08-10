import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileTrack from './ProfileTrack';
import ProfileArtist from './ProfileArtist';
import ProfileAlbum from './ProfileAlbum';

const Profile = ({
  getProfileById,
  profile: { memberProfile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id); // in react, we get the params by accessing the match object from the props
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {memberProfile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            {' '}
            Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user.username === memberProfile.user && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div class='profile-grid my-1'>
            {' '}
            {/* This div grid is needed to organize the profile components into a grid*/}
            <ProfileTop profile={memberProfile} />
            <ProfileAbout profile={memberProfile} />
            <div class='profile-album bg-white p-2'>
              <h2 class='text-primary'>Favorite Albums</h2>
              {memberProfile.albums.length > 0 ? (
                <Fragment>
                  {memberProfile.albums.map((album) => (
                    <ProfileAlbum key={album.id} album={album} />
                  ))}
                </Fragment>
              ) : (
                <h4> No favorite albums yet</h4>
              )}
            </div>
            <div class='profile-artist bg-white p-2'>
              <h2 class='text-primary'>Favorite Artists</h2>
              {memberProfile.artists.length > 0 ? (
                <Fragment>
                  {memberProfile.artists.map((artist) => (
                    <ProfileArtist key={artist.id} artist={artist} />
                  ))}
                </Fragment>
              ) : (
                <h4> No favorite artists yet</h4>
              )}
            </div>
            <div class='profile-track bg-white p-2'>
              <h2 class='text-primary'>Favorite Tracks</h2>
              {memberProfile.tracks.length > 0 ? (
                <Fragment>
                  {memberProfile.tracks.map((track) => (
                    <ProfileTrack key={track.id} track={track} />
                  ))}
                </Fragment>
              ) : (
                <h4> No favorite tracks yet</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
