import React from 'react';
import { useNavigate } from 'react-router-dom';
import ModalContainer from '../../components/ModalContainer';

const SignatureModal = ({ isShowing, toggle }: any) => {
  const navigate = useNavigate();

  return (
    <ModalContainer isShowing={isShowing} toggle={toggle}>
      <div className='relative mx-auto bg-white max-w-md rounded-lg shadow z-50'>
        <div className='relative bg-white rounded-lg shadow '>
          <div className='p-6 text-center'>
            <svg
              className='mx-auto mb-4 w-14 h-14 text-gray-400 '
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
            <h3 className='mb-5 text-lg font-normal text-gray-500 '>
              You haven't set your signature yet, to continue you need to set
              it.
            </h3>
            <button
              onClick={() => navigate('/activities')}
              type='button'
              className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 '
            >
              No, cancel
            </button>

            <button
              type='button'
              onClick={() => navigate('/profile/account')}
              className='text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center ml-2'
            >
              Yes, I'm sure
            </button>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default SignatureModal;
