import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAlbum } from '../../actions/profile';

const Album = ({ albums, deleteAlbum }) => {
  const albumList = albums.map((album) => (
    <tr key={album.spot_id}>
      <td>
        <img src={album.img} className='h-16 w-16' />
      </td>
      <td>
        {album.title} <p className='text-xs'> {album.artist} </p>
      </td>
      <td>
        <button
          onClick={() => deleteAlbum(album.spot_id)}
          // className='btn btn-danger'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='text-red-700 h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </td>
    </tr>
  ));

  return (
    <div>
      <h2 className='bg-gray-600 p-5 text-center rounded-lg flex justify-center'>
        Your Favorite Albums{' '}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6  w-6 ml-2'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
          />
        </svg>
      </h2>
      <table className='table'>
        <thead>
          <tr>
            <th className='w-24 ' />
            <th className='w-32' />
            <th className='w-5' />
          </tr>
        </thead>
        <tbody>{albumList}</tbody>
      </table>
    </div>
  );
};

Album.propTypes = {
  deleteAlbum: PropTypes.func.isRequired,
  album: PropTypes.array.isRequired,
};

export default connect(null, { deleteAlbum })(Album);
