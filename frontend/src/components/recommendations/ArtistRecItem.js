import React from 'react';

const ArtistRecItem = ({ track }) => {
  return (
    <div className='flex flex-col h-56 w-56 '>
      <img src={track.img} className='h-36 w-36 ' />
      <div className='ml-3'>
        <p className='text-sm'>{track.title}</p>
        <p className='text-sm font-bold'>{track.artist}</p>
      </div>
    </div>
  );
};

export default ArtistRecItem;
