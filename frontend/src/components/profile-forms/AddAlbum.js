import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAlbum } from '../../actions/profile';

const AddAlbum = ({ track, addAlbum }) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    artist: '',
    img: '',
  });

  useEffect(() => {
    setFormData({
      id: track.albumId,
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
