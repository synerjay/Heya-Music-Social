import React from 'react';

const SearchResults = ({ track }) => {
  return (
    <div className='flex items-center'>
      <img src={track.albumUrl} className='h-16 w-16' />
      <div className='ml-3'>
        {/* <div>{track.title}</div> */}
        <div>{track.album}</div>
        <div className='font-bold'>{track.artist}</div>
      </div>
    </div>
  );
};

export default SearchResults;
