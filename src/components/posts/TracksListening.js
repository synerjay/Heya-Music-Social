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
      img: track.img,
    });
  }, [track]);

  return (
    <button
      className='bg-gray-800 p-1 my-0.5 rounded-2xl w-96'
      onClick={(e) => {
        e.preventDefault();
        setPlayingTrack(formData);
        setSearchResults([]);
      }}
    >
      <div className='flex justify-around items-center w-full '>
        <img src={track.img} className='h-32 w-32 rounded-xl' />
        <div className='ml-3'>
          <div>{track.title}</div>
          <div className='font-bold'>{track.artist}</div>
        </div>
      </div>
    </button>
  );
};

export default TracksListening;
