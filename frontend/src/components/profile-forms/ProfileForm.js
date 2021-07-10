import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const initialState = {
  bio: '',
  avatar: null,
  name: '',
  instagram: '',
  twitter: '',
  spotify: '',
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      return setFormData(profileData);
    }
  }, [profile]);

  const { avatar, bio, twitter, instagram, spotify, name } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === 'avatar' ? e.target.files[0] : e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const uploadData = new FormData();
    uploadData.append('bio', formData.bio);
    uploadData.append('avatar', formData.avatar, formData.avatar.name);
    uploadData.append('name', formData.name);
    uploadData.append('instagram', formData.instagram);
    uploadData.append('twitter', formData.twitter);
    uploadData.append('spotify', formData.spotify);

    createProfile(uploadData, history, profile ? true : false);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Add some changes to your profile
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={onChange}
          />
          <small className='form-text'>Your name</small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={onChange}
          />
          <small className='form-text'>Tell us a little about yourself</small>
        </div>
        {/* <div className='form-group'>
          <input
            type='text'
            placeholder='Bio'
            name='bio'
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <small className='form-text'>
            Tell us a little about yourself
          </small>
        </div> */}
        <div className='form-group'>
          <input
            type='file'
            placeholder='avatar'
            name='avatar'
            onChange={onChange}
          />
          <small className='form-text'>Upload an avatar of your choice</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Instagram Handle'
            name='instagram'
            value={instagram}
            onChange={onChange}
          />
          <small className='form-text'>Instagram Account</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Twitter Handle'
            name='twitter'
            value={twitter}
            onChange={onChange}
          />
          <small className='form-text'>Twitter Account</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Spotify Handle'
            name='spotify'
            value={spotify}
            onChange={onChange}
          />
          <small className='form-text'>Spotify Account</small>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);
