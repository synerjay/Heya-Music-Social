import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addArtist } from '../../actions/profile';
import SelectedArtists from '../search/SelectedArtists';

const AddArtist = ({
  artist,
  addArtist,
  setSearchResults,
  setSelectedArtist,
  selectedArtist,
}) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    img: '',
  });

  useEffect(() => {
    setFormData({
      id: artist.id,
      name: artist.name,
      img: artist.img,
    });
  }, [artist]);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        addArtist(formData);
        setSelectedArtist([...selectedArtist, formData]);
        setSearchResults([]);
      }}
    >
      <SelectedArtists artist={artist} />
    </button>
  );
};

AddArtist.propTypes = {
  addArtist: PropTypes.func.isRequired,
};

export default connect(null, { addArtist })(AddArtist);
