import React, { useEffect, useRef, useState } from 'react';
import Toast from '../../components/Toast';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  adminSelector,
  getAllUser,
  deleteUser,
  deleteUserHandler,
  setFilterHandler,
  handleFilter,
} from '../../features/admin/Admin';
// components

import useModal from '../../hooks/useModal';
import { userSelector } from '../../features/user/User';
import More from '../../components/More';
import Modal from './Modal';
import useInput from '../../hooks/useInput';
import imgUrl from '../../utils/imgUrl';

export default function Users() {
  const {
    allUsers,
    isSuccess,
    queryUser,
    filterDataUser,
    showFilterUser,
  }: any = useAppSelector(adminSelector);
  const dispatch = useAppDispatch();

  const { isShowing, toggle } = useModal();
  const { isShowing: showModal, toggle: toggleModal } = useModal();

  const [userDetail, setUserDetail] = useState<any>();
  const mode = useInput('');

  useEffect(() => {
    const fetch = async () => {
      dispatch(getAllUser(queryUser));
    };
    fetch();
  }, [queryUser]);

  const deleteUserById = (id: string) => {
    dispatch(deleteUser(id));

    isSuccess && dispatch(deleteUserHandler(id));
  };

  const setMode = (currentMode: string) => {
    toggleModal();
    mode.setInput(currentMode);
  };
  console.log(showModal);

  const edit = () => {
    setMode('update');
  };

  const toggleAction = (idUser: any) => {
    toggle();
    setUserDetail(idUser);
  };

  console.log(userDetail);

  return (
    <>
      {' '}
      <section className='flex py-1 z-10 w-full justify-center'>
        <button
          className='px-4 py-3 rounded-lg bg-white text-black mr-5 z-10'
          onClick={() => setMode('add')}
        >
          <i className='fa-solid fa-plus' />
        </button>

        <section className=' bg-white rounded-lg z-10'>
          <span className='p-2 ml-3 text-gray-400'>
            <i className='fa-solid fa-magnifying-glass' />
          </span>
          <input
            type='text'
            placeholder='search by name'
            className='text-lg px-4 py-2 bg-white rounded-t-lg rounded-b-lg  w-[400px] focus:outline-none'
            onChange={(e) => dispatch(handleFilter(e.target.value))}
            value={queryUser}
          />
          {filterDataUser.slice(0, 15).length !== 0 && showFilterUser && (
            <div className='bg-white absolute shadow-md no-scrollbar overflow-hidden z-10 h-[200px] w-[450px] bottom-52 rounded-lg px-4 py-2 overflow-y-auto'>
              {filterDataUser?.map((item: any, index: number) => (
                <p
                  className='p-3 cursor-pointer hover:bg-slate-100'
                  onClick={() => dispatch(setFilterHandler(item.name))}
                  key={index}
                >
                  {item.name}
                </p>
              ))}
            </div>
          )}
        </section>
      </section>
      <div className='flex flex-wrap mt-4'>
        <div className='w-full mb-12 px-4'>
          <div
            className={
              'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white'
            }
          >
            <div className='rounded-t mb-0 px-4 py-3 border-0'>
              <div className='flex flex-wrap items-center'>
                <div className='relative w-full px-4 max-w-full flex-grow flex-1'>
                  <h3 className={'font-semibold text-lg text-blueGray-700'}>
                    Users
                  </h3>
                </div>
              </div>
            </div>
            <div className='block w-full overflow-x-auto'>
              {/* Projects table */}
              <table className='items-center w-full bg-transparent border-collapse'>
                <thead>
                  <tr>
                    {[
                      'Name',
                      'Email',
                      'Role',
                      'Phone Number',
                      'Profile Picture',
                      'Actions',
                    ].map((item: any, index: number) => (
                      <th
                        key={index}
                        className={
                          'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center g-blueGray-50 text-blueGray-500 border-blueGray-100'
                        }
                      >
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allUsers && allUsers.length > 0 ? (
                    allUsers?.map((user: any, index: number) => {
                      return (
                        <tr key={index} className='text-center relative'>
                          <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                            <span className='font-bold uppercase text-blue-500 hover:underline cursor-pointer'>
                              {user.name}
                            </span>
                          </td>
                          <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                            {user.email}
                          </td>
                          <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                            {user.role}
                          </td>
                          <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                            <p>
                              {user.phone_number
                                ? user.phone_number
                                : 'Not Set'}
                            </p>
                          </td>
                          <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                            <img
                              src={
                                user?.profile_picture
                                  ? `${imgUrl}${user.profile_picture}`
                                  : '/assets/defaultProfile.jpg'
                              }
                              alt=''
                              className='w-10 h-10 rounded-full object-cover mx-auto'
                            />
                          </td>
                          <td className='absolute right-[90px]'>
                            <section className='relative'>
                              <button
                                className='top-2 left-2 absolute text-black bg-transparent hover:bg-slate-100 z-10 rounded-lg text-sm py-5 px-3 ml-auto inline-flex items-center focus:outline-none '
                                onClick={() => toggleAction(user)}
                              >
                                <i className='fa-solid fa-ellipsis-vertical fa-xl ' />
                              </button>

                              <Modal
                                isShowing={showModal}
                                toggle={toggleModal}
                                user={userDetail}
                                mode={mode.value}
                              />
                              {isShowing && user.id === userDetail.id ? (
                                <section className='bg-slate-50 absolute -left-32 w-[120px] z-50'>
                                  <ul>
                                    <li
                                      className='cursor-pointer hover:bg-slate-200 py-1 px-5 text-xs'
                                      onClick={edit}
                                    >
                                      Edit
                                    </li>
                                    <li
                                      className='cursor-pointer hover:bg-slate-200 py-1 px-5 text-xs'
                                      onClick={() => deleteUserById(user.id)}
                                    >
                                      Delete
                                    </li>
                                  </ul>
                                </section>
                              ) : null}
                            </section>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr className='text-center flex'>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        <span className='font-bold uppercase text-blue-500 hover:underline cursor-pointer'>
                          No item
                        </span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
