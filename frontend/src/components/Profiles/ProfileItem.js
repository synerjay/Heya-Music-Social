import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = ({
  profile: { id, user, name, avatar_url, bio, tracks },
}) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar_url} alt='' className='round-img' />
      <div>
        <h2>{user}</h2>
        <p>{bio}</p>
        <p className='my-1'>{name && <span>{name}</span>}</p>
        <Link to={`/profile/${user}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      <ul>
        {/* {tracks &&
          tracks.slice(0, 4).map((track, index) => (
            <li key={index} className='text-primary'>
              <i className='fas fa-check' /> {track}
            </li>
          ))} */}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
