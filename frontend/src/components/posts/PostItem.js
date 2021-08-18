import React, { Fragment, useEffect, useState } from 'react';
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
  post,
  showActions,
  playingTrack,
  setBody,
  body,
}) => {
  const [liked, setLiked] = useState(false);

  const handleLike = (id) => {
    addLike(id);
    setLiked(!liked);
  };

  useEffect(() => {
    if (!post) return;
    if (post.likes.includes(auth.user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [post]);

  return (
    <Fragment>
      <div class='py-1 md:my-10 sm:max-w-xl sm:mx-auto'>
        <div class='bg-gray-800 shadow-lg h-56  border-black max-h-80	 border rounded-3xl p-1 flex space-x-0 md:space-x-8'>
          <div class='flex flex-col overflow-y-scroll mx-0 md:mx-2 w-10/12 md:w-1/2 space-y-3'>
            <div class='flex space-x-6 items-start'>
              {!post ? null : (
                <img class='rounded-xl h-16 w-16' src={post.avatar_url} />
              )}
              <div className='ml-2'>
                {/* Start of Target 1 */}
                {!post ? (
                  <>
                    <p className='text-sm md:text-lg'>
                      {' '}
                      You're currently listening to:
                    </p>
                    <p className='text-sm md:text-xl font-bold'>
                      {playingTrack.title} - {playingTrack.artist}
                    </p>{' '}
                  </>
                ) : (
                  <>
                    {' '}
                    <Link to={`/profile/${post.added_by}`}>
                      <h2 class='text-md font-bold'>{post.added_by}</h2>
                    </Link>
                    <p className='text-xs'> is currently listening to:</p>
                    <p className='text-sm font-bold'>
                      {post.track_title} - {post.track_artist}
                    </p>{' '}
                  </>
                )}
                {/* end of Target 1 */}
              </div>
            </div>
            {/* Start of Target 2*/}
            {!post ? (
              <>
                {' '}
                <textarea
                  class='bg-gray-900 w-full h-full rounded border border-black leading-normal resize-none py-0 px-2 font-medium placeholder-gray-300 focus:outline-none focus:bg-gray-900'
                  name='body'
                  cols='30'
                  rows='5'
                  placeholder='Say a little bit about this song (Optional)'
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </>
            ) : (
              <>
                {' '}
                <div class='flex flex-col h-16 '>
                  <p class=' text-gray-200 max-h-20 overflow-y-hidden text-xs'>
                    {post.body}
                  </p>
                </div>
                {showActions && (
                  <div class='flex items-center justify-between mx-1 mt-1 mb-1'>
                    <div class='flex gap-5'>
                      <svg
                        onClick={() => handleLike(post.id)}
                        className='cursor-pointer'
                        fill={liked ? '#ff0000' : '#ffffff'}
                        height='16'
                        viewBox='0 0 48 48'
                        width='16'
                      >
                        <path d='M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z'></path>
                      </svg>
                      <Link to={`/posts/${post.id}`}>
                        <svg
                          fill='#FFFFFF'
                          height='16'
                          viewBox='0 0 48 48'
                          width='16'
                        >
                          <path
                            clip-rule='evenodd'
                            d='M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z'
                            fill-rule='evenodd'
                          ></path>
                        </svg>
                      </Link>
                      <svg
                        fill='#FFFFFF'
                        height='16'
                        viewBox='0 0 48 48'
                        width='16'
                      >
                        <path d='M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z'></path>
                      </svg>
                    </div>
                    <div class='flex'>
                      {!auth.loading && post.added_by === auth.user.username && (
                        <svg
                          onClick={() => deletePost(post.id)}
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-5 w-5 text-red-600 cursor-pointer'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                )}
                <div class='text-xs mx-1 mt-2 mb-4'>
                  <p className='font-semibold'>
                    {post.likes.length}{' '}
                    {post.likes.length === 1 ? <>like</> : <>likes</>} ·{' '}
                    <Link to={`/posts/${post.id}`}>
                      {' '}
                      {post.messages.length}{' '}
                      {post.messages.length === 1 ? (
                        <>Comment</>
                      ) : (
                        <>Comments</>
                      )}{' '}
                    </Link>
                  </p>
                  <p className='text-gray-500'>
                    Posted{' '}
                    {formatDistanceToNow(
                      new Date(moment.utc(post.date_added).local().format()),
                      {
                        addSuffix: true,
                      }
                    )}
                  </p>
                </div>{' '}
              </>
            )}
            {/* end of target 2*/}
          </div>
          <div class='h-16 md:h-48 overflow-visible w-1/5  md:w-1/2 shadow-xl'>
            {!post ? (
              <img
                class='rounded-3xl shadow-lg'
                src={playingTrack.img}
                alt=''
              />
            ) : (
              <img
                class='rounded-full md:rounded-3xl shadow-lg'
                src={post.track_img}
                alt=''
              />
            )}
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
  /* <Fragment>
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
        <p class=' text-gray-200 max-h-20 overflow-y-hidden text-xs'>
          {body}
        </p>
      </div>
      {showActions && (
        <div class='flex items-center justify-between mx-1 mt-1 mb-1'>
          <div class='flex gap-5'>
            <svg
              onClick={() => handleLike(id)}
              className='cursor-pointer'
              fill={liked ? '#ff0000' : '#ffffff'}
              height='16'
              viewBox='0 0 48 48'
              width='16'
            >
              <path d='M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z'></path>
            </svg>
            <Link to={`/posts/${id}`}>
              <svg
                fill='#FFFFFF'
                height='16'
                viewBox='0 0 48 48'
                width='16'
              >
                <path
                  clip-rule='evenodd'
                  d='M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z'
                  fill-rule='evenodd'
                ></path>
              </svg>
            </Link>
            <svg
              fill='#FFFFFF'
              height='16'
              viewBox='0 0 48 48'
              width='16'
            >
              <path d='M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z'></path>
            </svg>
          </div>
          <div class='flex'>
            {!auth.loading && added_by === auth.user.username && (
              <svg
                onClick={() => deletePost(id)}
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 text-red-600 cursor-pointer'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                />
              </svg>
            )}
          </div>
        </div>
      )}
      <div class='text-xs mx-1 mt-2 mb-4'>
        <p className='font-semibold'>
          {likes.length} {likes.length === 1 ? <>like</> : <>likes</>} ·{' '}
          <Link to={`/posts/${id}`}>
            {' '}
            {messages.length}{' '}
            {messages.length === 1 ? <>Comment</> : <>Comments</>}{' '}
          </Link>
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
    <div class='h-48 overflow-visible w-1/2 shadow-xl'>
      <img class='rounded-3xl shadow-lg' src={track_img} alt='' />
    </div>
  </div>
</div>
</Fragment> */
}
