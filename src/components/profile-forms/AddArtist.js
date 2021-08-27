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
  const [added, setAdded] = useState(false);
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
      className='bg-gray-800 p-1 my-0.5 rounded-2xl w-96'
      disabled={added ? true : false}
      onClick={(e) => {
        e.preventDefault();
        addArtist(formData);
        setSelectedArtist([...selectedArtist, formData]);
        setAdded(true);
        // setSearchResults([]);
      }}
    >
      <SelectedArtists artist={artist} added={added} />
    </button>
  );
};

AddArtist.propTypes = {
  addArtist: PropTypes.func.isRequired,
};

export default connect(null, { addArtist })(AddArtist);
