import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteArtist } from '../../actions/profile';

const Artist = ({ artists, deleteArtist }) => {
  // const artistList = artists.map((art) => (
  //   <tr key={art.spot_id}>
  //     <td>
  //       {art.img === '' ? (
  //         <svg
  //           xmlns='http://www.w3.org/2000/svg'
  //           className='h-7 w-7 md:h-16 md:w-16'
  //           viewBox='0 0 20 20'
  //           fill='currentColor'
  //         >
  //           <path
  //             fillRule='evenodd'
  //             d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
  //             clipRule='evenodd'
  //           />
  //         </svg>
  //       ) : (
  //         <img className='h-16 w-16' src={art.img} />
  //       )}
  //     </td>
  //     <td className='w-2 text-xs p-0'>{art.name}</td>
  //     <td>
  //       <button
  //         onClick={() => deleteArtist(art.spot_id)}
  //         // className='btn btn-danger'
  //       >
  //         <svg
  //           xmlns='http://www.w3.org/2000/svg'
  //           className='text-red-700 h-5 w-5'
  //           viewBox='0 0 20 20'
  //           fill='currentColor'
  //         >
  //           <path
  //             fillRule='evenodd'
  //             d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
  //             clipRule='evenodd'
  //           />
  //         </svg>
  //       </button>
  //     </td>
  //   </tr>
  // ));

  const artistList = artists.map((art) => (
    <tr key={art.spot_id} class='bg-gray-800'>
      <td class='p-1'>
        <div class='flex justify-center items-center'>
          {art.img === '' ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-7 w-7 md:h-16 md:w-16'
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
              class='rounded-full h-32 w-32  object-cover'
              src={art.img}
              alt='Artist image'
            />
          )}
          {/* <div class='ml-3'>
                    <div class=''>Appple</div>
                    <div class='text-gray-500'>mail@rgmail.com</div>
                  </div> */}
        </div>
      </td>
      <td class='text-center p-1 text-md md:text-2xl font-bold'>{art.name}</td>
      <td class='p-1 font-bold'></td>
      {/* <td class='p-1'>
        <span class='bg-green-400 text-gray-50 rounded-md px-2'>available</span>
      </td> */}
      <td class='p-1 '>
        <button
          onClick={() => deleteArtist(art.spot_id)}
          // className='btn btn-danger'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='text-red-700 h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </td>
    </tr>
  ));

  return (
    <div class='w-full col-span-12'>
      <div class='w-full overflow-auto lg:overflow-visible '>
        <table class='table w-full text-gray-400 border-separate space-y-6 text-sm'>
          <thead class='bg-gray-800 text-gray-500'>
            <tr>
              <th class='p-1 w-1/2'>Your Favorite Artists</th>
              <th class='p-1 text-center w-1/4'>Artist's Name</th>
              <th class='p-1 text-left w-0'></th>
              {/* <th class='p-1 text-left'>Status</th> */}
              <th class='p-1 text-left w-1/12 '>Action</th>
            </tr>
          </thead>
          <tbody>{artistList}</tbody>
        </table>
      </div>
    </div>
  );
};

Artist.propTypes = {
  deleteArtist: PropTypes.func.isRequired,
  artists: PropTypes.array.isRequired,
};

export default connect(null, { deleteArtist })(Artist);

{
  /* <div>
      <h2 className='bg-gray-600 text-xs p-1 md:p-5 text-center rounded-lg flex justify-center'>
        Your Favorite Artists
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 ml-2'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
          />
        </svg>
      </h2>
      <table className='table'>
        <thead>
          <tr>
            <th className='w-10 md:w-24 ' />
            <th className='w-2 md:w-32' />
            <th className='w-2  md:w-5' />
          </tr>
        </thead>
        <tbody>{artistList}</tbody>
      </table>
    </div> */
}
