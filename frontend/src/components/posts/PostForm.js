import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import SearchTracks from '../search/SearchTracks';

const PostForm = ({ addPost }) => {
  // 1. Make a component state,
  const [body, setBody] = useState('');
  const [playingTrack, setPlayingTrack] = useState();

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
      <div className='post-form'>
        <div className='bg-primary p'>
          <h3>Tell the world what you're listening to...</h3>
        </div>
        <form
          className='form my-1'
          onSubmit={(e) => {
            e.preventDefault();
            addPost({ ...playingTrack, body });
            setBody('');
            setPlayingTrack();
          }}
        >
          <SearchTracks setPlayingTrack={setPlayingTrack} />
          <textarea
            name='body'
            cols='30'
            rows='5'
            placeholder='Create a post'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
          <input type='submit' className='btn btn-dark my-1' value='Submit' />
        </form>
      </div>
    </Fragment>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
