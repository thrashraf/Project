import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isShowing, hide, ...props }: any) =>
  isShowing
    ? ReactDOM.createPortal(
        <div className='overflow-y-auto overflow-x-hidden  font-poppins fixed top-0 right-0 left-0 z-10 w-full md:inset-0  md:h-full pt-[100px]'>
          <div className='bg-[#00000055] z-10 fixed inset-0 ' onClick={hide} />
          <div className=' p-4 w-full h-full m-auto '>{props.children}</div>
        </div>,
        document.body
      )
    : null;

export default Modal;
