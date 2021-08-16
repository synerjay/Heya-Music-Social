import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import RecommendItem from './RecommendItem';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const ArtistRec = ({
  accessToken,
  profile: { profile },
  // getAccessToken,
  getCurrentProfile,
}) => {
  const [artists, setArtists] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  // Make new instance of Spotify API
  const spotifyApi = new SpotifyWebApi();

  //Get Spotify Key at start up
  useEffect(() => {
    const regex = new RegExp(profile.user);

    setArtists(
      profile['artists']
        .map((y) => y.spot_id.replace(regex, ''))
        .sort(() => 0.5 - Math.random())
    );
  }, []);

  useEffect(() => {
    spotifyApi.setAccessToken(accessToken);
    console.log(artists);
    spotifyApi
      .getRecommendations({
        // min_energy: 0.4,
        seed_artists:
          artists.length < 5 ? [...artists] : [...artists.slice(0, 5)],
        min_popularity: 50,
      })
      .then(
        function (data) {
          let recommendations = data.body;
          console.log(recommendations.tracks);
          setRecommendations(
            recommendations.tracks.slice(0, 20).map((track) => {
              const smallestAlbumImage = track.album.images.reduce(
                (smallest, image) => {
                  if (image.height > smallest.height) return image;
                  return smallest;
                },
                track.album.images[0]
              );

              return {
                artist: track.artists[0].name,
                title: track.name,
                spot_id: track.id,
                img: smallestAlbumImage.url,
                album: track.album.name,
              };
            })
          );
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
  }, [accessToken]);

  return (
    <div className='mt-5 flex flex-col space-y-4'>
      <div className='flex w-full justify-center items-center'>
        <h2 className='bg-gray-800 text-sm md:text-lg text-gray-400 font-semibold p-1 w-10/12   text-center rounded-lg'>
          {' '}
          Recommendations by your favorite artists{' '}
        </h2>
      </div>
      {recommendations.length === 0 ? (
        <div className='flex justify-center items-center text-center text-sm md:text-lg my-7'>
          {' '}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-3 w-3 md:h-6 md:w-6 mr-2 '
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          No recommendations found. Try adding your favorite artists first.{' '}
        </div>
      ) : (
        <Carousel
          autoPlay={false}
          stopOnHover={true}
          autoFocus={true}
          interval={2000}
          showIndicators={true}
          centerMode={true}
          showThumbs={false}
          showStatus={false}
          dynamicHeight={false}
          centerSlidePercentage={27}
          infiniteLoop={true}
          width='100%'
        >
          {recommendations.map((track) => (
            <RecommendItem track={track} key={track.id} />
          ))}
        </Carousel>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  accessToken: state.profile.accessToken, // make sure to put the PROPS in the name !!!!!!
  profile: state.profile,
});

export default connect(mapStateToProps, {
  // getAccessToken,
  getCurrentProfile,
})(ArtistRec);
