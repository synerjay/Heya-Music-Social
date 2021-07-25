import React from 'react';

const RecommendItem = ({ track }) => {
  return (
    <div className='flex flex-col h-56 w-56 items-center '>
      <img src={track.img} className='h-36 w-36 ' />
      <div className='items-center'>
        <p className='text-sm'>{track.title}</p>
        <p className='text-sm font-bold'>{track.artist}</p>
      </div>
    </div>
  );
};

export default RecommendItem;
