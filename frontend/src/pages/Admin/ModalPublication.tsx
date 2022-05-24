import React, { useEffect, useRef, useState } from 'react';
import ModalContainer from '../../components/ModalContainer';
import Dropzone from '../../components/Dropzone';
import useInput from '../../hooks/useInput';
import useModal from '../../hooks/useModal';
import Toast from '../../components/Toast';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addPublication,
  editPublicationHandler,
} from '../../features/Publication/Publication';
import { userSelector } from '../../features/user/User';
import api from '../../utils/api';
import DropZoneFile from '../../components/DropZoneFile';
import generateYears from '../../utils/generateYears';
import url from '../../utils/url';

type Props = {
  isShowing: boolean;
  toggle: any;
  publication: any;
  mode: string;
};

const ModalPublication = (props: Props) => {
  const dispatch = useAppDispatch();

  const years = generateYears();
  console.log(years);

  const title = useInput('');
  const description = useInput('');
  const isbn = useInput('');
  const staff = useInput('');
  const year = useInput('');

  //for toast
  const [status, setStatus] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const toastRef = useRef<any>(null);

  const [prevImages, setPrevImages] = useState<any>([]);
  const prevPdf = useInput('');

  //dropzone State
  const { isShowing, toggle } = useModal();

  // for images
  const [file, setFile] = useState<any>([]);
  const [validFiles, setValidFiles] = useState<any>([]);

  // for PDF
  const [filePDF, setFilePDF] = useState<any>([]);

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

  console.log(file);

  //for validate file
  const validateFile = (file: any) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    console.log(validTypes.indexOf(file.type) === -1);
    if (validTypes.indexOf(file.type) === -1) {
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

  const createPublication = (e: any) => {
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

    axios
      .post(`${url}/api/publication/createPublication`, formData, {
        withCredentials: true,
      })
      .then((res: any) => {
        if (res.status === 200) {
          const newPublication = {
            Title: title.value,
            Description: description.value,
            isbn: isbn.value,
            staff: staff.value,
            year: year.value,
            img_url: res.data.image_url ? res.data.image_url : null,
            pdf_url: res.data.pdf_url,
          };

          dispatch(addPublication(newPublication));
          props.toggle();
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const updateCurrentPublication = (e: any) => {
    if (validFiles.length == 1) {
      toastRef.current.showToast();
      setMessage('Please upload cover & backpage publication');
      return;
    }

    const formData = new FormData();

    e.preventDefault();

    formData.append('title', title.value);
    formData.append('description', description.value);
    formData.append('isbn', isbn.value);
    formData.append('staff', staff.value);
    formData.append('year', year.value);
    prevImages.forEach((image: any) => formData.append('prevImages', image));
    formData.append('prevPdf', prevPdf.value);
    file.forEach((image: any) => formData.append('upload', image));
    filePDF.forEach((file: any) => formData.append('upload', file));

    const id = props.publication.id;

    axios
      .post(`${url}/api/publication/updatePublication?q=${id}`, formData, {
        withCredentials: true,
      })
      .then((res: any) => {
        if (res.status === 200) {
          console.log('ok');
          const newActivities = {
            id: props.publication.id,
            Title: title.value,
            Description: description.value,
            isbn: isbn.value,
            staff: staff.value,
            year: year.value,
            img_url: res.data.image_url
              ? res.data.image_url
              : props.publication.img_url,
            pdf_url: res.data.pdf_url
              ? res.data.pdf_url
              : props.publication.pdf_url,
          };
          dispatch(editPublicationHandler(newActivities));
          //toggle modal
          props.toggle();
          // //toggle more button
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!props.publication) return;
    if (props.mode === 'add') {
      title.setInput('');
      description.setInput('');
      isbn.setInput('');
      staff.setInput('');
      year.setInput('');
    } else {
      title.setInput(props.publication.Title);
      description.setInput(props.publication.Description);
      isbn.setInput(props.publication.isbn);
      staff.setInput(props.publication.staff);
      year.setInput(props.publication.year);
      setPrevImages([...props.publication.img_url]);
      prevPdf.setInput(props.publication.pdf_url);
    }
  }, [props.mode, props.publication]);

  console.log(props.publication);

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
            props.mode === 'add'
              ? (e) => createPublication(e)
              : (e) => updateCurrentPublication(e)
          }
        >
          <div>
            <section className='my-5 grid grid-cols-2 gap-5'>
              <section>
                <p className='my-1 text-sm text-gray-400 ml-1'>
                  Title
                  <span className='text-red-500'>*</span>
                </p>
                <input
                  type='text'
                  value={title.value}
                  onChange={title.onChange}
                  required
                  className='bg-blue-50 px-3 py-2 rounded-lg outline-none w-full'
                />
              </section>
              <section className=''>
                <p className='my-1 text-smactivitiesSlice text-gray-400 ml-1'>
                  Year
                  <span className='text-red-500'>*</span>
                </p>
                <select
                  onChange={year.onChange}
                  value={year.value}
                  required
                  className='bg-blue-50 px-3 py-2 rounded-lg outline-none w-full'
                >
                  {years?.map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </section>
            </section>
            <section className=''>
              <p className='my-1 text-sm text-gray-400 ml-1'>
                Description
                <span className='text-red-500'>*</span>
              </p>
              <textarea
                value={description.value}
                required
                onChange={description.onChange}
                rows={3}
                className='bg-blue-50 px-3 py-2 rounded-lg outline-none w-full'
              />
            </section>
            <div className='grid grid-cols-2 gap-5'>
              <section className=''>
                <p className='my-1 text-sm text-gray-400 ml-1'>
                  ISBN <span className='text-red-500'>*</span>
                </p>
                <input
                  type='text'
                  value={isbn.value}
                  required
                  onChange={isbn.onChange}
                  className='bg-blue-50 px-3 py-2 rounded-lg outline-none w-full'
                />
              </section>
              <div>
                <section className=''>
                  <p className='my-1 text-sm text-gray-400 ml-1'>
                    Staff<span className='text-red-500'>*</span>
                  </p>

                  <textarea
                    rows={2}
                    value={staff.value}
                    onChange={staff.onChange}
                    required
                    className='bg-blue-50 px-3 py-2 rounded-lg outline-none w-full'
                  />
                </section>
              </div>
              <div>
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
              </div>
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
              isShowing={showDropzone}
              hide={toggleDropzone}
              fileDrop={fileDrop}
              files={validFiles}
              content={
                'Add cover as the first value and backpage as the second value'
              }
              removeFile={removeFile}
            />
            <DropZoneFile
              isShowing={showDropFile}
              hide={toggleDropFile}
              fileDrop={fileDropPDF}
              fileSize={fileSize}
              files={filePDF}
              removeFile={removeFilePDF}
            />
            <Toast ref={toastRef} status={status} message={message} />
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};

export default ModalPublication;
