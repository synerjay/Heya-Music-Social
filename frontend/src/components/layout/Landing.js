import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getPosts } from '../../actions/post';
import PostItem from '../posts/PostItem';
import ReactLoading from 'react-loading';

const Landing = ({ isAuthenticated, post: { posts }, getPosts }) => {
  useEffect(() => {
    getPosts();
  }, []);

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return posts.length === 0 ? (
    <div className='w-full h-screen flex justify-center sm:mt-32 md:mt-36 '>
      <ReactLoading type='bars' color='#fff' width={300} />
    </div>
  ) : (
    <section className='flex justify-center items-center md:justify-start md:items-start md:mt-0 w-full h-screen overflow-hidden'>
      <div class='md:flex space-x-10 md:mr-0 mr-10'>
        <div class='-mt-0 md:-mt-36  md:flex items-center pl-5 md:pl-16 '>
          <div class=''>
            <div className='flex items-center font-bold w-full gap-x-3 text-3xl md:text-4xl mb-10'>
              {' '}
              <svg
                version='1.1'
                id='Capa_1'
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
                x='0px'
                y='0px'
                width='55px'
                height='55px'
                fill='#10B981'
                viewBox='0 0 429.157 429.157'
                // style={'enable-background:new 0 0 429.157 429.157;'}
                xmlSpace='preserve'
              >
                <g>
                  <g>
                    <path
                      d='M47.102,247.94v-94.204c0-13.006-10.542-23.552-23.552-23.552C10.542,130.185,0,140.73,0,153.736v94.204
			c0,13.009,10.542,23.552,23.55,23.552C36.56,271.492,47.102,260.949,47.102,247.94z'
                    />
                    <path
                      d='M122.99,346.078V71.308c0-13.006-10.54-23.552-23.55-23.552S75.889,58.301,75.889,71.308v274.771
			c0,13.009,10.542,23.552,23.552,23.552S122.99,359.087,122.99,346.078z'
                    />
                    <path
                      d='M198.881,305.516V153.736c0-13.006-10.542-23.552-23.552-23.552s-23.55,10.545-23.55,23.552v151.779
			c0,13.008,10.54,23.552,23.55,23.552S198.881,318.523,198.881,305.516z'
                    />
                    <path
                      d='M405.605,177.294c-13.012,0-23.551,10.545-23.551,23.552v130.851c0,13.008,10.539,23.552,23.551,23.552
			c13.009,0,23.552-10.544,23.552-23.552V200.846C429.157,187.839,418.614,177.294,405.605,177.294z'
                    />
                    <path
                      d='M329.721,12.428c-13.008,0-23.547,10.545-23.547,23.552v357.198c0,13.012,10.539,23.552,23.547,23.552
			c13.013,0,23.552-10.54,23.552-23.552V35.98C353.272,22.974,342.726,12.428,329.721,12.428z'
                    />
                    <path
                      d='M253.832,355.248c13.013,0,23.553-10.544,23.553-23.552V104.679c0-13.006-10.54-23.552-23.553-23.552
			c-13.008,0-23.551,10.545-23.551,23.552v227.017C230.281,344.704,240.824,355.248,253.832,355.248z'
                    />
                  </g>
                </g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
              </svg>
              heya music social
            </div>
            <h1 class='lg:text-5xl text-green-500 font-bold leading-tight text-4xl'>
              The Meeting Place for Music Lovers
            </h1>
            <p class='mt-4 text-md md:text-lg font-normal '>
              See what music your friends are currently listening to. <br />{' '}
              Recommend your new favorite songs to friends.
            </p>
            <Link
              to='/register'
              class='flex mt-10 w-52  items-center space-x-3 p-1 bg-green-600 text-white rounded-lg  transition-all duration-400 transform hover:scale-105 cursor-pointer hover:shadow-lg'
            >
              <button class='text-lg text-md font-semibold '>
                Sign up for free
              </button>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  class='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M11 19l-7-7 7-7m8 14l-7-7 7-7'
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        <div class='w-11/12 mt-20 overflow-y-hidden pr-16 md:flex md:flex-col gap-y-10 hidden'>
          <h1 className='text-center text-xl -mb-10 font-bold text-green-500'>
            Latest Feed
          </h1>
          {posts
            .sort(function (a, b) {
              return new Date(b.date_added) - new Date(a.date_added); // sort post from recent to old
            })
            .slice(0, 3)
            .map((post) => (
              <PostItem key={post.id} post={post} showActions={false} />
            ))}
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
  post: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Landing);

{
  /* <section className='landing'>
<div className='landing-inner mx-0'>
  <h1 className='mb-1 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-black to-blue-500'>
    The Meeting Place for Music Lovers
  </h1>
  <p className='lead my-1'>
    See what music your friends are currently listening to. Recommend your
    new favorite songs to friends.
  </p>
  <div className='buttons my-1'>
    <Link
      to='/register'
      className='btn btn-primary hover:bg-green-300 hover:-translate-y-0.5 focus:outline-none focus:ring transform transition'
    >
      Let's Get Started
    </Link>
  </div>
  <div className='iphone bg-gray-500 w-1/2 rounded-3xl border-gray-900 border-4'></div>
</div>
</section> */
}
