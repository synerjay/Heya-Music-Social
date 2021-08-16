import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTrack } from '../../actions/profile';
import SelectedTracks from '../search/SelectedTracks';

const AddTrack = ({
  track,
  addTrack,
  setSearchResults,
  setSelectedTrack,
  selectedTrack,
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
        addTrack(formData);
        // setSearchResults([]);
        setSelectedTrack([...selectedTrack, formData]);
      }}
    >
      <SelectedTracks track={track} />
    </button>
  );
};

AddTrack.propTypes = {
  addTrack: PropTypes.func.isRequired,
};

export default connect(null, { addTrack })(AddTrack);
