import React from 'react';

const SelectedArtists = ({ artist, added }) => {
  return (
    <div className='flex max-w-lg my-1 items-center'>
      {artist.img === '' ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-32 w-32'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
            clipRule='evenodd'
          />
        </svg>
      ) : (
        <img src={artist.img} className='rounded-full h-32 w-32' />
      )}
      <div className='ml-3'>
        <div className='font-bold w-40  '>{artist.name}</div>
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

export default SelectedArtists;
