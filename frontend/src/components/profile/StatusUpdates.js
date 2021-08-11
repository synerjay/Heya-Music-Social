import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import moment from 'moment';
import { Fragment } from 'react';
import PropTypes from 'prop-types';

const StatusUpdates = ({ post }) => {
  console.log(post);
  return (
    <div>
      <Link
        to={`/posts/${post.id}`}
        class='w-full border-t-2 border-gray-100 font-medium text-gray-200 py-4 px-4 block hover:bg-gray-900 transition duration-150'
      >
        <img
          src={post.track_img}
          alt=''
          class='rounded-full h-7 w-7 shadow-md inline-block mr-2'
        />
        Listened to {post.track_title} by {post.track_artist} saying: "
        {post.body}"
        <span class='text-gray-400 text-sm ml-2'>
          {formatDistanceToNow(
            new Date(moment.utc(post.date_added).local().format()),
            {
              addSuffix: true,
            }
          )}
        </span>
      </Link>
    </div>
  );
};

StatusUpdates.propTypes = {
  post: PropTypes.object.isRequired,
};

export default StatusUpdates;
