import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearState, userSelector } from '../../features/user/User';
import { createPopper } from '@popperjs/core';
import axiosInstance from '../../utils/axiosInstance';

const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);

  const btnDropdownRef = useRef<HTMLAnchorElement>(null);
  const popoverDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const openDropdownPopover = () => {
    if (
      btnDropdownRef.current !== null &&
      popoverDropdownRef.current !== null
    ) {
      createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
        placement: 'bottom-start',
      });
      setDropdownPopoverShow(true);
    }
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const dispatch = useAppDispatch();
  const { user }: any = useAppSelector(userSelector);

  const logoutHandler = () => {
    axiosInstance
      .delete(`/user/logout`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        dispatch(clearState());
        localStorage.clear();
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <a
        className='text-blueGray-500 block'
        href='#pablo'
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className='items-center flex'>
          <span className='w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full'>
            <img
              alt='...'
              className='w-full rounded-full align-middle border-none shadow-lg'
              src={
                user?.profile_picture
                  ? `/file/${user.profile_picture}`
                  : '/assets/dummy_profile.png'
              }
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? 'block ' : 'hidden ') +
          'bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48'
        }
      >
        <Link
          to={user?.role === 'admin' ? '/admin/dashboard' : '/kj/dashboard'}
        >
          <a
            href='#pablo'
            className={
              'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'
            }
          >
            Home
          </a>
        </Link>
        <a
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'
          }
          onClick={(e) => navigate('/profile/account')}
        >
          Profile
        </a>
        <a
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer'
          }
          onClick={(e) => logoutHandler()}
        >
          Logout
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
