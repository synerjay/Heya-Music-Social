import React from 'react';
import PropTypes from 'prop-types';

const ProfileArtist = ({ artist: { name, img } }) => {
  return (
    <div>
      <img src={img} />
      <h3 className='text-dark'>{name}</h3>
    </div>
  );
};

ProfileArtist.propTypes = {
  artist: PropTypes.object.isRequired,
};

export default ProfileArtist;
