import React from 'react';

const SelectedTracks = ({ track, added }) => {
  return (
    <div className='flex items-center'>
      <img src={track.albumUrl} className='h-16 w-16' />
      <div className='ml-3'>
        <div>{track.title}</div>
        <div className='font-bold'>{track.artist}</div>
      </div>
      <div>
        {added ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='ml-2 h-7 w-7 text-green-500'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
              clipRule='evenodd'
            />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='ml-2 h-7 w-7'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z'
              clipRule='evenodd'
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default SelectedTracks;
