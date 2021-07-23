import React, { useState, useEffect } from 'react';

const TracksListening = ({ track, setPlayingTrack, setSearchResults }) => {
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
        setPlayingTrack(formData);
        setSearchResults([]);
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

export default TracksListening;
