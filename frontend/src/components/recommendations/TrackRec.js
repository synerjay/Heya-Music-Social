import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import { connect } from 'react-redux';
import { getAccessToken, getCurrentProfile } from '../../actions/profile';
import RecommendItem from './RecommendItem';

const TrackRec = ({
  accessToken,
  profile: { profile },
  getAccessToken,
  getCurrentProfile,
}) => {
  const [tracks, setTracks] = useState([]);
  const [seedTracks, setSeedTracks] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const spotifyApi = new SpotifyWebApi();

  //Get Spotify Key at start up
  useEffect(() => {
    getAccessToken();
    if (!profile) getCurrentProfile();
    if (profile) {
      setTracks(profile['tracks']);
    }
  }, [profile]);

  useEffect(() => {
    console.log(tracks);
    setSeedTracks(tracks.map((y) => y.spot_id).sort(() => 0.5 - Math.random()));
  }, [tracks]);

  // Get another Spotify Key after every one hour expiration time
  useEffect(() => {
    const interval = setInterval(() => {
      getAccessToken();
    }, 1000 * 60 * 60); // one hour

    return () => clearInterval(interval); // unmount & cleanup
  }, [accessToken]);

  useEffect(() => {
    spotifyApi.setAccessToken(accessToken);
    console.log(seedTracks);
    spotifyApi
      .getRecommendations({
        seed_tracks:
          seedTracks.length < 5 ? [seedTracks] : [...seedTracks.slice(0, 5)], // limit to only 5 tracks
        min_popularity: 50,
      })
      .then(
        function (data) {
          let recommendations = data.body;
          setRecommendations(
            recommendations.tracks.slice(0, 6).map((track) => {
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
    <div>
      <h2> Track Recommendation by your favorite tracks</h2>
      <div className='overflow-scroll flex flex-row gap-x-2'>
        {recommendations.map((track) => (
          <RecommendItem track={track} key={track.id} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  accessToken: state.profile.accessToken, // make sure to put the PROPS in the name !!!!!!
  profile: state.profile,
});

export default connect(mapStateToProps, { getAccessToken, getCurrentProfile })(
  TrackRec
);
