import axios from 'axios';
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

type Props = {
  show: boolean;
  user: any;
  allUser: any;
  // eslint-disable-next-line no-empty-pattern
  setAllUser: ([]) => void;
  modalHandler: () => void;
};

export const Modal = (props: Props) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  //fetch user and set into state
  useEffect(() => {
    if (props.user) {
      setName(props.user.name);
      setEmail(props.user.email);
      setRole(props.user.role);
    }
  }, [props.user]);

  const onSubmitHandler = (e: React.SyntheticEvent) => {
    //? to prevent refresh
    e.preventDefault();

    const updateEndpoint =
      password.length > 0
        ? `/admin/updateUserWithPassword`
        : `/admin/updateUser`;

    const id = props.user.id;
    const profile_picture = props.user.profile_picture;

    axiosInstance
      .post(
        updateEndpoint,
        { id, name, email, role, password },
        { withCredentials: true }
      )
      .then((res) => {
        const currentUpdatedUser = { id, name, email, role, profile_picture };
        //find index based on user id
        const index = props.allUser.findIndex(
          (userId: any) => userId.id === id
        );
        //copy all user array
        const updatedUsers = [...props.allUser];
        updatedUsers[index] = currentUpdatedUser;

        props.setAllUser(updatedUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      id='popup'
      className={`z-50 w-full flex justify-center inset-0 ${
        props.show ? 'fixed' : 'hidden'
      }`}
    >
      <div
        className='w-full bg-[#00000055]  z-[10px] absolute inset-0'
        onClick={props.modalHandler}
      />
      <div className='bg-white z-50 rounded-md shadow fixed overflow-y-auto sm:h-auto w-10/12 md:w-8/12 lg:w-1/2 2xl:w-2/5 m-auto transform translate-y-1/3'>
        <div className='bg-gray-100 rounded-tl-md rounded-tr-md px-4 md:px-8 md:py-4 py-7 flex items-center justify-between'>
          <p className='text-base font-semibold'>Edit User</p>
          <button className='focus:outline-none' onClick={props.modalHandler}>
            <svg
              width={28}
              height={28}
              viewBox='0 0 28 28'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M21 7L7 21'
                stroke='#A1A1AA'
                strokeWidth='1.75'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M7 7L21 21'
                stroke='#A1A1AA'
                strokeWidth='1.75'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>
        <div className='px-4 md:px-10 pt-6 md:pt-12 md:pb-4 pb-7'>
          <form onSubmit={onSubmitHandler}>
            <div className='flex items-center space-x-9'>
              <input
                placeholder='Full Name'
                className='w-1/2 focus:outline-none placeholder-gray-500 py-3 px-3 text-sm leading-none text-gray-800 bg-white border rounded border-gray-200'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                placeholder='password'
                type='password'
                className='w-1/2 focus:outline-none placeholder-gray-500 py-3 px-3 text-sm leading-none text-gray-800 bg-white border rounded border-gray-200'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='flex items-center space-x-9 mt-8'>
              <input
                placeholder='Email'
                type='email'
                className='w-1/2 focus:outline-none placeholder-gray-500 py-3 px-3 text-sm leading-none text-gray-800 bg-white border rounded border-gray-200'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className='w-1/2 bg-white border rounded border-gray-200 py-2.5 px-3'>
                <select
                  className='text-sm text-gray-500 w-full focus:outline-none'
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option disabled>Role</option>
                  <option>Staff</option>
                  <option>Head Department</option>
                  <option>Admin</option>
                </select>
              </div>
            </div>
            <div className='flex justify-end mt-20'>
              <button
                className='px-6 py-3 hover:bg-gray-300 hover:text-white rounded-lg text-sm mr-7'
                onClick={props.modalHandler}
              >
                Cancel
              </button>
              <input
                className='px-6 py-3 bg-blue-500 hover:bg-opacity-80 shadow rounded-lg text-sm text-white'
                type='submit'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
