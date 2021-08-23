import React from 'react';
import PropTypes from 'prop-types';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const ProfileTrack = ({ name, tracks }) => {
  return (
    <div className='my-7'>
      <h2 className='text-xl font-semibold mb-2 text-center'>
        {name}'s Favorite Tracks
      </h2>
      <Carousel
        autoPlay={false}
        autoFocus={true}
        interval={2000}
        showIndicators={false}
        centerMode={true}
        showThumbs={false}
        showStatus={false}
        dynamicHeight={false}
        centerSlidePercentage={27}
        infiniteLoop={true}
      >
        {tracks.map((track) => (
          <div className='flex flex-col h-36 w-28    md:h-48  md:w-36  items-center '>
            <img src={track.img} className='h-48 w-48' />
            <div className='items-center'>
              <p className='text-xs md:text-sm'>{track.title}</p>
              <p className='text-xs md:text-sm font-bold'>{track.artist}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

ProfileTrack.propTypes = {
  track: PropTypes.object.isRequired,
};

export default ProfileTrack;
