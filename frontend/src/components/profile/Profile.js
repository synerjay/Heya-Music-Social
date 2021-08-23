import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';

import ProfileTrack from './ProfileTrack';
import ProfileArtist from './ProfileArtist';
import ProfileAlbum from './ProfileAlbum';
import StatusUpdates from './StatusUpdates';
import ReactLoading from 'react-loading';

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
    if (!memberProfile) return;
    console.log(memberProfile);
  }, [memberProfile]);

  return (
    <Fragment>
      {memberProfile === null || loading ? (
        <div className='w-full h-screen flex justify-center sm:mt-32 md:mt-36 '>
          <ReactLoading type='bars' color='#fff' width={300} />
        </div>
      ) : (
        <Fragment>
          <div className='flex w-full gap-x-2 '>
            <Link
              to='/profiles'
              className='flex items-center w-48  justify-center mb-2 md:mb-0 bg-green-600 md:px-6 md:py-3 px-10 py-0 h-12 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500'
            >
              {' '}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-3 w-3 text-white mr-1'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z'
                  clipRule='evenodd'
                />
              </svg>
              Back to Profiles
            </Link>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user.username === memberProfile.user && (
                <Link
                  to='/edit-profile'
                  className='flex items-center w-40 justify-center mb-2 md:mb-0 bg-green-600 md:px-6 md:py-3 px-10 py-0 h-12 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500'
                >
                  Edit Profile
                </Link>
              )}
          </div>
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
              <div class='text-center my-5'>{memberProfile.bio}</div>
              <div class='flex justify-evenly my-0'>
                <a
                  href={memberProfile.instagram}
                  class='font-bold text-sm text-yellow-600 w-full text-center py-1 hover:bg-yellow-600 hover:text-white hover:shadow-lg'
                >
                  Instagram
                </a>
                <a
                  href={memberProfile.twitter}
                  class='font-bold text-sm text-blue-400 w-full text-center py-1 hover:bg-blue-400 hover:text-white hover:shadow-lg'
                >
                  Twitter
                </a>
                <a
                  href={memberProfile.spotify}
                  class='font-bold text-sm text-blue-800 w-full py-1 text-center hover:bg-blue-800 hover:text-white hover:shadow-lg'
                >
                  Facebook
                </a>
              </div>
              <ProfileTrack
                name={memberProfile.name}
                tracks={memberProfile.tracks}
              />
              <ProfileAlbum
                name={memberProfile.name}
                albums={memberProfile.albums}
              />
              <ProfileArtist
                name={memberProfile.name}
                artists={memberProfile.artists}
              />

              <div class='w-full'>
                <h3 class='font-bold text-gray-200 text-left px-4'>
                  Recent Music Feed
                </h3>
                <div class='mt-5 w-full'>
                  {memberProfile.updates
                    .sort((a, b) => {
                      return new Date(b.date_added) - new Date(a.date_added);
                    })
                    .map((update) => {
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
