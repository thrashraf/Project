import React, { useEffect, useRef, useState } from 'react';
import useInput from '../hooks/useInput';
import useModal from '../hooks/useModal';
import More from '../components/More';
import ModalUser from './ModalUser';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  activitiesSelector,
  editModeHandler,
  closeEditMode,
} from '../features/activities/Activities';
import {
  editPublicationHandler,
  deletePublicationHandler,
} from '../features/Publication/Publication';
import Dropzone from './Dropzone';
import axios from 'axios';
import DropZoneFile from './DropZoneFile';
import Toast from './Toast';
import axiosInstance from '../utils/axiosInstance';
import imgUrl from '../utils/imgUrl';
import { userSelector } from '../features/user/User';

type Props = {
  show: boolean;
  setShow: any;
  publication: any;
};

const Modal2 = (props: Props) => {
  const [publication, setPublication] = useState<any>(null);

  const { editMode } = useAppSelector(activitiesSelector);
  const dispatch = useAppDispatch();
  const { isShowing, toggle } = useModal();
  const { isShowing: showDropzone, toggle: toggleDropzone } = useModal();

  //? for edit mode
  const showEditComp = editMode ? 'visible' : 'hidden';
  const hideEditComp = editMode ? 'hidden' : 'visible';

  const title = useInput('');
  const description = useInput('');
  const isbn = useInput('');
  const staff = useInput('');
  const year = useInput('');

  // for PDF
  // for images
  const [file, setFile] = useState<any>([]);
  const [validFiles, setValidFiles] = useState<any>([]);
  const [filePDF, setFilePDF] = useState<any>([]);

  //for toast
  const [status, setStatus] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const { isShowing: showDropFile, toggle: toggleDropFile } = useModal();

  const [imageIndex, setImageIndex] = useState<any>(0);

  const [prevImages, setPrevImages] = useState<any>([]);
  const prevPdf = useInput('');

  const toastRef = useRef<any>(null);

  const { user } = useAppSelector(userSelector);

  const toggleEditMode = () => dispatch(editModeHandler());

  useEffect(() => {
    if (props.publication) {
      setPublication(props.publication);

      title.setInput(props.publication.Title);
      description.setInput(props.publication.Description);
      isbn.setInput(props.publication.isbn);
      staff.setInput(props.publication.staff);
      year.setInput(props.publication.year);
      setPrevImages([...props.publication.img_url]);
      prevPdf.setInput(props.publication.pdf_url);
    }
  }, [props.publication]);

  const closeModal = () => {
    props.setShow(!props.show);
    dispatch(closeEditMode());
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

  //to remove file
  const deleteFile = (name: any) => {
    // find the index of the item
    // remove the item from array

    const selectedFileIndex = file.findIndex((e: any) => e.name === name);
    file.splice(selectedFileIndex, 1);
    // update selectedFiles array
    setFile([...file]);
  };

  console.log(file);

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

  //PDF form
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
  const validateFilePDF = (file: any) => {
    const validTypes = ['application/pdf'];
    console.log(validTypes.indexOf(file.type) === -1);
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };
  const removeFilePDF = (name: any) => {
    // find the index of the item
    // remove the item from array
    const selectedFileIndex = file.findIndex((e: any) => e.name === name);
    filePDF.splice(selectedFileIndex, 1);
    // update selectedFiles array
    setFilePDF([...filePDF]);
  };
  const fileSize = (size: any) => {
    if (size === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const updateCurrentPublication = () => {
    if (validFiles.length == 1) {
      toastRef.current.showToast();
      setMessage('Please upload cover & backpage publication');
      return;
    }

    console.log(validFiles.length);

    const formData = new FormData();

    formData.append('title', title.value);
    formData.append('description', description.value);
    formData.append('isbn', isbn.value);
    formData.append('staff', staff.value);
    formData.append('year', year.value);
    prevImages.forEach((image: any) => formData.append('prevImages', image));
    formData.append('prevPdf', prevPdf.value);
    file.forEach((image: any) => formData.append('upload', image));
    filePDF.forEach((file: any) => formData.append('upload', file));

    const id = publication.id;
    axiosInstance
      .post(`/publication/updatePublication?q=${id}`, formData, {
        withCredentials: true,
      })
      .then((res: any) => {
        if (res.status === 200) {
          console.log('ok');

          const newActivities = {
            id: publication.id,
            Title: title.value,
            Description: description.value,
            isbn: isbn.value,
            staff: staff.value,
            year: year.value,
            img_url: res.data.image_url
              ? res.data.image_url
              : publication.img_url,
            pdf_url: res.data.pdf_url
              ? res.data.pdf_url
              : props.publication.pdf_url,
          };

          dispatch(editPublicationHandler(newActivities));

          //toggle modal
          props.setShow(!props.show);
          //toggle more button
          toggle();
          dispatch(closeEditMode());
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const deletePublication = () => {
    const id = publication.id;

    axiosInstance
      .post(`/publication/deletePublication?q=${id}`, {
        withCredentials: true,
      })
      .then((res: any) => {
        if (res.status === 200) {
          console.log('ok');

          dispatch(deletePublicationHandler(id));
          //toggle modal
          props.setShow(!props.show);
          //toggle more button
          toggle();
          props.setShow(!props.show);
          //to clear files
          //dispatch(resetFile());
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        {props.show && props.publication && (
          <div
            className='py-12 transition duration-150 ease-in-out z-10 absolute top-0  bottom-0 right-0 left-0 text-center'
            id='modal'
          >
            <div
              className='bg-[#00000055] fixed z-10 inset-0 '
              onClick={closeModal}
            />
            <div
              role='alert'
              className='container mx-auto w-11/12 md:w-2/3 max-w-lg'
            >
              <div className='  mt-10 left-0 right-0 mx-6 lg:mx-auto lg:max-w-lg max-h-[600px]  overflow-y-auto  break-words py-8 px-8 lg:md:px-16 bg-white fixed z-20  shadow-md rounded-lg border border-gray-400'>
                <div className='w-full flex justify-center text-green-400 mb-4'></div>
                <div className='relative'>
                  <img
                    src={`${imgUrl}${publication?.img_url[imageIndex]}`}
                    className=' rounded-lg mb-10 w-[400px] h-[200px] object-contain'
                  ></img>
                  <div className='w-full absolute top-20 flex justify-between'>
                    <button
                      className=' bg-slate-300 hover:bg-slate-400 rounded-full px-3 py-1'
                      onClick={() => setImageIndex(0)}
                    >
                      <i className='fa-solid fa-chevron-left' />
                    </button>
                    <button
                      className=' bg-slate-300 hover:bg-slate-400 rounded-full px-3 py-1'
                      onClick={() => setImageIndex(1)}
                    >
                      {' '}
                      <i className='fa-solid fa-chevron-right' />
                    </button>
                  </div>
                  <i
                    onClick={toggleDropzone}
                    className={`fa-solid fa-camera cursor-pointer text-6xl fa-2xl absolute top-[20%] left-[45%] text-gray-300 ${
                      editMode ? 'visible' : 'hidden'
                    }`}
                  ></i>
                  <Dropzone
                    content={'Drop Front and Backpage'}
                    isShowing={showDropzone}
                    hide={toggleDropzone}
                    fileDrop={fileDrop}
                    fileSize={fileSize}
                    files={validFiles}
                    removeFile={deleteFile}
                  />
                </div>
                <h1
                  className={`${hideEditComp} text-center text-black  font-extrabold tracking-normal leading-tight mb-4`}
                >
                  {publication?.Title}
                </h1>
                <input
                  type='text'
                  onChange={(e) => title.setInput(e.target.value)}
                  value={title.value}
                  className={`bg-blue-50 px-3 py-2 rounded-md outline-none  text-black mb-4 w-full ${showEditComp}`}
                />

                <p
                  className={`mb-5 text-sm text-gray-900 dark:text-gray-400 text-center font-normal ${hideEditComp}`}
                >
                  {publication?.Description}
                </p>
                <textarea
                  onChange={(e) => description.setInput(e.target.value)}
                  value={description.value}
                  className={`bg-blue-50 px-3 py-2 rounded-md outline-none  text-black mb-4 w-full ${showEditComp}`}
                />

                <p
                  className={`mb-5 text-sm text-gray-900 dark:text-gray-400 text-center font-normal ${hideEditComp}`}
                >
                  ISBN:{publication?.isbn}
                </p>
                <input
                  onChange={(e) => isbn.setInput(e.target.value)}
                  value={isbn.value}
                  className={`bg-blue-50 px-3 py-2 rounded-md outline-none  text-black mb-4 w-full ${showEditComp}`}
                />

                <ol className={`my-5 ${hideEditComp}`}>
                  Author:
                  {publication?.staff.split('\n').map((staffName: string) => (
                    <li className=' text-sm text-gray-900 dark:text-gray-400 text-center font-normal my-0'>
                      {staffName}
                    </li>
                  ))}
                </ol>
                <textarea
                  onChange={(e) => staff.setInput(e.target.value)}
                  value={staff.value}
                  className={`bg-blue-50 px-3 py-2 rounded-md outline-none  text-black mb-4 w-full ${showEditComp}`}
                />

                <p
                  className={`mb-5 text-sm text-gray-900 dark:text-gray-400 text-center font-normal ${hideEditComp}`}
                >
                  {publication?.year}
                </p>

                <select
                  onChange={year.onChange}
                  value={year.value}
                  required
                  className={`bg-blue-50 px-3 py-2 rounded-md outline-none  text-black mb-4 w-full ${showEditComp}`}
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
                <section
                  className={`mt-5 flex  w-[200px] items-center cursor-pointer 
              text-slate-400 hover:text-blue-500  ${showEditComp}`}
                  onClick={toggleDropFile}
                >
                  <div className='p-5 rounded-md bg-blue-50 '>
                    <i className='fa-solid fa-file-pdf fa-2xl'></i>
                  </div>
                  <p className='ml-5 text-sm'>Upload File</p>
                </section>

                <div
                  className={`flex items-center mr-3 justify-center w-full ${hideEditComp}`}
                >
                  <button className='focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-blue-500 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm'>
                    <a
                      href={`${imgUrl}${publication?.pdf_url}`}
                      target='_blank'
                    >
                      View Details
                    </a>
                  </button>
                </div>

                <section>
                  <button
                    className={`hover:bg-black mr-5 text-black px-4 py-2 rounded-lg hover:text-white ${showEditComp}`}
                    onClick={toggleEditMode}
                  >
                    Cancel
                  </button>
                  <button
                    className={`bg-blue-500 px-4 py-2 rounded-lg text-white ${showEditComp}`}
                    onClick={updateCurrentPublication}
                  >
                    Save
                  </button>
                </section>

                <div
                  className='cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-500 transition duration-150 ease-in-out'
                  onClick={() => props.setShow(!props.show)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    aria-label='Close'
                    className='icon icon-tabler icon-tabler-x'
                    width={20}
                    height={20}
                    viewBox='0 0 24 24'
                    strokeWidth='2.5'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' />
                    <line x1={18} y1={6} x2={6} y2={18} />
                    <line x1={6} y1={6} x2={18} y2={18} />
                  </svg>
                </div>
                <div className='cursor-pointer absolute top-0 left-3 mt-4 mr-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-500 transition duration-150 ease-in-out'>
                  <section className='fixed w-10'>
                    {user ? (
                      <More
                        isShowing={isShowing}
                        toggle={toggle}
                        deleteItem={deletePublication}
                      />
                    ) : null}

                    <DropZoneFile
                      isShowing={showDropFile}
                      hide={toggleDropFile}
                      fileDrop={fileDropPDF}
                      fileSize={fileSize}
                      files={filePDF}
                      content={'Drop Publication Detail'}
                      removeFile={removeFilePDF}
                    />
                  </section>
                  <Toast status='error' message={message} ref={toastRef} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Modal2;
