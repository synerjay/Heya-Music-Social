import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post';
import { formatDistanceToNow } from 'date-fns';
import moment from 'moment';
import { Fragment } from 'react';

const CommentItem = ({
  postId,
  message: { id, body, added_by, avatar_url, date_added },
  auth,
  deleteComment,
}) => {
  return (
    <Fragment>
      <div class='flex flex-row overflow-hidden bg-gray-800 shadow-lg h-auto w-96 max-w-2xl  border-black border sm:rounded-3xl p-1'>
        <div className='flex w-24 flex-col content-between justify-between items-center'>
          <img class='rounded-xl h-16 w-16' src={avatar_url} />
          {!auth.loading && added_by === auth.user.username && (
            <svg
              onClick={() => deleteComment(postId, id)}
              xmlns='http://www.w3.org/2000/svg'
              className='h-7 w-7 text-red-600 cursor-pointer pt-3'
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
        <div className='flex h-auto flex-col ml-2 w-full overflow-y-scroll'>
          <h2 class='text-md font-bold'>{added_by}</h2>
          <p class=' text-gray-200 text-sm mb-4'>{body}</p>
          <p className='text-gray-500 text-xs'>
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
    </Fragment>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);

{
  /* <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${added_by}`}>
          <img className='round-img' src={avatar_url} alt='Avatar' />
          <h4>{added_by}</h4>
        </Link>
      </div>
      <div>
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

        {!auth.loading && added_by === auth.user.username && (
          <button
            onClick={() => deleteComment(postId, id)}
            type='button'
            className='btn btn-danger'
          >
            DELETE
          </button>
        )}
      </div>
    </div> */
}
