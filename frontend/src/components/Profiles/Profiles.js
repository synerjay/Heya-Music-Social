import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({ getProfiles, profile: { profiles } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {profiles.length === 0 ? (
        <div className='w-full h-screen flex justify-center sm:mt-32 md:mt-36 '>
          <ReactLoading type='bars' color='#fff' width={300} />
        </div>
      ) : (
        <Fragment>
          <h1 className='text-center text-4xl text-green-600'>Members</h1>
          <p className='text-xl text-center'>
            Browse and connect with other music lovers
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile.id} profile={profile} />
              ))
            ) : (
              <h4> No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
