import React, { useEffect, useState } from 'react';
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
  const [file, setFile] = useState<any>([]);

  const [imageIndex, setImageIndex] = useState<any>(0);

  const toggleEditMode = () => dispatch(editModeHandler());

  useEffect(() => {
    if (props.publication) {
      setPublication(props.publication);

      title.setInput(props.publication.Title);
      description.setInput(props.publication.Description);
      isbn.setInput(props.publication.isbn);
      staff.setInput(props.publication.staff);
      year.setInput(props.publication.year);
    }
  }, [props.publication]);

  const closeModal = () => {
    props.setShow(!props.show);
    dispatch(closeEditMode());
  };

  console.log(file);

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

  const updateCurrentPublication = () => {
    const formData = new FormData();

    formData.append('title', title.value);
    formData.append('description', description.value);
    formData.append('isbn', isbn.value);
    formData.append('staff', staff.value);
    formData.append('year', year.value);
    file.forEach((image: any) => formData.append('upload', image));

    const id = publication.id;

    axios
      .post(`/api/publication/updatePublication?q=${id}`, formData)
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

    axios
      .post(`/api/publication/deletePublication?q=${id}`)
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
                    src={`/assets/${publication?.img_url[imageIndex]}`}
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
                    isShowing={showDropzone}
                    hide={toggleDropzone}
                    fileDrop={addFile}
                    files={file}
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
                <input
                  type='text'
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
                <input
                  onChange={(e) => year.setInput(e.target.value)}
                  value={year.value}
                  className={`bg-blue-50 px-3 py-2 rounded-md outline-none  text-black mb-4 w-full ${showEditComp}`}
                />

                <div
                  className={`flex items-center mr-3 justify-center w-full ${hideEditComp}`}
                >
                  <button className='focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-blue-500 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm'>
                    <a href={`/assets/${publication?.pdf_url}`} target='_blank'>
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
                    <More
                      isShowing={isShowing}
                      toggle={toggle}
                      deleteItem={deletePublication}
                    />
                  </section>
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
