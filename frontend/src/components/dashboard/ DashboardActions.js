import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = ({ setShowAlbumModal }) => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary'></i> Edit Profile
      </Link>
      <Link to='/add-artist' className='btn btn-light'>
        <i className='fas fa-graduation-cap text-primary'></i> Add Favorite
        Artists
      </Link>
      <button
        type='button'
        className='btn btn-light'
        onClick={() => setShowAlbumModal(true)}
      >
        <i className='fab fa-black-tie text-primary'></i> Add Favorite Album
      </button>
      <Link to='/add-track' className='btn btn-light'>
        <i className='fas fa-graduation-cap text-primary'></i> Add Favorite
        Tracks
      </Link>
    </div>
  );
};

export default DashboardActions;
