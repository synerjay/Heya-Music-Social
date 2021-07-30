import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import RecommendItem from './RecommendItem';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const GenreRec = ({
  accessToken,
  profile: { profile },
  // getAccessToken,
  getCurrentProfile,
}) => {
  const [seedGenre, setSeedGenre] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  // Make new instance of Spotify API
  const spotifyApi = new SpotifyWebApi();

  useEffect(() => {
    setSeedGenre(profile['genre'].split(', ').sort(() => 0.5 - Math.random()));
  }, []);

  useEffect(() => {
    spotifyApi.setAccessToken(accessToken); // get token from redux state
    spotifyApi
      .getRecommendations({
        seed_genres:
          seedGenre > 5 ? [...seedGenre] : [...seedGenre.slice(0, 5)],
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
  }, [seedGenre, accessToken]);

  return (
    <div>
      <h2 className='text-center my-5'>
        {' '}
        Track Recommendation by the musical genre you like{' '}
      </h2>
      {/* <div className='overflow-scroll flex flex-row gap-x-2'> */}
      <Carousel
        autoPlay
        autoFocus={true}
        interval={2000}
        showIndicators={true}
        centerMode={true}
        showThumbs={false}
        showStatus={false}
        dynamicHeight={false}
        centerSlidePercentage={27}
        infiniteLoop={true}
      >
        {recommendations.map((track) => (
          <RecommendItem track={track} key={track.id} />
        ))}
      </Carousel>
      {/* </div> */}
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
})(GenreRec);
