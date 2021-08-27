import React from 'react';
import PropTypes from 'prop-types';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const ProfileArtist = ({ artists, name }) => {
  return (
    <div className='my-7'>
      <h2 className='text-xl font-semibold mb-2 text-center'>
        {name}'s Favorite Artists
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
        {artists.map((artist) => (
          <div className='flex flex-col h-36 w-28  md:h-44   md:w-36 items-center '>
            <img src={artist.img} className='h-28 md:h-36  w-48 rounded-full' />
            <div className='items-center'>
              <p className='text-xs md:text-sm font-bold'>{artist.name}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

ProfileArtist.propTypes = {
  artist: PropTypes.object.isRequired,
};

export default ProfileArtist;
