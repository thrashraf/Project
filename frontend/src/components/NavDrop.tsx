import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPopper } from '@popperjs/core';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { userSelector, clearState } from '../features/user/User';
import url from '../utils/url';

const IndexDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = useRef<any>(null);
  const popoverDropdownRef = useRef<any>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user }: any = useAppSelector(userSelector);

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-start',
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const logoutHandler = () => {
    axios
      .delete(`${url}/api/user/logout`, { withCredentials: true })
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
        className='hover:text-blue-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
        href='/'
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        MENU
      </a>
      <div
        className={
          (dropdownPopoverShow ? 'block ' : 'hidden ') +
          'bg-white text-base z-50 py-2 list-none absolute top-16 right-32 text-left rounded shadow-lg min-w-48'
        }
      >
        <Link
          to='/activities'
          className='text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent hover:text-blue-500'
        >
          Events
        </Link>
        <Link
          to='/innovation'
          className='text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent hover:text-blue-500'
        >
          Innovation
        </Link>
        <Link
          to='/publication'
          className='text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent hover:text-blue-500'
        >
          Publication
        </Link>

        {user && (
          <div className='border border-solid border-blueGray-100'>
            <span
              className=' cursor-pointer text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent hover:text-blue-500'
              onClick={logoutHandler}
            >
              Logout
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default IndexDropdown;
