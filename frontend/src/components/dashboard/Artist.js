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
