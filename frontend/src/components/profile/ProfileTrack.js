import React from 'react';
import PropTypes from 'prop-types';

const ProfileTrack = ({ track: { title, img, artist } }) => {
  return (
    <div>
      <img className='round-img h-24 w-24' src={img} />
      <h3 className='text-dark'>{title}</h3>
      <p>{artist}</p>
    </div>
  );
};

ProfileTrack.propTypes = {
  track: PropTypes.object.isRequired,
};

export default ProfileTrack;
