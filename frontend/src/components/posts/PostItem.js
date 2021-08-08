import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import { formatDistanceToNow } from 'date-fns';
import moment from 'moment';
import Track from '../dashboard/Track';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: {
    id,
    body,
    track_title,
    track_artist,
    track_img,
    added_by,
    avatar_url,
    likes,
    messages,
    date_added,
  },
  showActions,
}) => {
  return (
    <Fragment>
      <div class='py-1 md:my-16 sm:max-w-xl sm:mx-auto'>
        <div class='bg-gray-800 shadow-lg h-56  border-black max-h-80	 border sm:rounded-3xl p-8 flex space-x-8'>
          <div class='flex flex-col w-1/2 space-y-4'>
            <div class='flex justify-around items-start'>
              <img class='rounded-xl h-16 w-16' src={avatar_url} />
              <div className='ml-4'>
                <h2 class='text-xl font-bold'>{added_by}</h2>
                <p className='text-xs'> is currently listening to: </p>
              </div>
            </div>
            <div class='flex flex-col text-a'>
              <h2 className='text-xl font-bold '>{track_title}</h2>
              <p>{track_artist}</p>
            </div>
            <p class=' text-gray-400 max-h-40 overflow-y-hidden'>{body}</p>
          </div>
          <div class='h-48 overflow-visible w-1/2'>
            <img class='rounded-3xl shadow-lg' src={track_img} alt='' />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);

{
  /* <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${added_by}`}>
          <img className='round-img' src={avatar_url} alt='User avatar' />
          <h4>{added_by}</h4>
        </Link>
      </div>
      <div>
        <h4>{added_by} is currently listening to</h4>
        <div className='flex flex-col items-center'>
          <img src={track_img} className='h-44 w-56' />
          <div className='ml-3'>
            <div>{track_title}</div>
            <div className='font-bold'>{track_artist}</div>
          </div>
        </div>
        <p className='my-1'>{body}</p>
        <p className='post-date'>
          Posted{' '}
          {formatDistanceToNow(
            new Date(moment.utc(date_added).local().format()),
            {
              addSuffix: true,
            }
          )}
        </p>

        {showActions && (
          <Fragment>
            {' '}
            <button
              onClick={() => addLike(id)}
              type='button'
              className='btn btn-light'
            >
              LIKE{' '}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <Link to={`/posts/${id}`} className='btn btn-primary'>
              Comments{' '}
              {messages.length > 0 && (
                <span className='comment-count'>
                  {messages.length} Comments
                </span>
              )}
            </Link>
            {!auth.loading && added_by === auth.user.username && (
              <button
                onClick={() => deletePost(id)}
                type='button'
                className='btn btn-danger'
              >
                DELETE
              </button>
            )}{' '}
          </Fragment>
        )}
      </div>
    </div> */
}
