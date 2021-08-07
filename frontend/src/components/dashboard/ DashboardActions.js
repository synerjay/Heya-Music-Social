import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = ({
  setShowAlbumModal,
  setShowArtistModal,
  setShowTrackModal,
  setShowProfileModal,
}) => {
  return (
    <div className='w-full p-1 flex justify-around gap-x-5 md:hidden'>
      {/* <Link to='/edit-profile' className='bg-gray-800 text-white p-1 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-green-400'>
        <i className='fas fa-user-circle text-primary'></i> Edit Profile
      </Link> */}
      <button
        type='button'
        className='bg-gray-800 text-white p-1 rounded mt-2 text-xs cursor-pointer hover:bg-gray-700 hover:text-green-400'
        onClick={() => setShowProfileModal(true)}
      >
        <i className='fas fa-graduation-cap text-primary'></i> Edit Profile
      </button>
      <button
        type='button'
        className='bg-gray-800 text-white p-1 rounded mt-2 text-xs cursor-pointer hover:bg-gray-700 hover:text-green-400'
        onClick={() => setShowArtistModal(true)}
      >
        <i className='fas fa-graduation-cap text-primary'></i> Add Favorite
        Artists
      </button>
      <button
        type='button'
        className='bg-gray-800 text-white p-1 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-green-400'
        onClick={() => setShowAlbumModal(true)}
      >
        Add Favorite Album
      </button>
      <button
        type='button'
        className='bg-gray-800 text-white p-1 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-green-400'
        onClick={() => setShowTrackModal(true)}
      >
        Add Favorite Tracks
      </button>
      <button
        type='button'
        className='bg-gray-800 text-white p-1 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-green-400'
        onClick={() => {}}
      >
        <i className='fas fa-graduation-cap text-primary'></i> Settings
      </button>
    </div>
  );
};

export default DashboardActions;
