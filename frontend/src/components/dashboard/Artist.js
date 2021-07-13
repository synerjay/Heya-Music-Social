import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteArtist } from '../../actions/profile';

const Artist = ({ artists, deleteArtist }) => {
  const artistList = artists.map((art) => (
    <tr key={art.id}>
      <td>
        <img className='h-16  w-16 ' src={art.img} />
      </td>
      <td>{art.name}</td>
      {/* <td className='hide-sm'>{edu.degree}</td>
      <td>
        {format(new Date(edu.from), 'yyyy/MM/dd')}-
        {edu.to ? format(new Date(edu.to), 'yyyy/MM/dd') : 'Current'}
      </td> */}
      <td>
        <button onClick={() => deleteArtist(art.id)} className='btn btn-danger'>
          {' '}
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div>
      <h2 className='my-2'>Your Favorite Artists</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Artist</th>
            {/* <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th> */}
            <th />
            <th />
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
