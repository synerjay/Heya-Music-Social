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
    setArtists(
      profile['artists'].map((y) => y.spot_id).sort(() => 0.5 - Math.random())
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
  }, [artists, accessToken]);

  return (
    <div>
      <h2 className='text-center text-2xl my-5'>
        {' '}
        Recommendations by your favorite Artists{' '}
      </h2>
      {recommendations.length === 0 ? (
        <div className='text-center'> Try adding your favorite artist </div>
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
