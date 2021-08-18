import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';
import PostForm from './PostForm';
import ReactLoading from 'react-loading';

const Posts = ({ post: { posts, loading }, getPosts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <div className='w-full h-screen flex justify-center sm:mt-32 md:mt-36 '>
      <ReactLoading type='bars' color='#fff' width={300} />
    </div>
  ) : (
    <Fragment>
      <h1 className='text-center text-4xl text-green-600'>Music Feed</h1>
      <p className='text-xl text-center'>See what others are listening to</p>

      <div>
        {posts
          .sort(function (a, b) {
            return new Date(b.date_added) - new Date(a.date_added); // sort post from recent to old
          })
          .map((post) => (
            <PostItem key={post.id} post={post} showActions={true} />
          ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
