import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import RecommendItem from './RecommendItem';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const TrackRec = ({ accessToken, profile: { profile } }) => {
  const [tracks, setTracks] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const spotifyApi = new SpotifyWebApi();

  //Get Spotify Key at start up
  useEffect(() => {
    setTracks(
      profile['tracks'].map((y) => y.spot_id).sort(() => 0.5 - Math.random())
    );
  }, []);

  useEffect(() => {
    spotifyApi.setAccessToken(accessToken);
    console.log(tracks);
    spotifyApi
      .getRecommendations({
        seed_tracks: tracks.length < 5 ? [tracks] : [...tracks.slice(0, 5)], // limit to only 5 tracks
        min_popularity: 50,
      })
      .then(
        function (data) {
          let recommendations = data.body;
          setRecommendations(
            recommendations.tracks.map((track) => {
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
  }, [tracks, accessToken]);

  return (
    <div>
      <h2 className='text-center text-2xl my-5'>
        {' '}
        Recommendations by your favorite tracks
      </h2>
      {recommendations.length === 0 ? (
        <div className='text-center'> Try adding your favorite tracks </div>
      ) : (
        <Carousel
          autoPlay={false}
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
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  accessToken: state.profile.accessToken, // make sure to put the PROPS in the name !!!!!!
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(TrackRec);
