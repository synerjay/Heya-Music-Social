import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import { format } from 'date-fns';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { id, body, added_by, avatar_url, likes, messages, date_added },
  showActions,
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${added_by}`}>
          <img className='round-img' src={avatar_url} alt='User avatar' />
          <h4>{added_by}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{body}</p>
        <p className='post-date'>
          Posted on {format(new Date(date_added), 'MMMM do Y')}
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
              Discussion{' '}
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
    </div>
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
