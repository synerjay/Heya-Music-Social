import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = ({
  setShowAlbumModal,
  setShowArtistModal,
  setShowTrackModal,
}) => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary'></i> Edit Profile
      </Link>
      <button
        type='button'
        className='btn btn-light'
        onClick={() => setShowArtistModal(true)}
      >
        <i className='fas fa-graduation-cap text-primary'></i> Add Favorite
        Artists
      </button>
      <button
        type='button'
        className='btn btn-light'
        onClick={() => setShowAlbumModal(true)}
      >
        Add Favorite Album
      </button>
      <button
        type='button'
        className='btn btn-light'
        onClick={() => setShowTrackModal(true)}
      >
        Add Favorite Tracks
      </button>
    </div>
  );
};

export default DashboardActions;
