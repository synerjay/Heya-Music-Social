import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAlbum } from '../../actions/profile';

const Album = ({ albums, deleteAlbum }) => {
  const albumList = albums.map((album) => (
    <tr key={album.id}>
      <td>
        <img src={album.img} />
      </td>
      <td>{album.title}</td>
      {/* <td className='hide-sm'>{edu.degree}</td>
      <td>
        {format(new Date(edu.from), 'yyyy/MM/dd')}-
        {edu.to ? format(new Date(edu.to), 'yyyy/MM/dd') : 'Current'}
      </td> */}
      <td>
        <button
          onClick={() => deleteAlbum(album.id)}
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
      <h2 className='my-2'>Your Favorite Album</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Album</th>
            {/* <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th> */}
            <th />
            <th />
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
