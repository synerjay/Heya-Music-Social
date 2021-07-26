import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteTrack } from '../../actions/profile';

const Track = ({ tracks, deleteTrack }) => {
  const trackList = tracks.map((track) => (
    <tr key={track.spot_id}>
      <td>
        <img src={track.img} />
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
      <h2 className='my-2'>Your Favorite Tracks</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Track</th>
            <th />
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
