import React from 'react';

const TestingForm = () => {
  return (
    <div className='max-w-xl w-full space-y-8 p-10 bg-gray-800 rounded-xl shadow-lg z-10'>
      <div className='grid  gap-8 grid-cols-1'>
        <div className='flex flex-col '>
          <div className='flex flex-col sm:flex-row items-center'>
            <h2 className='font-semibold text-lg mr-auto'>
              Create Your Profile
            </h2>
            <div className='w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0'></div>
          </div>
          <div className='mt-5'>
            <div>
              <div className='md:space-y-2 mb-3'>
                <label className='text-xs font-semibold text-gray-600 py-2'>
                  Upload your own avatar
                  <abbr className='hidden' title='required'>
                    *
                  </abbr>
                </label>
                <div className='flex space-x-2 items-center py-6'>
                  <div className='w-16 h-16 mr-4 flex-none rounded-xl border overflow-hidden'>
                    <img
                      className='w-16 h-16 mr-4 object-cover'
                      src='https://images.unsplash.com/photo-1611867967135-0faab97d1530?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1352&amp;q=80'
                      alt='Avatar Upload'
                    />
                  </div>
                  <label className='cursor-pointer '>
                    <span className='focus:outline-none text-white text-sm py-4 px-4 rounded-full bg-green-500 hover:bg-green-500 hover:shadow-lg'>
                      Browse
                    </span>
                    <input type='file' className='hidden' />
                  </label>
                </div>
              </div>
              <div className='md:flex flex-row md:space-x-4 w-full text-xs'>
                <div className='mb-3 space-y-2 w-full text-sm'>
                  <label className='font-semibold text-gray-400 py-2'>
                    Name <abbr title='required'>*</abbr>
                  </label>
                  <input
                    placeholder='Name'
                    className='appearance-none block w-full bg-white text-grey-darker border border-grey-lighter rounded-lg h-10 px-4'
                    required='required'
                    type='text'
                    name='integration[shop_name]'
                    id='integration_shop_name'
                  />
                  <p className='text-red text-xs hidden'>
                    Please fill out this field.
                  </p>
                </div>
                {/* <div className='mb-3 space-y-2 w-full text-xs'>
                  <label className='font-semibold text-gray-600 py-2'>
                    Your favorite Musical Genre <abbr title='required'>*</abbr>
                  </label>
                  <input
                    placeholder='Pop music, hip hop, etc.'
                    className='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4'
                    required='required'
                    type='text'
                    name='integration[shop_name]'
                    id='integration_shop_name'
                  />
                  <p className='text-red text-xs hidden'>
                    Please fill out this field.
                  </p>
                </div> */}
              </div>
              <div className='mb-3 space-y-2 w-full text-sm'>
                <label className=' font-semibold text-gray-400 py-2'>
                  Your favorite musical genre. <abbr title='required'>*</abbr>
                  <p className='text-xs'>
                    {' '}
                    Please separate each item by a comma and a space.{' '}
                  </p>
                </label>
                <div className='flex flex-wrap items-stretch w-full mb-4 relative'>
                  <div className='flex'>
                    <span className='flex items-center leading-normal bg-grey-lighter border-1 rounded-r-none border border-r-0 border-blue-300 px-3 whitespace-no-wrap text-grey-dark w-12 h-10 bg-blue-300 justify-center  text-xl rounded-lg text-white'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6 text-gray-700'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3'
                        />
                      </svg>
                    </span>
                  </div>
                  <input
                    type='text'
                    className='bg-white flex-shrink flex-grow flex-auto leading-normal w-px border border-l-0 h-10 border-grey-light rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow'
                    placeholder='Pop, hiphop, classical, etc.'
                  />
                </div>
              </div>
              {/* <div className='md:flex md:flex-row md:space-x-4 w-full text-xs'>
                <div className='w-full flex flex-col mb-3'>
                  <label className='font-semibold text-gray-600 py-2'>
                    Company Address
                  </label>
                  <input
                    placeholder='Address'
                    className='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4'
                    type='text'
                    name='integration[street_address]'
                    id='integration_street_address'
                  />
                </div>
                <div className='w-full flex flex-col mb-3'>
                  <label className='font-semibold text-gray-600 py-2'>
                    Location<abbr title='required'>*</abbr>
                  </label>
                  <select
                    className='block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full '
                    required='required'
                    name='integration[city_id]'
                    id='integration_city_id'
                  >
                    <option value=''>Seleted location</option>
                    <option value=''>Cochin,KL</option>
                    <option value=''>Mumbai,MH</option>
                    <option value=''>Bangalore,KA</option>
                  </select>
                  <p className='text-sm text-red-500 hidden mt-3' id='error'>
                    Please fill out this field.
                  </p>
                </div>
              </div> */}
              <div className='flex-auto w-full mb-1 text-sm space-y-2'>
                <label className='font-semibold text-gray-400 py-2'>
                  Bio <abbr title='required'>*</abbr>
                </label>
                <textarea
                  required=''
                  name='bio'
                  id=''
                  className='w-full min-h-[100px] max-h-[300px] h-28 appearance-none block bg-white text-grey-darker border border-grey-lighter rounded-lg  py-4 px-4'
                  placeholder='A short bio of yourself'
                  spellcheck='false'
                ></textarea>
              </div>
              <div className='mb-3 space-y-2 w-full text-xs'>
                <label className=' font-semibold text-gray-400 my-5'>
                  Instagram
                </label>
                <div className='flex flex-wrap items-stretch w-full mb-6 relative'>
                  <div className='flex'>
                    <span className='flex items-center leading-normal bg-grey-lighter border-1 rounded-r-none border border-r-0 border-blue-300 px-3 whitespace-no-wrap text-grey-dark w-12 h-10 bg-blue-300 justify-center  text-xl rounded-lg text-white'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6 text-gray-700'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
                        />
                      </svg>
                    </span>
                  </div>
                  <input
                    type='text'
                    className='bg-white flex-shrink flex-grow flex-auto leading-normal w-px border border-l-0 h-10 border-grey-light rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow'
                    placeholder='https://'
                  />
                </div>
                <label className=' font-semibold text-gray-400 py-2'>
                  Twitter
                </label>
                <div className='flex flex-wrap items-stretch w-full mb-4 relative'>
                  <div className='flex'>
                    <span className='flex items-center leading-normal bg-grey-lighter border-1 rounded-r-none border border-r-0 border-blue-300 px-3 whitespace-no-wrap text-grey-dark w-12 h-10 bg-blue-300 justify-center  text-xl rounded-lg text-white'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6 text-gray-700'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
                        />
                      </svg>
                    </span>
                  </div>
                  <input
                    type='text'
                    className='bg-white flex-shrink flex-grow flex-auto leading-normal w-px border border-l-0 h-10 border-grey-light rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow'
                    placeholder='https://'
                  />
                </div>
                <label className=' font-semibold text-gray-400 py-2'>
                  Facebook
                </label>
                <div className='flex flex-wrap items-stretch w-full mb-4 relative'>
                  <div className='flex'>
                    <span className='flex items-center leading-normal bg-grey-lighter border-1 rounded-r-none border border-r-0 border-blue-300 px-3 whitespace-no-wrap text-grey-dark w-12 h-10 bg-blue-300 justify-center  text-xl rounded-lg text-white'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6 text-gray-700'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
                        />
                      </svg>
                    </span>
                  </div>
                  <input
                    type='text'
                    className='bg-white flex-shrink flex-grow flex-auto leading-normal w-px border border-l-0 h-10 border-grey-light rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow'
                    placeholder='https://'
                  />
                </div>
              </div>
              <p className='text-xs text-red-500 text-right my-3'>
                Required fields are marked with an asterisk{' '}
                <abbr title='Required field'>*</abbr>
              </p>
              <div className='mt-5 text-right md:space-x-3 md:block flex flex-col-reverse'>
                <button className='mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100'>
                  {' '}
                  Cancel{' '}
                </button>
                <button className='mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500'>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestingForm;
