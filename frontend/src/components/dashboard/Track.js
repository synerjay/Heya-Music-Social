import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteTrack } from '../../actions/profile';

const Track = ({ tracks, deleteTrack }) => {
  const trackList = tracks.map((track) => (
    <tr key={track.spot_id}>
      <td>
        <img className='h-16 w-16' src={track.img} />
      </td>
      <td>
        {track.title} <p className='text-xs'> {track.artist} </p>
      </td>
      <td>
        <button
          onClick={() => deleteTrack(track.spot_id)}
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
      <h2 className='bg-gray-600 p-5 text-center rounded-lg flex justify-center '>
        Your Favorite Tracks
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
            d='M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3'
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
        <tbody>{trackList}</tbody>
      </table>
    </div>
  );
};

Track.propTypes = {
  deleteTrack: PropTypes.func.isRequired,
  tracks: PropTypes.array.isRequired,
};

export default connect(null, { deleteTrack })(Track);
