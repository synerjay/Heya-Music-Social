import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import AddArtist from '../profile-forms/AddArtist';
import { connect } from 'react-redux';
import { getAccessToken, getCurrentProfile } from '../../actions/profile';
import SelectedArtists from './SelectedArtists';

const SearchArtists = ({
  accessToken,
  profile: { profile },
  // getAccessToken,
  getCurrentProfile,
}) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState([]);

  const regex = new RegExp(profile.user);

  // Make new instance of Spotify API
  const spotifyApi = new SpotifyWebApi();

  //Get Spotify Key at start up
  useEffect(() => {
    // getAccessToken();
    if (!profile) getCurrentProfile();
    if (profile) {
      setArtists(profile['artists']);
    }
  }, [profile]);

  // Get another Spotify Key after every one hour expiration time
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // getAccessToken();
  //   }, 1000 * 60 * 60);

  //   return () => clearInterval(interval); // unmount & cleanup
  // }, [accessToken]);

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
            const biggestImage = artist.images.reduce((biggest, image) => {
              if (image.height > biggest.height) return image;
              return biggest;
            }, artist.images[0]);
            // console.log(biggestImage);
            return {
              name: artist.name,
              id: artist.id,
              img: biggestImage === undefined ? '' : biggestImage.url,
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
            className='border-2 bg-gray-900 border-gray-200 outline-none focus:border-green-600 h-10 w-72 px-5 pr-10 rounded-full text-sm focus:outline-none'
            placeholder='Search any artist'
          />
          <div className='overflow-scroll flex flex-col'>
            {searchResults
              .filter(
                (x) =>
                  !artists
                    .map((y) => y.spot_id.replace(regex, ''))
                    .includes(x.id)
              )
              .map((artist) => (
                <AddArtist
                  setSearchResults={setSearchResults}
                  setSelectedArtist={setSelectedArtist}
                  selectedArtist={selectedArtist}
                  artist={artist}
                  key={artist.id}
                />
              ))}
          </div>
        </div>
      </form>
      <div className='flex w-full flex-col ml-7 text-center'>
        <h2 className='text-2xl text-center font-bold'>
          {' '}
          Add your favorite artists:{' '}
        </h2>
        <p className='text-sm'>
          {' '}
          Search any artist and click on the plus button to add{' '}
        </p>
        {selectedArtist.map((artist) => (
          <SelectedArtists key={artist.id} artist={artist} added={true} />
        ))}
      </div>
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
})(SearchArtists);
