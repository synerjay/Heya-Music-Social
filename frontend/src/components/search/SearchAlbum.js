import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import AddAlbum from '../profile-forms/AddAlbum';
import { connect } from 'react-redux';
import { getAccessToken, getCurrentProfile } from '../../actions/profile';
import SelectedAlbums from './SelectedAlbums';

const SearchAlbum = ({
  accessToken,
  profile: { profile },
  getAccessToken,
  getCurrentProfile,
}) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState([]);

  // Make new instance of Spotify API
  const spotifyApi = new SpotifyWebApi();

  //Get Spotify Key at start up
  useEffect(() => {
    getAccessToken();
    if (!profile) getCurrentProfile();
    if (profile) {
      setAlbums(profile['albums']);
    }
    // use this for album seed for track recommendation web api
  }, [profile]);

  // Get another Spotify Key after every one hour expiration time
  useEffect(() => {
    const interval = setInterval(() => {
      getAccessToken();
    }, 1000 * 60 * 60);

    return () => clearInterval(interval); // unmount & cleanup
  }, [accessToken]);

  useEffect(() => {
    console.log(albums);
  }, [albums]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    spotifyApi.setAccessToken(accessToken); // get token from redux state
    spotifyApi.searchTracks(search, { limit: 5 }).then(
      function (data) {
        console.log(data.body.tracks.items);
        setSearchResults(
          data.body.tracks.items.map((track) => {
            const biggestAlbumImage = track.album.images.reduce(
              (biggest, image) => {
                if (image.height > biggest.height) return image;
                return biggest;
              },
              track.album.images[0]
            );

            return {
              artist: track.artists[0].name,
              id: track.album.id,
              img: biggestAlbumImage.url,
              title: track.album.name,
            };
          })
        );
      },
      function (err) {
        console.error(err);
      }
    );
  }, [search, accessToken]);

  return (
    <div className='flex justify-around'>
      <form value={search} onChange={(e) => setSearch(e.target.value)}>
        <div className='flex flex-col gap-y-2'>
          <input
            type='text'
            className='bg-white h-10 w-72 px-5 pr-10 rounded-full text-sm focus:outline-none'
            placeholder='Search any album'
          />
          <div className='overflow-scroll flex flex-col'>
            {searchResults
              .filter((x) => !albums.map((y) => y.spot_id).includes(x.id)) // filter out existing albums in the profile DB
              .map((track) => (
                <AddAlbum
                  track={track}
                  key={track.id}
                  setSearchResults={setSearchResults}
                  setSearch={setSearch}
                  selectedAlbum={selectedAlbum}
                  setSelectedAlbum={setSelectedAlbum}
                />
              ))}
          </div>
        </div>
      </form>
      {/* Selected album components put here */}
      <div className='flex w-full flex-col ml-7'>
        <p className='mb-5 text-center'>
          {' '}
          Click on the plus button to add to your list:{' '}
        </p>
        {selectedAlbum.map((track) => (
          <SelectedAlbums key={track.id} track={track} added={true} />
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
  SearchAlbum
);

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
