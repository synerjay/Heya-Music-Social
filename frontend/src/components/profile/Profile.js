import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id); // in react, we get the params by accessing the match object from the props
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            {' '}
            Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user.username === profile.user && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div class='profile-grid my-1'>
            {' '}
            {/* This div grid is needed to organize the profile components into a grid*/}
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div class='profile-exp bg-white p-2'>
              <h2 class='text-primary'>Favorite Albums</h2>
              {profile.albums.length > 0 ? (
                <Fragment>
                  {profile.albums.map((album) => (
                    <ProfileAlbums key={album._id} album={album} />
                  ))}
                </Fragment>
              ) : (
                <h4> No favorite albums yet</h4>
              )}
            </div>
            <div class='profile-edu bg-white p-2'>
              <h2 class='text-primary'>Favorite Artists</h2>
              {profile.artists.length > 0 ? (
                <Fragment>
                  {profile.artists.map((artist) => (
                    <ProfileArtist key={artist.id} artist={artist} />
                  ))}
                </Fragment>
              ) : (
                <h4> No favorite artists yet</h4>
              )}
            </div>
            <div class='profile-edu bg-white p-2'>
              <h2 class='text-primary'>Favorite Tracks</h2>
              {profile.tracks.length > 0 ? (
                <Fragment>
                  {profile.tracks.map((track) => (
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
