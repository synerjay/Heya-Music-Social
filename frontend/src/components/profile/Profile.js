import React from 'react';

const Profile = ({ match }) => {
  return (
    <div>
      <h2>Profile page for: {match.params.id}</h2>
    </div>
  );
};

export default Profile;
