import React from 'react';

const SelectedArtists = ({ artist, added }) => {
  return (
    <div className='flex items-center'>
      <img src={artist.img} className='h-32 w-32' />
      <div className='ml-3'>
        <div className='font-bold'>{artist.name}</div>
      </div>
    </div>
  );
};

export default SelectedArtists;
