import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import { connect } from 'react-redux';
import { getAccessToken, getCurrentProfile } from '../../actions/profile';

const ArtistRec = ({
  accessToken,
  profile: { profile },
  getAccessToken,
  getCurrentProfile,
}) => {
  const [artists, setArtists] = useState([]);
  const [seedArtists, setSeedArtists] = useState([]);

  // Make new instance of Spotify API
  const spotifyApi = new SpotifyWebApi();

  //Get Spotify Key at start up
  useEffect(() => {
    getAccessToken();
    if (!profile) getCurrentProfile();
    if (profile) {
      setArtists(profile['artists']);
    }
  }, [profile]);

  useEffect(() => {
    console.log(artists);
    setSeedArtists(
      artists.map((y) => y.spot_id).sort(() => 0.5 - Math.random())
    );
  }, [artists]);

  useEffect(() => {
    const interval = setInterval(() => {
      getAccessToken();
    }, 1000 * 60 * 60);

    return () => clearInterval(interval); // unmount & cleanup
  }, [accessToken]);

  useEffect(() => {
    spotifyApi.setAccessToken(accessToken);
    console.log(seedArtists);
    spotifyApi
      .getRecommendations({
        // min_energy: 0.4,
        seed_artists:
          seedArtists.length < 5
            ? [...seedArtists]
            : [...seedArtists.slice(0, 5)],
        min_popularity: 50,
      })
      .then(
        function (data) {
          let recommendations = data.body;
          console.log(recommendations.tracks);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
  }, [accessToken]);

  return (
    <div>
      <h2> This is the future page of Track Recommendation by Artists</h2>
    </div>
  );
};

const mapStateToProps = (state) => ({
  accessToken: state.profile.accessToken, // make sure to put the PROPS in the name !!!!!!
  profile: state.profile,
});

export default connect(mapStateToProps, { getAccessToken, getCurrentProfile })(
  ArtistRec
);
