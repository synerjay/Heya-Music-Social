import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAlbum } from '../../actions/profile';
import SelectedAlbums from '../search/SelectedAlbums';

const AddAlbum = ({
  track,
  addAlbum,
  setSearchResults,
  setSearch,
  selectedAlbum,
  setSelectedAlbum,
}) => {
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
      img: track.img,
    });
  }, [track]);

  return (
    <button
      className='bg-gray-800 p-1 my-0.5 rounded-2xl w-96'
      onClick={(e) => {
        e.preventDefault();
        addAlbum(formData);
        setSelectedAlbum([...selectedAlbum, formData]);
        // setSearchResults([]);
        // setSearch('');
      }}
    >
      <SelectedAlbums track={track} />
    </button>
  );
};

AddAlbum.propTypes = {
  addAlbum: PropTypes.func.isRequired,
};

export default connect(null, { addAlbum })(AddAlbum);
