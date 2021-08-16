import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import AddTrack from '../profile-forms/AddTrack';
import { connect } from 'react-redux';
import { getAccessToken, getCurrentProfile } from '../../actions/profile';
import TracksListening from '../posts/TracksListening';
import SelectedTracks from './SelectedTracks';
import Track from '../dashboard/Track';

const SearchTracks = ({
  accessToken,
  profile: { profile },
  // getAccessToken,
  getCurrentProfile,
  setPlayingTrack,
}) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState([]);
  const regex = new RegExp(profile.user);

  // Make new instance of Spotify API
  const spotifyApi = new SpotifyWebApi();

  //Get Spotify Key at start up
  useEffect(() => {
    // getAccessToken();
    if (!profile) getCurrentProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      setTracks(profile['tracks']);
    }
  }, [profile]);

  // Get another Spotify Key after every one hour expiration time
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     getAccessToken();
  //   }, 1000 * 60 * 60); // one hour

  //   return () => clearInterval(interval); // unmount & cleanup
  // }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.searchTracks(search, { limit: 5 }).then(
      function (data) {
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
              title: track.name,
              id: track.id,
              img: biggestAlbumImage.url,
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

  return (
    <div className='flex flex-col w-full md:flex-row justify-around'>
      <form
        className={setPlayingTrack ? 'w-full' : 'w-full md:w-1/2'}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      >
        <div className='flex items-center w-full flex-col gap-y-4'>
          {setPlayingTrack ? null : (
            <>
              <h2 className='text-3xl text-green-600 text-center font-bold'>
                {' '}
                Add your favorite tracks:{' '}
              </h2>
              <p className='text-xs'>
                {' '}
                Search any track and click on the plus button to add{' '}
              </p>{' '}
            </>
          )}
          <input
            type='text'
            className={
              'border-2 bg-gray-900 border-gray-200 outline-none focus:border-green-600 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none ' +
              (setPlayingTrack ? 'w-full md:w-1/2' : 'w-full')
            }
            placeholder='Search Any Tracks'
          />
          <div className='overflow-scroll flex flex-col'>
            {setPlayingTrack
              ? searchResults.map((track) => (
                  <TracksListening
                    track={track}
                    key={track.id}
                    setPlayingTrack={setPlayingTrack}
                    setSearchResults={setSearchResults}
                  />
                ))
              : searchResults
                  .filter(
                    (x) =>
                      !tracks
                        .map((y) => y.spot_id.replace(regex, ''))
                        .includes(x.id)
                  )
                  .map((track) => (
                    <AddTrack
                      track={track}
                      key={track.id}
                      setSearchResults={setSearchResults}
                      setSelectedTrack={setSelectedTrack}
                      selectedTrack={selectedTrack}
                    />
                  ))}
          </div>
        </div>
      </form>
      {setPlayingTrack ? null : (
        <div className='flex w-full md:w-4/6  flex-col ml-0 md:ml-7 text-center'>
          <Track tracks={profile.tracks} />
          {/* <h2 className='text-2xl text-center font-bold'>
            {' '}
            Add your favorite tracks:{' '}
          </h2>
          <p className='text-sm'>
            {' '}
            Search any track and click on the plus button to add{' '}
          </p>
          {selectedTrack.map((track) => (
            <SelectedTracks key={track.id} track={track} added={true} />
          ))} */}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  accessToken: state.profile.accessToken,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  // getAccessToken,
  getCurrentProfile,
})(SearchTracks);
