import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPost } from '../../actions/post';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import ReactLoading from 'react-loading';

const Post = ({ post: { post, loading }, getPost, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return (
    <Fragment>
      {' '}
      {post === null || loading ? (
        <div className='w-full h-screen flex justify-center sm:mt-32 md:mt-36 '>
          <ReactLoading type='bars' color='#fff' width={300} />
        </div>
      ) : (
        <Fragment>
          <Link
            to='/posts'
            className='flex items-center w-40 justify-center mb-2 md:mb-0 bg-green-600 md:px-6 md:py-3 px-10 py-0 h-12 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500'
          >
            {' '}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-3 w-3 text-white mr-1'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z'
                clipRule='evenodd'
              />
            </svg>
            Back to Feed
          </Link>
          <PostItem post={post} showActions={false} />
          <div className='flex flex-col mt-24 justify-center items-center gap-y-3 w-full'>
            <h2 className='text-lg text-center font-bold'>Comments</h2>
            {post.messages.length === 0 ? (
              <p className='text-gray-500'>
                {' '}
                No Comments Yet. Why not add some!
              </p>
            ) : (
              post.messages.map((message) => (
                <CommentItem
                  key={message.id}
                  message={message}
                  postId={post.id}
                />
              ))
            )}
            <CommentForm postId={post.id} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
