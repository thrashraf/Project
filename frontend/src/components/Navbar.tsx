/*eslint-disable*/
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { userSelector, clearState } from '../features/user/User';
import { Link } from 'react-router-dom';
import NavDrop from '../components/NavDrop';
import { useNavigate } from 'react-router-dom';
import UserDropdown from './Dropdowns/UserDropdown';
import imgUrl from '../utils/imgUrl';

type Props = {};

export default function Navbar(props: any) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);

  const { user }: any = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    user && setUserRole(user.role);
  }, [user]);

  return (
    <>
      <nav className='top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow'>
        <div className='container px-4 mx-auto flex flex-wrap items-center justify-between'>
          <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
            <a
              href='/'
              className='text-[#47487a] text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase'
            >
              SAMS
            </a>
            <button
              className='cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
              type='button'
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className='fas fa-bars'></i>
            </button>
          </div>
          <div
            className={
              'lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none justify-end' +
              (navbarOpen ? ' block' : ' hidden')
            }
            id='example-navbar-warning'
          >
            <ul
              className={`${
                userRole
                  ? userRole !== 'staff'
                    ? 'hidden'
                    : 'visible'
                  : 'visible'
              } flex flex-col lg:flex-row list-none lg:ml-auto`}
            >
              {user && (
                <li className='text-sm text-gray-600 p-2'>
                  login as {user.role}
                </li>
              )}

              <li className='flex items-center'>
                <NavDrop />
              </li>

              <li className='flex items-center ml-10'>
                {user ? (
                  <div
                    className='flex items-center space-x-4 relative cursor-pointer'
                    onClick={() => navigate('/profile/account')}
                  >
                    <img
                      className='w-10 h-10 rounded-full object-cover'
                      src={`${
                        user.profile_picture
                          ? `${imgUrl}${user.profile_picture}`
                          : '/assets/dummy_profile.png'
                      }`}
                      alt=''
                    />
                    <span className='w-[10px] h-[10px] bg-green-400 rounded-full absolute right-0 -bottom-0' />
                  </div>
                ) : (
                  <button
                    className='bg-blue-500 text-white active:bg-blue-500 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150'
                    type='button'
                    onClick={() => navigate('/login')}
                  >
                    <i className='fas fa-arrow-alt-circle-down'></i> Login
                  </button>
                )}
              </li>
            </ul>
            <div
              className={`${
                userRole
                  ? userRole !== 'staff'
                    ? 'visible'
                    : 'hidden'
                  : 'hidden'
              }`}
            >
              <UserDropdown />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
