import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteTrack } from '../../actions/profile';

const Track = ({ tracks, deleteTrack }) => {
  const trackList = tracks.map((track) => (
    <tr key={track.id}>
      <td>{track.track}</td>
      {/* <td className='hide-sm'>{edu.degree}</td>
      <td>
        {format(new Date(edu.from), 'yyyy/MM/dd')}-
        {edu.to ? format(new Date(edu.to), 'yyyy/MM/dd') : 'Current'}
      </td> */}
      <td>
        <button
          onClick={() => deleteTrack(track.id)}
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
            {/* <th className='hide-sm'>Degree</th>
          <th className='hide-sm'>Years</th> */}
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
