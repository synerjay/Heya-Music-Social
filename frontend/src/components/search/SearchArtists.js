import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import AddArtist from '../profile-forms/AddArtist';
import { connect } from 'react-redux';
import { getAccessToken, getCurrentProfile } from '../../actions/profile';
import SelectedArtists from './SelectedArtists';
import Artist from '../dashboard/Artist';

const SearchArtists = ({
  accessToken,
  profile: { profile },
  getCurrentProfile,
}) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState([]);
  const [regex, setRegex] = useState(null);

  // Make new instance of Spotify API
  const spotifyApi = new SpotifyWebApi();

  //Get Spotify Key at start up
  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (profile) {
      setArtists(profile['artists']);
      setRegex(new RegExp(profile.user));
    }
  }, [profile]);

  useEffect(() => {
    console.log(search);
  }, [search]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.searchArtists(search, { limit: 5 }).then(
      function (data) {
        setSearchResults(
          data.body.artists.items.map((artist) => {
            const biggestImage = artist.images.reduce((biggest, image) => {
              if (image.height > biggest.height) return image;
              return biggest;
            }, artist.images[0]);

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
    <div className='flex flex-col md:flex-row justify-around'>
      <form
        className='w-full md:w-1/2'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      >
        <div className='flex items-center w-full flex-col gap-y-4'>
          <h2 className='text-3xl text-green-600 text-center font-bold'>
            {' '}
            Add your favorite artists:{' '}
          </h2>
          <p className='text-xs'>
            {' '}
            Search any artist and click on the plus button to add{' '}
          </p>
          <input
            type='text'
            className='border-2 w-full bg-gray-900 border-gray-200 outline-none focus:border-green-600 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none'
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
      <div className='flex w-full md:w-4/6  flex-col ml-0 md:ml-7 text-center'>
        <Artist artists={profile.artists} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  accessToken: state.profile.accessToken, // make sure to put the PROPS in the name !!!!!!
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
})(SearchArtists);
