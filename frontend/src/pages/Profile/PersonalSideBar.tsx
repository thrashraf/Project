import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { userSelector } from '../../features/user/User';
import useInput from '../../hooks/useInput';

export const PersonalSideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user }: any = useAppSelector(userSelector);
  const role = useInput('');

  useEffect(() => {
    if (!user) return;

    role.setInput(user.role);
  }, [user]);

  console.log(user?.role);
  return (
    <div>
      <aside
        className={`hidden lg:flex my-5  border border-gray-300 rounded-xl px-3 py-3 cursor-pointer ${
          location.pathname === '/profile/account'
            ? 'bg-[#eff6ff] border-[1.5px] border-solid border-[#0079fe]'
            : null
        }`}
        onClick={() => navigate(`/profile/account`)}
      >
        <div className='bg-blue-500 px-3 py-3 rounded-lg mr-5'>
          <img
            src={`/assets/account.png`}
            alt='profile'
            className='w-[35px] h-[35px] object-cover'
          />
        </div>
        <section>
          <h1>Account</h1>
          <p className='text-[12px] mt-1 text-gray-400'>Personal Information</p>
        </section>
      </aside>

      <aside
        className={`  my-5  ${
          role && role.value !== 'staff' ? 'hidden' : 'lg:flex'
        }   border border-gray-300 rounded-xl px-3 py-3 cursor-pointer ${
          location.pathname === '/profile/documents'
            ? 'bg-[#eff6ff] border-[1.5px] border-solid border-[#0079fe]'
            : null
        }`}
        onClick={() => navigate(`/profile/documents`)}
      >
        <div className='bg-blue-500 px-3 py-3 rounded-lg mr-5'>
          <img
            src={`/assets/document.png`}
            alt='profile'
            className='w-[35px] h-[35px] object-cover'
          />
        </div>
        <section>
          <h1>Documents</h1>
          <p className='text-[12px] mt-1 text-gray-400'>Reports</p>
        </section>
      </aside>

      <aside
        className={`hidden lg:flex my-5 border border-gray-300 rounded-xl px-3 py-3 cursor-pointer ${
          location.pathname === '/profile/privacy'
            ? 'bg-[#eff6ff] border-[1.5px] border-solid border-[#0079fe]'
            : null
        }`}
        onClick={() => navigate(`/profile/privacy`)}
      >
        <div className='bg-blue-500 px-3 py-3 rounded-lg mr-5'>
          <img
            src={'/assets/security.png'}
            alt='profile'
            className='w-[35px] h-[35px] object-cover'
          />
        </div>
        <section>
          <h1>Privacy & Security</h1>
          <p className='text-[12px] mt-1 text-gray-400'>Password</p>
        </section>
      </aside>
    </div>
  );
};
