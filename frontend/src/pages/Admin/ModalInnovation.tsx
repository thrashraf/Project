import React, { useEffect, useRef, useState } from 'react';
import ModalContainer from '../../components/ModalContainer';
import Dropzone from '../../components/Dropzone';
import useInput from '../../hooks/useInput';
import useModal from '../../hooks/useModal';
import Toast from '../../components/Toast';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addInnovationHandler,
  editInnovationHandler,
} from '../../features/Innovation/Innovation';
import api from '../../utils/api';
import DropZoneFile from '../../components/DropZoneFile';
import generateYears from '../../utils/generateYears';
import { refreshUser } from '../../features/user/User';
import url from '../../utils/url';

type Props = {
  isShowing: boolean;
  toggle: any;
  innovation: any;
  mode: string;
};

const ModalInnovation = (props: Props) => {
  const Title = useInput('');
  const Description = useInput('');
  const Name = useInput('');
  const Program = useInput('');
  const Level = useInput('');
  const Medal = useInput('');
  const Year = useInput('');
  const prevImages = useInput('');
  const prevPdf = useInput('');

  const [status, setStatus] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const toastRef = useRef<any>(null);

  // for images
  const [file, setFile] = useState<any>([]);

  // for PDF
  const [filePDF, setFilePDF] = useState<any>([]);

  const dispatch = useAppDispatch();

  const { isShowing: showDropzone, toggle: toggleDropzone } = useModal();
  const { isShowing: showDropFile, toggle: toggleDropFile } = useModal();

  const years = generateYears();

  //for drop file
  const fileDrop = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        setFile([...files]);
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

  const createInnovation = (e: any) => {
    if (file.length < 1 || filePDF.length < 1) {
      setMessage('Please insert all the field');
      setStatus('error');
      toastRef.current.showToast();
      e.preventDefault();
      return;
    }

    const formData = new FormData();

    if (file.length < 1 || filePDF.length < 1) {
      setMessage('Please insert all the field');
      setStatus('error');
      toastRef.current.showToast();
      e.preventDefault();
      return;
    }

    formData.append('Title', Title.value);
    formData.append('Description', Description.value);
    formData.append('Name', Name.value);
    formData.append('Program', Program.value);
    formData.append('Level', Level.value);
    formData.append('Medal', Medal.value);
    formData.append('Year', Year.value);
    file?.forEach((image: any) => formData.append('upload', image));
    filePDF.forEach((file: any) => formData.append('upload', file));

    axios
      .post(`${url}/api/inno/createInnovation`, formData, {
        withCredentials: true,
      })
      .then((res: any) => {
        if (res.status === 200) {
          const newInnovation = {
            Title: Title.value,
            Description: Description.value,
            Name: Name.value,
            Program: Program.value,
            Level: Level.value,
            Medal: Medal.value,
            Year: Year.value,
            img_url: res.data.img_url,
          };
          console.log(newInnovation);
          dispatch(addInnovationHandler(newInnovation));
          props.toggle();
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const updateCurrentInnovation = (e: any) => {
    const formData = new FormData();

    e.preventDefault();

    formData.append('Title', Title.value);
    formData.append('Description', Description.value);
    formData.append('Name', Name.value);
    formData.append('Program', Program.value);
    formData.append('Level', Level.value);
    formData.append('Medal', Medal.value);
    formData.append('Year', Year.value);
    formData.append('prevImages', prevImages.value);
    formData.append('prevPdf', prevPdf.value);
    file?.forEach((image: any) => formData.append('upload', image));
    filePDF.forEach((file: any) => formData.append('upload', file));

    const id = props.innovation.id;

    axios
      .post(`${url}/api/inno/updateInnovation?q=${id}`, formData, {
        withCredentials: true,
      })
      .then((res: any) => {
        if (res.status === 200) {
          console.log('ok');
          const newInnovation = {
            id: props.innovation.id,
            Title: Title.value,
            Description: Description.value,
            Name: Name.value,
            Program: Program.value,
            Level: Level.value,
            Medal: Medal.value,
            Year: Year.value,
            img_url: res.data.image_url
              ? res.data.image_url
              : props.innovation.img_url,
            pdf_url: res.data.pdf_url
              ? res.data.pdf_url
              : props.innovation.pdf_url,
          };
          setFile([]);
          setFilePDF([]);

          dispatch(editInnovationHandler(newInnovation));
          //toggle modal
          props.toggle();
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!props.innovation) return;
    if (props.mode === 'add') {
      Title.setInput('');
      Description.setInput('');
      Name.setInput('');
      Program.setInput('');
      Level.setInput('');
      Medal.setInput('');
      Year.setInput('');
    } else {
      console.log(props.innovation);
      Title.setInput(props.innovation.Title);
      Description.setInput(props.innovation.Description);
      Name.setInput(props.innovation.Name);
      Program.setInput(props.innovation.Program);
      Level.setInput(props.innovation.Level);
      Medal.setInput(props.innovation.Medal);
      Year.setInput(props.innovation.Year);
      prevImages.setInput(props.innovation.img_url);
      prevPdf.setInput(props.innovation.pdf_url);
    }
  }, [props.mode, props.innovation]);

  return (
    <ModalContainer
      isShowing={props.isShowing}
      toggle={props.toggle}
      hide={props.toggle}
    >
      <div className='relative mx-auto bg-white max-w-lg rounded-lg shadow z-50 p-5'>
        <form
          onSubmit={
            props.mode === 'add'
              ? (e) => createInnovation(e)
              : (e) => updateCurrentInnovation(e)
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
                  value={Title.value}
                  onChange={Title.onChange}
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
                  onChange={Year.onChange}
                  value={Year.value}
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
                value={Description.value}
                required
                onChange={Description.onChange}
                rows={3}
                className='bg-blue-50 px-3 py-2 rounded-lg outline-none w-full'
              />
            </section>
            <div className='grid grid-cols-2 gap-5'>
              <section className=''>
                <p className='my-1 text-sm text-gray-400 ml-1'>
                  Level <span className='text-red-500'>*</span>
                </p>
                <input
                  type='text'
                  value={Level.value}
                  required
                  onChange={Level.onChange}
                  className='bg-blue-50 px-3 py-2 rounded-lg outline-none w-full'
                />
              </section>
              <div>
                <section className=''>
                  <p className='my-1 text-sm text-gray-400 ml-1'>
                    Medal<span className='text-red-500'>*</span>
                  </p>

                  <input
                    type='text'
                    value={Medal.value}
                    required
                    onChange={Medal.onChange}
                    className='bg-blue-50 px-3 py-2 rounded-lg outline-none w-full'
                  />
                </section>
              </div>
              <div>
                <section className=''>
                  <p className='my-1 text-sm text-gray-400 ml-1'>
                    Program<span className='text-red-500'>*</span>
                  </p>

                  <input
                    type='text'
                    value={Program.value}
                    required
                    onChange={Program.onChange}
                    className='bg-blue-50 px-3 py-2 rounded-lg outline-none w-full'
                  />
                </section>
              </div>
              <section className=''>
                <p className='my-1 text-sm text-gray-400 ml-1'>
                  Name<span className='text-red-500'>*</span>
                </p>

                <input
                  type='text'
                  value={Name.value}
                  required
                  onChange={Name.onChange}
                  className='bg-blue-50 px-3 py-2 rounded-lg outline-none w-full'
                />
              </section>
            </div>

            <div className='flex justify-between'>
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
            </div>
            <div className='flex justify-end'>
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
            </div>
            <Dropzone
              isShowing={showDropzone}
              hide={toggleDropzone}
              fileDrop={fileDrop}
              files={file}
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

export default ModalInnovation;
