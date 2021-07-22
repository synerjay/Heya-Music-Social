import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addArtist } from '../../actions/profile';

const AddArtist = ({ artist, addArtist }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    img: '',
  });

  useEffect(() => {
    setFormData({
      id: artist.id,
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
