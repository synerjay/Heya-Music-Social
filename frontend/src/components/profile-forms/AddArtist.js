import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addArtist } from '../../actions/profile';
import SearchArtists from '../search/SearchArtists';

const AddArtist = ({ artist, addArtist }) => {
  const [formData, setFormData] = useState({
    name: '',
    img: '',
  });

  // const { artist } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    setFormData({
      name: artist.name,
      img: artist.imageUrl,
    });
  }, [artist]);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        addArtist(formData);
      }}
    >
      <div className='flex items-center'>
        <img src={artist.imageUrl} className='h-16 w-16' />
        <div className='ml-3'>
          {/* <div>{track.title}</div> */}
          {/* <div>{track.album}</div> */}
          <div className='font-bold'>{artist.name}</div>
        </div>
      </div>
    </button>
  );
};

AddArtist.propTypes = {
  addArtist: PropTypes.func.isRequired,
};

export default connect(null, { addArtist })(AddArtist);

{
  /* <Fragment>
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
          addArtist(formData);
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
    </Fragment> */
}
