import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteGenre } from '../../actions/profile';

const Genre = ({ genre, deleteGenre }) => {
  const genreList = genre.map((gen) => (
    <tr key={gen.id}>
      <td>{gen.genre}</td>
      {/* <td className='hide-sm'>{edu.degree}</td>
      <td>
        {format(new Date(edu.from), 'yyyy/MM/dd')}-
        {edu.to ? format(new Date(edu.to), 'yyyy/MM/dd') : 'Current'}
      </td> */}
      <td>
        <button onClick={() => deleteGenre(gen.id)} className='btn btn-danger'>
          {' '}
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Your Favorite Genre</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Genre</th>
            {/* <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th> */}
            <th />
          </tr>
        </thead>
        <tbody>{genreList}</tbody>
      </table>
    </Fragment>
  );
};

Genre.propTypes = {
  deleteGenre: PropTypes.func.isRequired,
  genre: PropTypes.array.isRequired,
};

export default connect(null, { deleteGenre })(Genre);
