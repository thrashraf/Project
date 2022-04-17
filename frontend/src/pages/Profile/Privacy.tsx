import React from 'react';

type Props = {};

export const Privacy = (props: Props) => {
  return <div className='flex flex-col mt-5'>

      <section className='flex flex-col '>
        <h1>Change Password</h1>

        <input className='bg-gray-200 max-w-sm px-5 py-4 rounded-md focus:outline-none w-[400px] mt-10 m-auto' type="password" placeholder='current password'/>
        <input className='bg-gray-200 max-w-sm px-5 py-4 rounded-md focus:outline-none w-[400px] mt-5 m-auto' type="password" placeholder='new password'/>
        <input className='bg-gray-200 max-w-sm px-5 py-4 rounded-md focus:outline-none w-[400px] mt-5 m-auto' type="password" placeholder='old password'/>

        <button className='bg-blue-500 px-3 p-3 text-white rounded-lg w-[100px] m-auto mt-10'>Confirm</button>
      </section>

  </div>;
};
