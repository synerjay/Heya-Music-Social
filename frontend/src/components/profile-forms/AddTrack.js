import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTrack } from '../../actions/profile';
import SearchTracks from '../search/SearchTracks';

const AddTrack = ({ track, addTrack }) => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    img: '',
  });

  // const { track } = formData;

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
        addTrack(formData);
      }}
    >
      <div className='flex items-center'>
        <img src={track.albumUrl} className='h-16 w-16' />
        <div className='ml-3'>
          <div>{track.title}</div>
          <div className='font-bold'>{track.artist}</div>
        </div>
      </div>
    </button>
  );
};

AddTrack.propTypes = {
  addTrack: PropTypes.func.isRequired,
};

export default connect(null, { addTrack })(AddTrack);

{
  /* <Fragment>
      <h1 className='large text-primary'>What tracks do you like?</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> Tell the world your musical taste
      </p>
      <small>* = required field</small>
      <SearchTracks />
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          addTrack(formData, history);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='Your Favorite Track'
            name='track'
            value={track}
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
