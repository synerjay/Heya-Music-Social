import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import SearchTracks from '../search/SearchTracks';
import PostItem from './PostItem';

const PostForm = ({ addPost, setShowModal, history }) => {
  // 1. Make a component state,
  const [body, setBody] = useState('');
  const [playingTrack, setPlayingTrack] = useState(null);

  //2. Make input field response to state change - HTML tags need to be changed with value={NameOfField} and onChange={onChange}
  //const onChange = (e) => setText({ ...text, [e.target.name]: e.target.value });

  // 3. make data passed to the reduce
  // const onSubmit = (e) => {
  //   e.preventDefault(); //prevents refresh of the page once submitted
  //   addPost({ body }); // action to the reducer with text data deconstructed
  //   setBody(''); // <-- set the text state back to initial state once submitted for the next text input
  // };

  useEffect(() => {
    console.log({ ...playingTrack, body });
  }, [playingTrack]);

  return (
    <Fragment>
      <div className='flex flex-col items-center text-center p-4 w-full'>
        <h3 className='text-2xl mb-2'>
          What are you currently listening to ?{' '}
        </h3>
        <p className='mb-2 '>Search any track below </p>
        <form
          className='flex flex-col items-center w-full'
          onSubmit={(e) => {
            e.preventDefault();
            addPost({ ...playingTrack, body }, history);
            setBody('');
            setPlayingTrack(null);
            setShowModal(false);
          }}
        >
          <SearchTracks setPlayingTrack={setPlayingTrack} />
          {playingTrack && (
            <>
              <PostItem
                playingTrack={playingTrack}
                setBody={setBody}
                body={body}
              />
              <input
                type='submit'
                className='mb-2 mt-8 md:mb-0 bg-green-600 md:px-6 md:py-3 px-10 py-0 h-12 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500'
                value='Update Status'
              />
            </>
          )}
          {/* <>
              <div className='flex flex-col gap-y-5 mb-5 items-center w-full mx-0 bg-gray-900 rounded-lg px-1 py-4 border-black border sm:rounded-3xl'>
                <p className='text-lg'>You're currently listening to</p>
                <div className='flex gap-x-5 justify-center items-center'>
                  <img src={playingTrack.img} className='h-32 w-32' />
                  <div className='ml-3'>
                    <p className='font-bold text-xl'>{playingTrack.title}</p>
                    <p className='text-lg'>{playingTrack.artist}</p>
                  </div>
                </div>
                <textarea
                  class='bg-gray-800 w-3/4  rounded border border-black leading-normal resize-none h-20 py-0 px-2 font-medium placeholder-gray-600 focus:outline-none focus:bg-gray-800'
                  name='body'
                  cols='30'
                  rows='5'
                  placeholder='Say something about this song'
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                />
              </div>
              <input
                type='submit'
                className='mb-2 md:mb-0 bg-green-600 md:px-6 md:py-3 px-10 py-0 h-12 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500'
                value='Submit'
              />
            </> */}
        </form>
      </div>
    </Fragment>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);

// {playingTrack && (
//   <>
//     <div className='flex flex-col gap-y-5 mb-5 items-center w-full mx-0 bg-gray-900 rounded-lg px-1 py-4 border-black border sm:rounded-3xl'>
//       <p className='text-lg'>You're currently listening to</p>
//       <div className='flex gap-x-5 justify-center items-center'>
//         <img src={playingTrack.img} className='h-32 w-32' />
//         <div className='ml-3'>
//           <p className='font-bold text-xl'>{playingTrack.title}</p>
//           <p className='text-lg'>{playingTrack.artist}</p>
//         </div>
//       </div>
//       <textarea
//         class='bg-gray-800 w-3/4  rounded border border-black leading-normal resize-none h-20 py-0 px-2 font-medium placeholder-gray-600 focus:outline-none focus:bg-gray-800'
//         name='body'
//         cols='30'
//         rows='5'
//         placeholder='Say something about this song'
//         value={body}
//         onChange={(e) => setBody(e.target.value)}
//         required
//       />
//     </div>
//     <input
//       type='submit'
//       className='mb-2 md:mb-0 bg-green-600 md:px-6 md:py-3 px-10 py-0 h-12 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500'
//       value='Submit'
//     />
//   </>
// )}
