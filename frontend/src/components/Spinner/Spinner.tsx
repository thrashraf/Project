import React from 'react';
import './Spinner.modules.css';

const Spinner = () => {
  return (
    <div className='fixed inset-0 flex justify-center items-center w-full h-full z-50'>
      <div className='bg-[#00000055] fixed inset-0 ' />
      <div className='lds-spinner'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
