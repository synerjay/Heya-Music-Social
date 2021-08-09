import React, { Fragment, useState } from 'react';
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
  const [liked, setLiked] = useState(false);

  const handleLike = (id) => {
    addLike(id);
    setLiked(!liked);
  };

  return (
    <Fragment>
      <div class='py-1 md:my-7 sm:max-w-xl sm:mx-auto'>
        <div class='bg-gray-800 shadow-lg h-56  border-black max-h-80	 border sm:rounded-3xl p-1 flex space-x-8'>
          <div class='flex flex-col mx-2 w-1/2 space-y-3'>
            <div class='flex space-x-6 items-start'>
              <img class='rounded-xl h-16 w-16' src={avatar_url} />
              <div className='ml-2'>
                <h2 class='text-md font-bold'>{added_by}</h2>
                <p className='text-xs'> is currently listening to:</p>
                <p className='text-sm font-bold'>
                  {track_title} - {track_artist}
                </p>
              </div>
            </div>
            <div class='flex flex-col h-16 '>
              <p class=' text-gray-200 max-h-20 overflow-y-hidden text-md'>
                {body}
              </p>
            </div>
            <div class='flex items-center justify-between mx-1 mt-1 mb-1'>
              <div class='flex gap-5'>
                <svg
                  onClick={() => handleLike(id)}
                  fill={liked ? '#ff0000' : '#ffffff'}
                  height='16'
                  viewBox='0 0 48 48'
                  width='16'
                >
                  <path d='M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z'></path>
                </svg>
                <svg fill='#FFFFFF' height='16' viewBox='0 0 48 48' width='16'>
                  <path
                    clip-rule='evenodd'
                    d='M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z'
                    fill-rule='evenodd'
                  ></path>
                </svg>
                <svg fill='#FFFFFF' height='16' viewBox='0 0 48 48' width='16'>
                  <path d='M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z'></path>
                </svg>
              </div>
              <div class='flex'>
                <svg fill='#FFFFFF' height='16' viewBox='0 0 48 48' width='16'>
                  <path d='M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z'></path>
                </svg>
              </div>
            </div>
            <div class='text-xs mx-1 mt-2 mb-4'>
              <p className='font-semibold'>
                {likes.length} {likes.length === 1 ? <>like</> : <>likes</>} ·{' '}
                {messages.length}{' '}
                {messages.length === 1 ? <>Comment</> : <>Comments</>}
              </p>
              <p className='text-gray-500'>
                Posted{' '}
                {formatDistanceToNow(
                  new Date(moment.utc(date_added).local().format()),
                  {
                    addSuffix: true,
                  }
                )}
              </p>
            </div>
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
