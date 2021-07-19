import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post';
import { formatDistanceToNow } from 'date-fns';
import moment from 'moment';

const CommentItem = ({
  postId,
  message: { id, body, added_by, avatar_url, date_added },
  auth,
  deleteComment,
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
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
    </div>
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
