import React from 'react';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='landing-inner mx-40'>
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
    </section>
  );
};

export default Landing;
