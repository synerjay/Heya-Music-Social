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
              d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
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
