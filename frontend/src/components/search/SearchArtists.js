import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import AddArtist from '../profile-forms/AddArtist';
import { connect } from 'react-redux';
import { getAccessToken, getCurrentProfile } from '../../actions/profile';

const SearchArtists = ({
  accessToken,
  profile: { profile },
  getAccessToken,
  getCurrentProfile,
}) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
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

  // Get another Spotify Key after every one hour expiration time
  useEffect(() => {
    const interval = setInterval(() => {
      getAccessToken();
    }, 1000 * 60 * 60);

    return () => clearInterval(interval); // unmount & cleanup
  }, [accessToken]);

  useEffect(() => {
    console.log(search);
  }, [search]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.searchArtists(search, { limit: 5 }).then(
      function (data) {
        // console.log(data.body.artists.items);
        setSearchResults(
          data.body.artists.items.map((artist) => {
            const smallestImage = artist.images.reduce((smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            }, artist.images[0]);
            // console.log(smallestImage);
            return {
              name: artist.name,
              // title: artist.name,
              id: artist.id,
              imageUrl: smallestImage === undefined ? null : smallestImage.url,
            };
          })
        );
      },
      function (err) {
        console.error(err);
      }
    );

    console.log(seedArtists);
    spotifyApi
      .getRecommendations({
        // min_energy: 0.4,
        seed_artists: [...seedArtists.slice(0, 5)],
        // [
        //   '3TVXtAsR1Inumwj472S9r4',
        //   '7tYKF4w9nC0nq9CsPZTHyP',
        //   '3fMbdgg4jU18AjLCKBhRSm',
        //   '5gcr3GdxkY87uv0K66hjn2',
        //   '7hJcb9fa4alzcOq3EaNPoG',
        //   // '7hJcb9fa4alzcOq3EaNPoG', It seems like this API endpoint only works when there are only 5 seeds or less
        // ], // seeds mean spotify unique id
        // seed_genres: ['rock and roll', 'rock', 'metal', 'rap'],
        // seed_tracks: ["46eu3SBuFCXWsPT39Yg3tJ",]
        min_popularity: 50,
      })
      .then(
        function (data) {
          let recommendations = data.body;
          console.log(recommendations);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
  }, [search, accessToken]);

  return (
    <div className='flex justify-center items-center'>
      <form
        className='form'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      >
        <div className='flex flex-col '>
          <div className='form-group'>
            <input
              type='text'
              className='w-full focus:shadow focus:outline-none'
              placeholder='Add your favorite artist'
            />
          </div>
          <div className='overflow-scroll flex flex-col'>
            {searchResults
              .filter((x) => !artists.map((y) => y.spot_id).includes(x.id))
              .map((artist) => (
                <AddArtist
                  setSearchResults={setSearchResults}
                  artist={artist}
                  key={artist.id}
                />
              ))}
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  accessToken: state.profile.accessToken, // make sure to put the PROPS in the name !!!!!!
  profile: state.profile,
});

export default connect(mapStateToProps, { getAccessToken, getCurrentProfile })(
  SearchArtists
);
