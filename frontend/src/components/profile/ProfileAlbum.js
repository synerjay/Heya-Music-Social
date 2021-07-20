import React from 'react';
import PropTypes from 'prop-types';

const ProfileAlbum = ({ album: { title, artist, img } }) => {
  return (
    <div>
      <img className='round-img h-24 w-24' src={img} />
      <h3 className='text-dark'>{title}</h3>
      <p>{artist}</p>
    </div>
  );
};

ProfileAlbum.propTypes = {
  album: PropTypes.object.isRequired,
};

export default ProfileAlbum;
