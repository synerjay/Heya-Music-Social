import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import AddAlbum from '../profile-forms/AddAlbum';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Album from '../dashboard/Album';

const SearchAlbum = ({
  accessToken,
  profile: { profile },
  // getAccessToken,
  getCurrentProfile,
}) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState([]);
  const [regex, setRegex] = useState(null);

  // Make new instance of Spotify API
  const spotifyApi = new SpotifyWebApi();

  //Get Spotify Key at start up
  useEffect(() => {
    // getAccessToken();
    if (!profile) getCurrentProfile();
    if (profile) {
      setAlbums(profile['albums']);
      setRegex(new RegExp(profile.user));
    }
    // use this for album seed for track recommendation web api
  }, [profile]);

  useEffect(() => {
    console.log(regex);
  }, [regex]);

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
    <div className='flex flex-col md:flex-row justify-around'>
      <form
        className='w-full md:w-1/2'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      >
        <div className='flex items-center w-full flex-col gap-y-4'>
          <h2 className='text-3xl text-green-600 text-center font-bold'>
            {' '}
            Add your favorite albums:{' '}
          </h2>
          <p className='text-xs'>
            {' '}
            Search any album and click on the plus button to add{' '}
          </p>
          <input
            type='text'
            className='border-2 w-full bg-gray-900 border-gray-200 outline-none focus:border-green-600 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none'
            placeholder='Search any album'
          />
          <div className='overflow-scroll flex flex-col'>
            {searchResults
              .filter(
                (x) =>
                  !albums
                    .map((y) => y.spot_id.replace(regex, ''))
                    .includes(x.id)
              ) // filter out existing albums in the profile DB
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
      <div className='flex w-full md:w-4/6  flex-col ml-0 md:ml-7 text-center'>
        <Album albums={profile.albums} />
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
})(SearchAlbum);
