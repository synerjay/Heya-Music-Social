import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addGenre } from '../../actions/profile';

const AddGenre = ({ addGenre, history }) => {
  const [formData, setFormData] = useState({
    genre: '',
    // image: '',
  });

  const { genre } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className='large text-primary'>What kind of music do you like?</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> Tell the world your musical taste
      </p>
      <small>* = required field</small>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          addGenre(formData, history);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='Your Favorite Genre'
            name='genre'
            value={genre}
            onChange={onChange}
            required
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddGenre.propTypes = {
  addGenre: PropTypes.func.isRequired,
};

export default connect(null, { addGenre })(AddGenre);
