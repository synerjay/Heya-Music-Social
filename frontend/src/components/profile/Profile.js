import React, { Fragment, useEffect, useState } from 'react';
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
import StatusUpdates from './StatusUpdates';

const Profile = ({
  getProfileById,
  profile: { memberProfile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id); // in react, we get the params by accessing the match object from the props
  }, [getProfileById, match.params.id]);

  const [updates, setUpdates] = useState(null);

  useEffect(() => {
    if (!memberProfile) return;
    setUpdates(memberProfile.updates);
  }, [memberProfile]);

  useEffect(() => {
    console.log(updates);
  }, [updates]);

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
          {/* Start New Profile Component here */}
          <div class='bg-gray-800 mt-24 md:mt-16 p-1 relative rounded-lg shadow-xl w-full md:w-2/3  mx-auto'>
            <div class='flex justify-center'>
              <img
                src={memberProfile.avatar_url}
                alt=''
                class='rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-2xl border-4 border-green-600'
              />
            </div>

            <div class='mt-10'>
              <h1 class='font-bold text-center text-3xl text-gray-100'>
                {memberProfile.name}
              </h1>
              <p class='text-center text-sm text-gray-400 font-medium'>
                Likes {memberProfile.genre}
              </p>
              <p>
                <span></span>
              </p>
              <div class='text-center my-5'>
                {/* <a
                  href='#'
                  class='text-indigo-200 block text-center font-medium leading-6 px-6 py-3 bg-indigo-600'
                > */}
                {memberProfile.bio}
                {/* Connect with <span class='font-bold'>@eduardpantazi</span> */}
                {/* </a> */}
              </div>
              <div class='flex justify-evenly my-0'>
                <a
                  href={memberProfile.instagram}
                  class='bg font-bold text-sm text-blue-800 w-full py-1 text-center hover:bg-blue-800 hover:text-white hover:shadow-lg'
                >
                  Instagram
                </a>
                <a
                  href={memberProfile.twitter}
                  class='bg font-bold text-sm text-blue-400 w-full text-center py-1 hover:bg-blue-400 hover:text-white hover:shadow-lg'
                >
                  Twitter
                </a>
                <a
                  href={memberProfile.spotify}
                  class='bg font-bold text-sm text-yellow-600 w-full text-center py-1 hover:bg-yellow-600 hover:text-white hover:shadow-lg'
                >
                  Facebook
                </a>
                <a
                  href=''
                  class='bg font-bold text-sm text-gray-600 w-full text-center py-1 hover:bg-gray-600 hover:text-white hover:shadow-lg'
                >
                  Email
                </a>
              </div>

              <div class='w-full'>
                <h3 class='font-bold text-gray-200 text-left px-4'>
                  Recent Music Feed
                </h3>
                <div class='mt-5 w-full'>
                  {memberProfile.updates.map((update) => {
                    return <StatusUpdates key={update.id} post={update} />;
                  })}
                </div>
              </div>
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

{
  /* <a
                    href='#'
                    class='w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 block hover:bg-gray-100 transition duration-150'
                  >
                    <img
                      src='https://pantazisoft.com/img/avatar-2.jpeg'
                      alt=''
                      class='rounded-full h-6 shadow-md inline-block mr-2'
                    />
                    Updated his status
                    <span class='text-gray-400 text-sm'>24 min ago</span>
                  </a>

                  <a
                    href='#'
                    class='w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 block hover:bg-gray-100 transition duration-150'
                  >
                    <img
                      src='https://pantazisoft.com/img/avatar-2.jpeg'
                      alt=''
                      class='rounded-full h-6 shadow-md inline-block mr-2'
                    />
                    Added new profile picture
                    <span class='text-gray-400 text-sm'>42 min ago</span>
                  </a>

                  <a
                    href='#'
                    class='w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 block hover:bg-gray-100 transition duration-150'
                  >
                    <img
                      src='https://pantazisoft.com/img/avatar-2.jpeg'
                      alt=''
                      class='rounded-full h-6 shadow-md inline-block mr-2'
                    />
                    Posted new article in <span class='font-bold'>Web Dev</span>
                    <span class='text-gray-400 text-sm'>49 min ago</span>
                  </a>

                  <a
                    href='#'
                    class='w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 block hover:bg-gray-100 transition duration-150'
                  >
                    <img
                      src='https://pantazisoft.com/img/avatar-2.jpeg'
                      alt=''
                      class='rounded-full h-6 shadow-md inline-block mr-2'
                    />
                    Edited website settings
                    <span class='text-gray-400 text-sm'>1 day ago</span>
                  </a>

                  <a
                    href='#'
                    class='w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 block hover:bg-gray-100 transition duration-150'
                  >
                    <img
                      src='https://pantazisoft.com/img/avatar-2.jpeg'
                      alt=''
                      class='rounded-full h-6 shadow-md inline-block mr-2'
                    />
                    Added new rank
                    <span class='text-gray-400 text-sm'>5 days ago</span>
                  </a> */
}

{
  /* <Fragment>
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
        </Fragment> */
}
