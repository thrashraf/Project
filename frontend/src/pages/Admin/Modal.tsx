import React, { useEffect, useRef, useState } from 'react';
import ModalContainer from '../../components/ModalContainer';
import Dropzone from '../../components/Dropzone';
import useInput from '../../hooks/useInput';
import useModal from '../../hooks/useModal';
import Toast from '../../components/Toast';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addUser, updateUserHandler } from '../../features/admin/Admin';
import { userSelector } from '../../features/user/User';
import api from '../../utils/api';
import url from '../../utils/url';

type Props = {
  isShowing: boolean;
  toggle: any;
  user: any;
  mode: string;
};

const Modal = (props: Props) => {
  const dispatch = useAppDispatch();

  const name = useInput('');
  const email = useInput('');
  const role = useInput('');
  const phone_number = useInput('');
  const password = useInput('');

  //for toast
  const [status, setStatus] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const toastRef = useRef<any>(null);

  //dropzone State
  const { isShowing, toggle } = useModal();

  const [file, setFile] = useState<any>([]);

  const addFile = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        setFile([...files]);
      } else {
        // setStatus('error');
        // setMessage('Not support file type');
        // toastRef.current && toastRef.current.showToast();
      }
    }
  };

  //for validate file
  const validateFile = (file: any) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    console.log(validTypes.indexOf(file.type) === -1);
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  //to remove file
  const deleteFile = (name: any) => {
    // find the index of the item
    // remove the item from array
    const selectedFileIndex = file.findIndex((e: any) => e.name === name);
    file.splice(selectedFileIndex, 1);
    // update selectedFiles array
    setFile([...file]);
  };

  const resetFile = () => {
    setFile([]);
  };

  const updateUser = (e: any) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('id', props.user.id);
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('role', role.value);
    formData.append('phone_number', phone_number.value);
    formData.append('img_url', props.user.profile_picture);
    file.forEach((image: any) => formData.append('upload', image));

    axios
      .post(`${url}/api/admin/updateUser`, formData, { withCredentials: true })
      .then((res: any) => {
        if (res.status === 200) {
          const newActivities = {
            id: props.user.id,
            name: name.value,
            email: email.value,
            role: role.value,
            phone_number: phone_number.value,
            // banner: res.data.image_url,
          };

          dispatch(updateUserHandler(newActivities));
          props.toggle();
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const createUser = (e: any) => {
    e.preventDefault();
    const newUser = {
      name: name.value,
      email: email.value,
      role: role.value,
      phone_number: phone_number.value,
      password: password.value,
    };

    api
      .post('/api/admin/createUser', newUser)
      .then((res) => {
        dispatch(addUser(newUser));
        props.toggle();
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        toastRef.current.showToast();
      });
  };

  useEffect(() => {
    if (!props.user) return;
    if (props.mode === 'add') {
      name.setInput('');
      email.setInput('');
      role.setInput('');
      phone_number.setInput('');
    } else {
      name.setInput(props.user.name);
      email.setInput(props.user.email);
      role.setInput(props.user.role);
      phone_number.setInput(props.user.phone_number);
    }
  }, [props.mode, props.user]);

  return (
    <ModalContainer
      isShowing={props.isShowing}
      toggle={props.toggle}
      hide={props.toggle}
    >
      <Toast status='error' message={message} ref={toastRef} />
      <div className='relative mx-auto bg-white max-w-lg rounded-lg shadow z-50 p-5'>
        <form
          onSubmit={
            props.mode === 'add' ? (e) => createUser(e) : (e) => updateUser(e)
          }
        >
          <div>
            <section className='my-5'>
              <p className='my-1 text-sm text-gray-400 ml-1'>
                Name
                <span className='text-red-500'>*</span>
              </p>
              <input
                type='text'
                value={name.value}
                onChange={name.onChange}
                required
                className='bg-blue-50 px-3 py-2 rounded-lg outline-none w-full'
              />
            </section>
            <div className='grid grid-cols-2 gap-5'>
              <section className=''>
                <p className='my-1 text-sm text-gray-400 ml-1'>
                  Email
                  <span className='text-red-500'>*</span>
                </p>
                <input
                  type='email'
                  value={email.value}
                  required
                  onChange={email.onChange}
                  className='bg-blue-50 px-3 py-2 rounded-lg outline-none w-full'
                />
              </section>
              <section className=''>
                <p className='my-1 text-smactivitiesSlice text-gray-400 ml-1'>
                  Role
                  <span className='text-red-500'>*</span>
                </p>
                <select
                  onChange={role.onChange}
                  value={role.value}
                  required
                  className='bg-blue-50 px-3 py-2 rounded-lg outline-none w-full'
                >
                  <option value='Select'>Select</option>
                  <option value='staff'>Staff</option>
                  <option value='admin'>Admin</option>
                  <option value='hd'>Head Department</option>
                </select>
              </section>
              <section className=''>
                <p className='my-1 text-sm text-gray-400 ml-1'>Phone Number</p>
                <input
                  type='phone'
                  value={phone_number.value}
                  onChange={phone_number.onChange}
                  className='bg-blue-50 px-3 py-2 rounded-lg outline-none w-full'
                />
              </section>
              <div>
                {props.mode === 'add' ? (
                  <section className=''>
                    <p className='my-1 text-sm text-gray-400 ml-1'>
                      Password<span className='text-red-500'>*</span>
                    </p>

                    <input
                      type='password'
                      value={password.value}
                      onChange={password.onChange}
                      required
                      className='bg-blue-50 px-3 py-2 rounded-lg outline-none w-full'
                    />
                  </section>
                ) : (
                  <section>
                    <p className='my-1 text-sm text-gray-400 ml-1'>
                      Profile Photo
                    </p>
                    <section
                      className='flex  w-[200px] items-center cursor-pointer 
              text-slate-400 hover:text-blue-500
            '
                      onClick={toggle}
                    >
                      <div className='p-5 rounded-md bg-blue-50 '>
                        <i className='fa-solid fa-images fa-2xl'></i>
                      </div>
                      <p className='ml-5 text-sm'>Upload Images</p>
                    </section>
                  </section>
                )}
              </div>
            </div>

            <section className=' flex justify-end mt-10'>
              <button
                className='flex hover:bg-black hover:text-white px-3 py-2  rounded-lg mr-5'
                onClick={props.toggle}
              >
                Cancel
              </button>
              <button
                className='flex bg-blue-500 px-3 py-2 text-white rounded-lg'
                type='submit'
              >
                {props.mode === 'add' ? 'Create' : 'Update'}
              </button>
            </section>
            <Dropzone
              isShowing={isShowing}
              hide={toggle}
              fileDrop={addFile}
              files={file}
              removeFile={deleteFile}
            />
            <Toast ref={toastRef} status={status} message={message} />
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};

export default Modal;
