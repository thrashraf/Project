import React, { useEffect, useRef, useState } from 'react';
import ModalContainer from '../../components/ModalContainer';
import Dropzone from '../../components/Dropzone';
import useModal from '../../hooks/useModal';
import Toast from '../../components/Toast';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  userSelector,
  updateProfile,
  refreshUser,
  updateSignature,
  toggleEditSignature,
} from '../../features/user/User';

type Props = {
  isShowing: boolean;
  toggle: any;
};

const SignatureModal = (props: Props) => {
  const dispatch = useAppDispatch();

  const { user }: any = useAppSelector(userSelector);

  //for toast
  const [status, setStatus] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const toastRef = useRef<any>(null);

  //dropzone State
  const { isShowing, toggle } = useModal();

  const [file, setFile] = useState<any>([]);
  const [validFiles, setValidFiles] = useState<any>([]);

  const addFile = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        setFile((prevArray: any) => [...prevArray, ...files]);
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
    const validFileIndex = validFiles.findIndex((e: any) => e.name === name);
    validFiles.splice(validFileIndex, 1);
    // update validFiles array
    setValidFiles([...validFiles]);
    const selectedFileIndex = file.findIndex((e: any) => e.name === name);
    file.splice(selectedFileIndex, 1);
    // update selectedFiles array
    setFile([...file]);
  };

  //to remove duplicate name
  useEffect(() => {
    let filteredArray = file.reduce((file: any, current: any) => {
      const x = file.find((item: any) => item.name === current.name);
      if (!x) {
        return file.concat([current]);
      } else {
        return file;
      }
    }, []);
    setValidFiles([...filteredArray]);
  }, [file]);

  const resetFile = () => {
    setFile([]);
    setValidFiles([]);
  };

  const formHandler = (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', user?.email);
    validFiles.forEach((image: any) => formData.append('upload', image));

    axios
      .post('/api/user/uploadSignature', formData)
      .then((res: any) => {
        if (res.status === 200) {
          dispatch(updateSignature(res.data.signature));
          dispatch(toggleEditSignature());
          props.toggle();
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <ModalContainer
      isShowing={props.isShowing}
      toggle={props.toggle}
      hide={props.toggle}
    >
      <div className='relative mx-auto bg-white max-w-sm rounded-lg shadow z-50 '>
        <form
          className='flex flex-col px-5 py-3'
          onSubmit={(e) => formHandler(e)}
        >
          <section className='my-5 flex justify-center'>
            <section
              className='mt-5 flex   items-center cursor-pointer 
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
          <section className=' flex justify-end'>
            <button
              className='flex hover:bg-black hover:text-white px-3 py-2  rounded-lg mr-5'
              onClick={props.toggle}
            >
              Cancel
            </button>
            <button className='flex bg-blue-500 px-3 py-2 text-white rounded-lg'>
              Upload
            </button>
          </section>
        </form>
        <Dropzone
          isShowing={isShowing}
          hide={toggle}
          fileDrop={addFile}
          files={validFiles}
          removeFile={deleteFile}
        />
        <Toast ref={toastRef} status={status} message={message} />
      </div>
    </ModalContainer>
  );
};

export default SignatureModal;
