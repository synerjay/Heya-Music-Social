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
          className='btn btn-danger'
        >
          {' '}
          Delete
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
