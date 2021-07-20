import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: { name, avatar_url, instagram, twitter, spotify, user },
}) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <img className='round-img my-1' src={avatar_url} alt='' />
      <h1 className='large'>{name}</h1>
      <div className='icons my-1'>
        {twitter && (
          <a
            href={`www.twitter.com/${twitter}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            Twitter
          </a>
        )}
        {instagram && (
          <a
            href={`www.instagram.com/${instagram}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            Instagram
          </a>
        )}
        {spotify && (
          <a
            href={`www.spotify.com/${spotify}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            Spotify
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
