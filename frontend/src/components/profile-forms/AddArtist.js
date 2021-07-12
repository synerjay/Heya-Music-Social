import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addArtist } from '../../actions/profile';
import SearchArtists from '../search/SearchArtists';

const AddArtist = ({ addArtist, history }) => {
  const [formData, setFormData] = useState({
    artist: '',
    // image: '',
  });

  const { artist } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className='large text-primary'>Who are your favorite artists?</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> Tell the world your musical taste
      </p>
      <small>* = required field</small>
      <SearchArtists />
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          addArtist(formData, history);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='Your Favorite Artist'
            name='artist'
            value={artist}
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

AddArtist.propTypes = {
  addArtist: PropTypes.func.isRequired,
};

export default connect(null, { addArtist })(AddArtist);
