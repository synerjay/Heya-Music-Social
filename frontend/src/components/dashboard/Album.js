import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAlbum } from '../../actions/profile';

const Album = ({ albums, deleteAlbum }) => {
  // const albumList = albums.map((album) => (
  //   <tr key={album.spot_id}>
  //     <td>
  //       <img src={album.img} className='h-16 w-16' />
  //     </td>
  //     <td>
  //       {album.title} <p className='text-xs'> {album.artist} </p>
  //     </td>
  //     <td>
  //       <button onClick={() => deleteAlbum(album.spot_id)}>
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

  const albumList = albums.map((album) => (
    <tr key={album.spot_id} class='bg-gray-800'>
      <td class='p-1'>
        <div class='flex justify-center items-center'>
          <img src={album.img} className='rounded-xl h-32 w-32  object-cover' />
        </div>
      </td>
      <td class='text-center p-1 font-bold'>{album.title}</td>
      <td class='text-center p-1 font-bold'>{album.artist}</td>
      {/* <td class='p-1'>
      <span class='bg-green-400 text-gray-50 rounded-md px-2'>available</span>
    </td> */}
      <td class='p-1 '>
        <button onClick={() => deleteAlbum(album.spot_id)}>
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
              <th class='p-1 w-1/4'>Your Favorite Albums</th>
              <th class='p-1 text-center w-1/4'>Title</th>
              <th class='p-1 text-center w-1/4'>Artists' Name</th>
              {/* <th class='p-1 text-left'>Status</th> */}
              <th class='p-1 text-left w-1/12 '>Action</th>
            </tr>
          </thead>
          <tbody>{albumList}</tbody>
        </table>
      </div>
    </div>
  );
};

Album.propTypes = {
  deleteAlbum: PropTypes.func.isRequired,
  album: PropTypes.array.isRequired,
};

export default connect(null, { deleteAlbum })(Album);
