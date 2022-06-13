import React, { useEffect, useRef, useState } from 'react';
import ModalUser from '../../components/ModalUser';
import useModal from '../../hooks/useModal';
import useInput from '../../hooks/useInput';
import { useAppDispatch } from '../../app/hooks';
import {
  addPublication,
  getAllPublication,
} from '../../features/Publication/Publication';
import Dropzone from '../../components/Dropzone';
import DropZoneFile from '../../components/DropZoneFile';
import Toast from '../../components/Toast';
import axiosInstance from '../../utils/axiosInstance';

const AddPublication = ({ isShowing, toggle }: any) => {
  const title = useInput('');
  const description = useInput('');
  const isbn = useInput('');
  const staff = useInput('');
  const year = useInput('');
  const dispatch = useAppDispatch();

  // for images
  const [file, setFile] = useState<any>([]);

  // for PDF
  const [filePDF, setFilePDF] = useState<any>([]);
  const [validFiles, setValidFiles] = useState<any>([]);

  //for toast
  const [status, setStatus] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const toastRef = useRef<any>(null);

  const { isShowing: showDropzone, toggle: toggleDropzone } = useModal();
  const { isShowing: showDropFile, toggle: toggleDropFile } = useModal();

  //for drop file
  const fileDrop = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        if (file.length < 2) {
          setFile((prevArray: any) => [...prevArray, ...files]);
        } else {
          file.splice(0, 1);
          setFile((prevArray: any) => [...prevArray, ...files]);
        }
      }
    }
  };

  //for validate file
  const validateFile = (file: any) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    console.log(validTypes.indexOf(file.type) === -1);
    if (validTypes.indexOf(file.type) === -1) {
      setMessage('Please insert all the field');
      setStatus('error');
      toastRef.current.showToast();
      return false;
    }
    return true;
  };

  //to show file size
  const fileSize = (size: any) => {
    if (size === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  //to remove file
  const removeFile = (name: any) => {
    // find the index of the item
    // remove the item from array
    const selectedFileIndex = file.findIndex((e: any) => e.name === name);
    file.splice(selectedFileIndex, 1);
    // update selectedFiles array
    setFile([...file]);
  };

  console.log(staff.value);

  //! for pdf functions

  //for drop file
  const fileDropPDF = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      if (validateFilePDF(files[i])) {
        setFilePDF([...files]);
      }
    }
  };

  //for validate file
  const validateFilePDF = (file: any) => {
    const validTypes = ['application/pdf'];
    console.log(validTypes.indexOf(file.type) === -1);
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  //remove duplicate name
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

  console.log(file);

  //to remove file
  const removeFilePDF = (name: any) => {
    // find the index of the item
    // remove the item from array
    const selectedFileIndex = file.findIndex((e: any) => e.name === name);
    filePDF.splice(selectedFileIndex, 1);
    // update selectedFiles array
    setFilePDF([...filePDF]);
  };

  const formHandler = (e: any) => {
    if (validFiles.length < 2) {
      toastRef.current.showToast();
      setMessage('Please upload cover & backpage publication');
      e.preventDefault();
      return;
    }

    if (filePDF.length < 1) {
      toastRef.current.showToast();
      setMessage('Please upload PDF');
      e.preventDefault();
      return;
    }

    if (!year.value || year.value === 'Year') {
      toastRef.current.showToast();
      setMessage('Please select year');
      e.preventDefault();
      return;
    }

    e.preventDefault();

    const formData = new FormData();

    formData.append('title', title.value);
    formData.append('description', description.value);
    formData.append('isbn', isbn.value);
    formData.append('staff', staff.value);
    formData.append('year', year.value);
    file.forEach((image: any) => formData.append('upload', image));
    filePDF.forEach((file: any) => formData.append('upload', file));

    axiosInstance
      .post(`/publication/createPublication`, formData, {
        withCredentials: true,
      })
      .then((res: any) => {
        if (res.status === 200) {
          console.log(res.data);
          const newPublication = {
            id: res.data.id,
            Title: title.value,
            Description: description.value,
            isbn: isbn.value,
            staff: staff.value,
            year: year.value,
            img_url: res.data.image_url ? res.data.image_url : null,
            pdf_url: res.data.pdf_url,
          };
          console.log(newPublication);
          dispatch(addPublication(newPublication));
          toggle();
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <ModalUser modal={isShowing} setModal={toggle}>
      <div className='relative'>
        <Toast status='error' message={message} ref={toastRef} />
        <div className='left-0 right-0 mx-6 lg:mx-auto lg:max-w-lg break-words  py-8 px-8 lg:md:px-16  bg-white  shadow-md rounded-lg border border-gray-400'>
          <form onSubmit={(e) => formHandler(e)} className='relative'>
            <button
              type='button'
              onClick={() => toggle()}
              className=' cursor-pointer absolute -top-6 -right-12 mt-4 mr-5 focus:outline-none text-gray-400 hover:text-gray-600  transition duration-150 ease-in-out'
              data-modal-toggle='authentication-modal'
            >
              <i className='fa-solid fa-xmark fa-lg' />
            </button>
            <section className=''>
              <p className='m-1'>Title</p>
              <input
                type='text'
                value={title.value}
                required
                onChange={title.onChange}
                className='bg-blue-100 py-1 rounded-lg w-full'
              />
            </section>

            <section className=''>
              <p className='m-1'>Description</p>
              <textarea
                value={description.value}
                required
                onChange={description.onChange}
                className='bg-blue-100 py-1 rounded-lg w-full'
              />
            </section>

            <section className='mt-1'>
              <p className='m-1'>ISBN</p>
              <input
                type='text'
                value={isbn.value}
                required
                onChange={isbn.onChange}
                className='bg-blue-100 py-1 rounded-lg w-full'
              />
            </section>
            <section className='mt-1'>
              <p className='m-1'>Staff Name:</p>
              <textarea
                value={staff.value}
                required
                onChange={staff.onChange}
                className='bg-blue-100 py-1 rounded-lg w-full'
              />
            </section>

            <select
              onChange={year.onChange}
              value={year.value}
              required
              className='bg-blue-100 px-3 mt-3 py-2 rounded-lg outline-none w-full'
            >
              {[
                'Year',
                '2017',
                '2018',
                '2019',
                '2020',
                '2021',
                '2022',
                '2023',
              ]?.map((item: any, index: number) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <section className='my-5 flex'>
              <section
                className='mt-5 flex  w-[200px] items-center cursor-pointer 
              text-slate-400 hover:text-blue-500
            '
                onClick={toggleDropzone}
              >
                <div className='p-5 rounded-md bg-blue-50 '>
                  <i className='fa-solid fa-images fa-2xl'></i>
                </div>
                <p className='ml-5 text-sm'>Upload Images</p>
              </section>
              <section
                className='mt-5 flex  w-[200px] items-center cursor-pointer 
              text-slate-400 hover:text-blue-500
            '
                onClick={toggleDropFile}
              >
                <div className='p-5 rounded-md bg-blue-50 '>
                  <i className='fa-solid fa-file-pdf fa-2xl'></i>
                </div>
                <p className='ml-5 text-sm'>Upload File</p>
              </section>
            </section>

            <Dropzone
              content={'Drop Front and Backpage Cover'}
              isShowing={showDropzone}
              hide={toggleDropzone}
              fileDrop={fileDrop}
              fileSize={fileSize}
              files={validFiles}
              removeFile={removeFile}
            />
            <DropZoneFile
              isShowing={showDropFile}
              hide={toggleDropFile}
              fileDrop={fileDropPDF}
              fileSize={fileSize}
              files={filePDF}
              content={'Drop Publication Detail'}
              removeFile={removeFilePDF}
            />

            <div className=' justify-center flex'>
              <button className='focus:outline-none transition duration-150 mt-5 ease-in-out hover:bg-indigo-600 bg-blue-500 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm'>
                CREATE
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalUser>
  );
};
export default AddPublication;
