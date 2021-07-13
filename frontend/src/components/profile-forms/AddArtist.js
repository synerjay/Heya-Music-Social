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
