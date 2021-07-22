import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTrack } from '../../actions/profile';

const AddTrack = ({ track, addTrack }) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    artist: '',
    img: '',
  });

  useEffect(() => {
    setFormData({
      id: track.id,
      title: track.title,
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
