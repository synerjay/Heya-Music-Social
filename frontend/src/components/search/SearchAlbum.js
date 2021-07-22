import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import AddAlbum from '../profile-forms/AddAlbum';
import { connect } from 'react-redux';
import { getAccessToken } from '../../actions/profile';

const SearchAlbum = ({ accessToken, getAccessToken }) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Make new instance of Spotify API
  const spotifyApi = new SpotifyWebApi();

  //Get Spotify Key at start up
  useEffect(() => {
    getAccessToken();
  }, []);

  // Get another Spotify Key after every one hour expiration time
  useEffect(() => {
    const interval = setInterval(() => {
      getAccessToken();
    }, 1000 * 60 * 60);

    return () => clearInterval(interval); // unmount & cleanup
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    spotifyApi.setAccessToken(accessToken); // get token from redux state
    spotifyApi.searchTracks(search, { limit: 5 }).then(
      function (data) {
        console.log(data.body.tracks.items);
        setSearchResults(
          data.body.tracks.items.map((track) => {
            const smallestAlbumImage = track.album.images.reduce(
              (smallest, image) => {
                if (image.height < smallest.height) return image;
                return smallest;
              },
              track.album.images[0]
            );

            return {
              artist: track.artists[0].name,
              // title: track.name,
              // uri: track.uri,
              albumId: track.album.id,
              albumUrl: smallestAlbumImage.url,
              album: track.album.name,
            };
          })
        );
      },
      function (err) {
        console.error(err);
      }
    );

    spotifyApi
      .getRecommendations({
        // min_energy: 0.4,
        seed_artists: ['3fMbdgg4jU18AjLCKBhRSm', '4kOfxxnW1ukZdsNbCKY9br'], // seeds mean spotify unique id
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
      <form value={search} onChange={(e) => setSearch(e.target.value)}>
        <div className='flex flex-col '>
          <input
            type='text'
            className='h-14 w-96 pl-10 pr-20 rounded-lg z-0 focus:shadow focus:outline-none'
            placeholder='Search any album'
          />
          <div className='overflow-scroll flex flex-col'>
            {searchResults.map((track) => (
              <AddAlbum track={track} key={track.albumId} />
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  accessToken: state.profile.accessToken, // make sure to put the PROPS in the name !!!!!!
});

export default connect(mapStateToProps, { getAccessToken })(SearchAlbum);

// Sample API response in an array

// album: {album_type: "ALBUM", artists: Array(1), available_markets: Array(178), external_urls: {…}, href: "https://api.spotify.com/v1/albums/31TRqoVBTQi0lzlPLtvINn", …}
// artists: [{…}]
// available_markets: (178) ["AD", "AE", "AG", "AL", "AM", "AO", "AR", "AT", "AU", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BN", "BO", "BR", "BS", "BT", "BW", "BY", "BZ", "CA", "CH", "CI", "CL", "CM", "CO", "CR", "CV", "CW", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "ES", "FI", "FJ", "FM", "FR", "GA", "GB", "GD", "GE", "GH", "GM", "GN", "GQ", "GR", "GT", "GW", "GY", "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IN", "IS", "IT", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KR", "KW", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "MA", "MC", "MD", …]
// disc_number: 1
// duration_ms: 227600
// explicit: false
// external_ids: {isrc: "USSM18600632"}
// external_urls: {spotify: "https://open.spotify.com/track/2A6yzRGMgSQCUapR2ptm6A"}
// href: "https://api.spotify.com/v1/tracks/2A6yzRGMgSQCUapR2ptm6A"
// id: "2A6yzRGMgSQCUapR2ptm6A"
// is_local: false
// name: "True Colors"
// popularity: 69
// preview_url: "https://p.scdn.co/mp3-preview/6e3190bfdf07d4c267b00aa512dacfd7d10345ca?cid=e159b7e3b96f40f1b63182f7023ed113"
// track_number: 4
// type: "track"
// uri: "spotify:track:2A6yzRGMgSQCUapR2ptm6A"
