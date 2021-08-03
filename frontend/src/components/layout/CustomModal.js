import React from 'react';

const CustomModal = ({ component: Component, setShowModal, title }) => {
  return (
    <>
      <div className='h-full w-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='h-5/6 w-5/6 overflow-y-autorelative my-6 mx-auto max-w-3xl'>
          {/*content*/}
          <div className=' h-full border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none'>
            {/*header*/}
            {/* {/* <div className='h-1/6 flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
              <h3 className='text-3xl font-semibold'>{title}</h3> */}
            {/* <button
              className='p-1 ml-auto bg-transparent border-0 text-black float-right text-xl leading-none font-semibold outline-none focus:outline-none'
              onClick={() => setShowModal(false)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </button> */}
            {/* </div> */}
            {/*body*/}
            <div className='h-full w-full relative p-6 flex-auto overflow-scroll'>
              <Component />
            </div>
            {/*footer*/}
            <div className=' h-px bg-opacity-0 bg-transparent flex items-center justify-end p-6 rounded-b'>
              <button
                className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                type='button'
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  );
};

export default CustomModal;
