import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAlbum } from '../../actions/profile';

const AddAlbum = ({ track, addAlbum }) => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    img: '',
  });

  // const { title, artist, img } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    setFormData({
      title: track.album,
      artist: track.artist,
      img: track.albumUrl,
    });
  }, [track]);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        addAlbum(formData);
      }}
    >
      <div className='flex items-center'>
        <img src={track.albumUrl} className='h-16 w-16' />
        <div className='ml-3'>
          {/* <div>{track.title}</div> */}
          <div>{track.album}</div>
          <div className='font-bold'>{track.artist}</div>
        </div>
      </div>
    </button>
  );
};

AddAlbum.propTypes = {
  addAlbum: PropTypes.func.isRequired,
};

export default connect(null, { addAlbum })(AddAlbum);

{
  /* <Fragment> */
}
{
  /* <h1 className='large text-primary'>Whatis your favorite Album?</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> Tell the world your musical taste
      </p>
      <small>* = required field</small>
      <SearchAlbum />
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          addAlbum(formData, history);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='Title of Your Favorite Album'
            name='title'
            value={title}
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
