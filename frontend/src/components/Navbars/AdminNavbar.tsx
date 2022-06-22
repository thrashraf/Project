import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { userSelector } from '../../features/user/User';

import UserDropdown from '../Dropdowns/UserDropdown';

export default function Navbar() {
  const { user }: any = useAppSelector(userSelector);

  return (
    <>
      {/* Navbar */}
      <nav className='absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4'>
        <div className='w-full mx-autp items-center flex justify-end md:flex-nowrap flex-wrap md:px-10 px-4'>
          {/* Brand */}
          <p className='mr-10 text-white font-extrabold'>
            login as {user?.role == 'hd' ? 'Head Department' : 'Admin'}
          </p>

          <ul className='flex-col md:flex-row list-none items-center hidden md:flex'>
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
