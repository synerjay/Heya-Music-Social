import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const initialState = {
  company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  githubusername: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: '',
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [spotify, setSpotify] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('bio', bio);
    formData.append('avatar', avatar, avatar.name);
    formData.append('name', name);
    formData.append('instagram', instagram);
    formData.append('twitter', twitter);
    formData.append('spotify', spotify);

    createProfile(formData, history, profile ? true : false);
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
            onChange={(e) => setName(e.target.value)}
          />
          <small className='form-text'>Your name</small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={(e) => setBio(e.target.value)}
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
            placeholder='Website'
            name='website'
            onChange={(e) => setAvatar(e.target.files[0])}
          />
          <small className='form-text'>Upload an avatar of your choice</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Instagram Handle'
            name='instagram'
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
          <small className='form-text'>Instagram Account</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Twitter Handle'
            name='twitter'
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
          <small className='form-text'>Twitter Account</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Spotify Handle'
            name='spotify'
            value={spotify}
            onChange={(e) => setSpotify(e.target.value)}
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
