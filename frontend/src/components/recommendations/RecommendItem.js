import React from 'react';
import Spinner from '../layout/Spinner';
import ReactLoading from 'react-loading';

const RecommendItem = ({ track }) => {
  return track === null ? (
    <div>
      <ReactLoading type='bars' color='#fff' width={48} />
    </div>
  ) : (
    <div className='flex flex-col h-72 w-60 items-center '>
      <img src={track.img} className='h-48 w-48' />
      <div className='items-center'>
        <p className='text-sm'>{track.title}</p>
        <p className='text-sm font-bold'>{track.artist}</p>
      </div>
    </div>
  );
};

export default RecommendItem;
