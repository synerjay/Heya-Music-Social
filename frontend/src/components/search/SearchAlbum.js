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
  }, [search, accessToken]);

  // useEffect for POST request to Spotify AUTH token, which expires every 3600
  // Needs to be in its reducer

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  useEffect(() => {
    console.log(accessToken);
  }, [accessToken]);

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
              <AddAlbum track={track} key={track.uri} />
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
