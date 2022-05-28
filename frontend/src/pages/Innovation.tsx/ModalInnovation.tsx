import React, { useEffect, useState } from 'react';
import useInput from '../../hooks/useInput';
import useModal from '../../hooks/useModal';
import More from '../../components/More';
import ModalUser from '../../components/ModalUser';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  activitiesSelector,
  editModeHandler,
  closeEditMode,
} from '../../features/activities/Activities';
import {
  editPublicationHandler,
  deletePublicationHandler,
} from '../../features/Publication/Publication';
import Dropzone from '../../components/Dropzone';
import axiosInstance from '../../utils/axiosInstance';

type Props = {
  show: boolean;
  setShow: any;
  innovation: any;
  role: string;
};

const ModalInnovation = (props: Props) => {
  const [publication, setPublication] = useState<any>(null);

  const { editMode } = useAppSelector(activitiesSelector);
  const dispatch = useAppDispatch();
  const { isShowing, toggle } = useModal();
  const { isShowing: showDropzone, toggle: toggleDropzone } = useModal();

  //? for edit mode
  const showEditComp = editMode ? 'visible' : 'hidden';
  const hideEditComp = editMode ? 'hidden' : 'visible';

  const title = useInput('');
  const Description = useInput('');
  const isbn = useInput('');
  const staff = useInput('');
  const year = useInput('');
  const [file, setFile] = useState<any>([]);

  const toggleEditMode = () => dispatch(editModeHandler());

  //   useEffect(() => {
  //     if (props.publication) {
  //       setPublication(props.publication);

  //       title.setInput(props.publication.Title);
  //       description.setInput(props.publication.Description);
  //       isbn.setInput(props.publication.isbn);
  //       staff.setInput(props.publication.staff);
  //       year.setInput(props.publication.year);
  //     }
  //   }, [props.publication]);

  const closeModal = () => {
    props.setShow(!props.show);
    dispatch(closeEditMode());
  };

  // console.log(file)

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
    //console.log(validTypes.indexOf(file.type) === -1);
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
    formData.append('Description', Description.value);
    formData.append('isbn', isbn.value);
    formData.append('staff', staff.value);
    formData.append('year', year.value);
    file.forEach((image: any) => formData.append('upload', image));

    const id = publication.id;

    axiosInstance
      .post(`/publication/updatePublication?q=${id}`, formData, {
        withCredentials: true,
      })
      .then((res: any) => {
        if (res.status === 200) {
          //console.log('ok');

          const newActivities = {
            id: publication.id,
            Title: title.value,
            Description: Description.value,
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
    axiosInstance
      .post(`/publication/deletePublication?q=${id}`, {
        withCredentials: true,
      })
      .then((res: any) => {
        if (res.status === 200) {
          //console.log('ok');

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
  // console.log(props.innovation)
  return (
    <div>
      <div>
        {props.show && props.innovation && (
          <div
            className='py-12 transition duration-150 ease-in-out z-20 absolute overflow-x-hidden top-0 bottom-0 right-0 left-0 text-center'
            id='modal'
          >
            <div
              className=' bg-opacity-10 bg-black fixed inset-0 '
              onClick={closeModal}
            />
            <div
              role='alert'
              className='container mx-auto w-11/12 md:w-2/3 max-w-lg'
            >
              <div className='  mt-10 left-0 right-0 mx-6 lg:mx-auto lg:max-w-lg max-h-[600px]  overflow-y-auto  break-words py-8 px-8 lg:md:px-16 bg-white fixed z-20  shadow-md rounded-lg border border-gray-400'>
                <div className='w-full flex justify-center text-green-400 mb-4'></div>
                <div>
                  <img
                    src={`/assets/${props.innovation?.img_url}`}
                    className=' rounded-lg mb-10 w-[400px] h-[200px] object-contain'
                  ></img>
                </div>
                <h1
                  className={`${hideEditComp} text-center text-black  font-extrabold tracking-normal leading-tight mb-4`}
                >
                  {props.innovation?.Title}
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
                  {props.innovation?.Description}
                </p>

                <div
                  className={`flex items-center mr-3 justify-center w-full ${hideEditComp}`}
                >
                  <button
                    className={`focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-blue-500 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm ${
                      props.role && props.role === 'hd' ? 'visible' : 'hidden'
                    }`}
                  >
                    <a
                      href={`/assets/${props.innovation?.pdf_url}`}
                      target='_blank'
                    >
                      View Details
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ModalInnovation;
