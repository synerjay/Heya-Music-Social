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
  genre: '',
};

const ProfileForm = ({
  profile: { profile, loading },
  auth: { user },
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
      return setFormData(profileData); // Return setFormData or else it will run in an inifinite loop
    }
  }, [loading, getCurrentProfile, profile]);

  const { bio, twitter, instagram, spotify, name, genre } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === 'avatar' ? e.target.files[0] : e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append('bio', formData.bio);
    uploadData.append('name', formData.name);
    uploadData.append('instagram', formData.instagram);
    uploadData.append('genre', formData.genre);
    uploadData.append('twitter', formData.twitter);
    uploadData.append('spotify', formData.spotify);
    if (typeof formData.avatar === 'string') {
      uploadData.append('avatar', ''); // the empty field tells Django backend to NOT change the avatar field in the DB
    } else {
      uploadData.append('avatar', formData.avatar, formData.avatar.name);
    }

    createProfile(uploadData, history, profile ? true : false);
  };

  return (
    <div className='max-w-2xl mx-auto w-full space-y-8 p-10 pt-10 bg-gray-800 rounded-xl shadow-lg z-10'>
      <div className='grid  gap-8 grid-cols-1'>
        <div className='flex flex-col '>
          <div className='flex flex-col sm:flex-row items-center'>
            {profile === null ? (
              <h2 className='font-semibold text-4xl mr-auto'>
                Create Your Profile
              </h2>
            ) : (
              <h2 className='font-semibold text-4xl mr-auto'>
                Edit Your Profile
              </h2>
            )}
            <div className='w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0'></div>
          </div>
          <div className='mt-5'>
            <form onSubmit={onSubmit}>
              <div className='md:flex flex-row items-center md:space-x-8 w-full text-xs'>
                <div className='md:space-y-0 mb-3'>
                  <label className='text-xs font-semibold px-1'>
                    Upload your own avatar
                    <abbr className='hidden' title='required'>
                      *
                    </abbr>
                  </label>
                  <div className='flex space-x-0 items-center py-6'>
                    <div className='w-24 h-24 mr-4 flex-none rounded-xl border overflow-hidden'>
                      {profile === null ? (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-24 w-24'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path
                            fillRule='evenodd'
                            d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                            clipRule='evenodd'
                          />
                        </svg>
                      ) : (
                        <img
                          className='w-24 h-24 mr-4 object-cover'
                          src={profile.avatar}
                          alt='Avatar Upload'
                        />
                      )}
                    </div>
                    <label className='cursor-pointer '>
                      <span className='focus:outline-none text-white text-sm py-4 px-4 rounded-full bg-green-600 hover:bg-green-500 hover:shadow-lg'>
                        Browse
                      </span>
                      <input
                        disabled={
                          user && user.username == 'guest' ? true : false
                        }
                        type='file'
                        name='avatar'
                        required={profile === null ? 'required' : null}
                        onChange={onChange}
                        className='hidden'
                      />
                    </label>
                  </div>
                </div>
                <div className='mb-3 space-y-2 w-full text-sm'>
                  <label className='text-xs font-semibold px-1'>
                    Name <abbr title='required'>*</abbr>
                  </label>
                  <input
                    className='w-full -ml-2 p-1 rounded-lg border-2 bg-gray-900 border-gray-200 outline-none focus:border-green-600'
                    required='required'
                    type='text'
                    placeholder='Name'
                    name='name'
                    value={name}
                    onChange={onChange}
                  />
                  <p className='text-red text-xs hidden'>
                    Please fill out this field.
                  </p>
                </div>
              </div>
              <div className='mb-3 space-y-2 w-full text-sm'>
                <label className='text-xs font-semibold px-1'>
                  Your favorite musical genre. <abbr title='required'>* </abbr>
                  Please separate each item by a comma and a space.
                </label>
                <div className='flex flex-wrap items-stretch w-full mb-4 relative'>
                  <input
                    type='text'
                    className='w-full p-1 rounded-lg border-2 bg-gray-900 border-gray-200 outline-none focus:border-green-600'
                    placeholder='Pop, hiphop, classical, etc.'
                    name='genre'
                    value={genre}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className='flex-auto w-full mb-1 text-sm space-y-2'>
                <label className='text-xs font-semibold px-1'>
                  Bio <abbr title='required'>*</abbr>
                </label>
                <textarea
                  required='required'
                  className='w-full p-1 mb-3 rounded-lg border-2 bg-gray-900 border-gray-200 outline-none focus:border-green-600'
                  placeholder='A short bio of yourself'
                  name='bio'
                  value={bio}
                  onChange={onChange}
                ></textarea>
              </div>
              <div className='mb-3 space-y-2 w-full text-xs'>
                <label className='text-xs font-semibold px-1'>
                  Instagram (Optional){' '}
                </label>
                <div className='flex flex-wrap items-stretch w-full mb-6 relative'>
                  <input
                    type='text'
                    className='w-full mb-3 p-1 rounded-lg border-2 bg-gray-900 border-gray-200 outline-none focus:border-green-600'
                    placeholder='https://'
                    name='instagram'
                    value={instagram}
                    onChange={onChange}
                  />
                </div>
                <label className='text-xs font-semibold px-1'>
                  Twitter (Optional){' '}
                </label>
                <div className='flex flex-wrap items-stretch w-full mb-4 relative'>
                  <input
                    type='text'
                    className='w-full p-1 mb-3 rounded-lg border-2 bg-gray-900 border-gray-200 outline-none focus:border-green-600'
                    placeholder='https://'
                    name='twitter'
                    value={twitter}
                    onChange={onChange}
                  />
                </div>
                <label className='text-xs font-semibold px-1'>
                  Facebook (Optional){' '}
                </label>
                <div className='flex flex-wrap items-stretch w-full mb-4 relative'>
                  <input
                    type='text'
                    className='w-full p-1 rounded-lg border-2 bg-gray-900 border-gray-200 outline-none focus:border-green-600'
                    placeholder='https://'
                    name='spotify'
                    value={spotify}
                    onChange={onChange}
                  />
                </div>
              </div>
              <p className='text-xs text-red-500 text-right my-0'>
                Required fields are marked with an asterisk{' '}
                <abbr title='Required field'>*</abbr>
              </p>
              <div className='mt-5 text-right md:space-x-3 md:block flex flex-col-reverse'>
                <button
                  disabled={user && user.username == 'guest' ? true : false}
                  type='submit'
                  className='mb-2 md:mb-0 bg-green-600 md:px-6 md:py-3 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500'
                >
                  {user && user.username == 'guest' ? (
                    <>Sorry, Guests cannot edit</>
                  ) : (
                    <>Save Changes</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);
