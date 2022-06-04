import React from 'react';
import { useRef } from 'react';
import { useAppSelector } from '../../app/hooks';
import Toast from '../../components/Toast';
import { userSelector } from '../../features/user/User';
import useInput from '../../hooks/useInput';
import api from '../../utils/api';
import axiosInstance from '../../utils/axiosInstance';

type Props = {};

export const Privacy = (props: Props) => {
  const currentPassword = useInput('');
  const newPassword = useInput('');

  const toastMessage = useInput('');
  const toastStatus = useInput('');

  const toastRef = useRef<any>(null);
  const { user }: any = useAppSelector(userSelector);

  const formHandler = (e: any) => {
    e.preventDefault();

    const passwordDetail = {
      id: user?.id,
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
    };

    axiosInstance
      .post('/user/updatePassword', passwordDetail)
      .then((res) => {
        toastStatus.setInput('success');
        toastMessage.setInput('Successful update password');
        console.log(toastStatus.value);
        toastRef?.current.showToast();
      })
      .catch((err) => {
        toastMessage.setInput(err.response.data.message);
        toastStatus.setInput('error');
        toastRef?.current.showToast();
      });
  };

  return (
    <div className='flex flex-col mt-5'>
      <form onSubmit={(e) => formHandler(e)}>
        <section className='flex flex-col '>
          <h1>Change Password</h1>

          <Toast
            ref={toastRef}
            message={toastMessage.value}
            status={toastStatus.value}
          />

          <input
            className='bg-gray-200 max-w-sm px-5 py-4 rounded-md focus:outline-none w-[400px] mt-10 m-auto'
            type='password'
            onChange={currentPassword.onChange}
            value={currentPassword.value}
            placeholder='current password'
          />
          <input
            className='bg-gray-200 max-w-sm px-5 py-4 rounded-md focus:outline-none w-[400px] mt-5 m-auto'
            type='password'
            onChange={newPassword.onChange}
            value={newPassword.value}
            placeholder='new password'
          />

          <button className='bg-blue-500 px-3 p-3 text-white rounded-lg w-[100px] m-auto mt-20'>
            Confirm
          </button>
        </section>
      </form>
    </div>
  );
};
