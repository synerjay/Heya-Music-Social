import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

const Dashboard = ({ auth: { user } }) => {
  return (
    <Fragment>
      <h1 className='text-red-500 text-2xl'> Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome{' '}
        {user && user.username.charAt(0).toUpperCase() + user.username.slice(1)}
      </p>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
