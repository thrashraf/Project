import React, { useState } from 'react';
import ModalUser from '../../components/ModalUser';
import useInput from '../../hooks/useInput';
import axios from 'axios';
import { addInnovationHandler } from '../../features/Innovation/Innovation';
import { useAppDispatch } from '../../app/hooks';
import Dropzone from '../../components/Dropzone';
import useModal from '../../hooks/useModal';
import url from '../../utils/url';

type Props = {};

const AddInnovation = ({ isShowing, toggle }: any) => {
  const Title = useInput('');
  const Description = useInput('');
  const Name = useInput('');
  const Program = useInput('');
  const Level = useInput('');
  const Medal = useInput('');
  const Year = useInput('');

  // for images
  const [file, setFile] = useState<any>([]);

  const dispatch = useAppDispatch();

  const { isShowing: showDropzone, toggle: toggleDropzone } = useModal();

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

  const formHandler = () => {
    const formData = new FormData();

    formData.append('Title', Title.value);
    formData.append('Description', Description.value);
    formData.append('Name', Name.value);
    formData.append('Program', Program.value);
    formData.append('Level', Level.value);
    formData.append('Medal', Medal.value);
    formData.append('Year', Year.value);
    file?.forEach((image: any) => formData.append('upload', image));

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
        <div className='left-0 right-0 mx-6 lg:mx-auto lg:max-w-lg break-words  py-8 px-8 lg:md:px-16  bg-white  shadow-md rounded-lg border border-gray-400'>
          <button
            type='button'
            onClick={() => toggle()}
            className=' absolute -top-5 -right-10 text-black bg-transparent z-10 hover:bg-black hover:text-white  rounded-lg text-sm p-2 py-4 ml-auto inline-flex items-center'
            data-modal-toggle='authentication-modal'
          >
            <i className='fa-solid fa-xmark fa-lg' />
          </button>
          <section className=''>
            <p className='m-1'>Innovation Title</p>
            <input
              type='text'
              value={Title.value}
              onChange={Title.onChange}
              className='bg-blue-100 py-1 rounded-lg w-full'
            />
          </section>
          <section className='mt-1'>
            <p className='m-1'>Description</p>
            <textarea
              value={Description.value}
              onChange={Description.onChange}
              //onChange={(e) => contentHandler(e)}
              className='bg-blue-100 py-1 rounded-lg w-full'
            />
          </section>

          <section className='mt-1'>
            <p className='m-1'>Name</p>
            <textarea
              value={Name.value}
              onChange={Name.onChange}
              //onChange={(e) => contentHandler(e)}
              className='bg-blue-100 py-1 rounded-lg w-full'
            />
          </section>

          <section className='mt-1'>
            <p className='m-1'>Program</p>
            <input
              type='text'
              value={Program.value}
              onChange={Program.onChange}
              className='bg-blue-100 py-1 rounded-lg w-full'
            />
          </section>
          <section className=''>
            <p className='m-1'>Level</p>
            <input
              type='text'
              value={Level.value}
              onChange={Level.onChange}
              className='bg-blue-100 py-1 rounded-lg w-full'
            />
          </section>

          <section className='mt-1'>
            <p className='m-1'>Medal</p>
            <input
              type='text'
              value={Medal.value}
              onChange={Medal.onChange}
              className='bg-blue-100 py-1 rounded-lg w-full'
            />
          </section>
          <section className='mt-1'>
            <p className='m-1'>Year</p>
            <input
              type='number'
              value={Year.value}
              onChange={Year.onChange}
              className='bg-blue-100 py-1 rounded-lg w-full'
            />
          </section>

          <section className='my-5'>
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
          </section>

          <Dropzone
            isShowing={showDropzone}
            hide={toggleDropzone}
            fileDrop={fileDrop}
            fileSize={fileSize}
            files={file}
            removeFile={removeFile}
          />

          <div className=' justify-center flex'>
            <button
              className='focus:outline-none transition duration-150 mt-5 ease-in-out hover:bg-indigo-600 bg-blue-500 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm'
              onClick={() => formHandler()}
            >
              CREATE
            </button>
          </div>
        </div>
      </div>
    </ModalUser>
  );
};

export default AddInnovation;
