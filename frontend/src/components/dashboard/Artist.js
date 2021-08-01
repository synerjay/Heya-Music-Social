import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteArtist } from '../../actions/profile';

const Artist = ({ artists, deleteArtist }) => {
  const artistList = artists.map((art) => (
    <tr key={art.spot_id}>
      <td>
        {art.img === '' ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-16 w-16'
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
          <img className='h-16 w-16' src={art.img} />
        )}
      </td>
      <td>{art.name}</td>
      <td>
        <button
          onClick={() => deleteArtist(art.spot_id)}
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
        Your Favorite Artists
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 ml-2'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
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
        <tbody>{artistList}</tbody>
      </table>
    </div>
  );
};

Artist.propTypes = {
  deleteArtist: PropTypes.func.isRequired,
  artists: PropTypes.array.isRequired,
};

export default connect(null, { deleteArtist })(Artist);
