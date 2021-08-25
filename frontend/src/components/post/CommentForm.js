import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment }) => {
  const [body, setBody] = useState('');

  return (
    <form
      class='w-full max-w-xl bg-gray-800 rounded-lg px-4 pt-1 border-black border sm:rounded-3xl'
      onSubmit={(e) => {
        e.preventDefault();
        addComment(postId, { body });
        setBody('');
      }}
    >
      <div class='flex flex-wrap -mx-3 mb-6'>
        <h2 class='px-4 pt-3 pb-2 text-white text-lg'>Add a new comment</h2>
        <div class='w-full md:w-full px-3 mb-2 mt-2'>
          <textarea
            class='bg-gray-900 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-0 px-2 font-medium placeholder-gray-600 focus:outline-none focus:bg-gray-900'
            name='body'
            placeholder='Type Your Comment'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </div>
        <div class='w-full md:w-full flex items-start px-3'>
          <div class='flex items-start w-1/2 text-gray-300 px-2 mr-auto'>
            <svg
              fill='none'
              class='w-5 h-5 text-gray-300 mr-1'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <p class='text-xs md:text-sm pt-px'>
              Leave a kind comment to this post.
            </p>
          </div>
          <div class='-mr-1'>
            <input
              type='submit'
              class='mb-2 md:mb-0 bg-green-600 md:px-6 md:py-3 px-10 py-0 h-12 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500'
              value='Post Comment'
            />
          </div>
        </div>
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
