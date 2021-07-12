import React from 'react';

const ArtistResults = ({ artist }) => {
  return (
    <div className='flex items-center'>
      <img src={artist.imageUrl} className='h-16 w-16' />
      <div className='ml-3'>
        {/* <div>{track.title}</div> */}
        {/* <div>{track.album}</div> */}
        <div className='font-bold'>{artist.name}</div>
      </div>
    </div>
  );
};

export default ArtistResults;
