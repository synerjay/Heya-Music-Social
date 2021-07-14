import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-node';
import AddArtist from '../profile-forms/AddArtist';

const SearchArtists = () => {
  const [token, setToken] = useState('');
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // This compoennt is for testing the search Artists Tracks function
  const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;

  // Make new instance of Spotify API
  const spotifyApi = new SpotifyWebApi();

  useEffect(() => {
    console.log(search);
  }, [search]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    spotifyApi.setAccessToken(token); // just to make sure because sometimes searchTracks doesnt work
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
              uri: artist.uri,
              imageUrl: smallestImage === undefined ? null : smallestImage.url,
            };
          })
        );
      },
      function (err) {
        console.error(err);
      }
    );
  }, [search, token]);

  // useEffect for POST request to Spotify AUTH token, which expires every 3600
  // Needs to be in its reducer
  useEffect(() => {
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' + btoa(REACT_APP_CLIENT_ID + ':' + REACT_APP_CLIENT_SECRET),
      },
      data: 'grant_type=client_credentials',
      method: 'POST',
    }).then((tokenResponse) => {
      // Once we get a Spotify token we can get the Genres list using the token
      console.log('Successfully Recieve Spotify Token');
      console.log(tokenResponse.data);
      spotifyApi.setAccessToken(tokenResponse.data.access_token); // Getting accessToken to spotifyApi is very important!!!
      setToken(tokenResponse.data.access_token);
    });
  }, []);

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
              <AddArtist artist={artist} key={artist.uri} />
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchArtists;
