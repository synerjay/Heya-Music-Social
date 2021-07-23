import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import AddArtist from '../profile-forms/AddArtist';
import { connect } from 'react-redux';
import { getAccessToken } from '../../actions/profile';

const SearchArtists = ({ accessToken, getAccessToken }) => {
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
    console.log(search);
  }, [search]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.searchArtists(search, { limit: 5 }).then(
      function (data) {
        console.log(data.body.artists.items);
        setSearchResults(
          data.body.artists.items.map((artist) => {
            const smallestImage = artist.images.reduce((smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            }, artist.images[0]);
            console.log(smallestImage);
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
            {searchResults.map((artist) => (
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
});

export default connect(mapStateToProps, { getAccessToken })(SearchArtists);
