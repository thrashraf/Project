import React, { useEffect, useRef, useState } from 'react';
import ModalContainer from '../../components/ModalContainer';
import Dropzone from '../../components/Dropzone';
import useInput from '../../hooks/useInput';
import useModal from '../../hooks/useModal';
import Toast from '../../components/Toast';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addNewActivities } from '../../features/activities/Activities';
import { userSelector } from '../../features/user/User';
import { unitArray } from '../../constant/unitArray';
import { organizerArray } from '../../constant/organizerArray';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';

type Props = {
  isShowing: boolean;
  toggle: any;
};

const AddEvent = (props: Props) => {
  const dispatch = useAppDispatch();

  const { user }: any = useAppSelector(userSelector);

  const title = useInput('');
  const startEvent = useInput('');
  const endEvent = useInput('');
  const organizer = useInput('');
  const venue = useInput('');
  const selectOrganizer = useInput('');
  const selectVenue = useInput('');

  const isFetching = useInput(false);

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
      setMessage('only accept JPEG, JPG & PNG');
      setStatus('error');
      toastRef.current.showToast();
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

  const formHandler = (e: any) => {
    if (!organizer.value || !venue.value) {
      toastRef.current.showToast();
      setMessage('Please insert all the field!');
      e.preventDefault();
      return;
    }

    if (organizer.value === 'Others' && selectOrganizer.value.length <= 0) {
      toastRef.current.showToast();
      setMessage('Please select organizer!');
      e.preventDefault();
      return;
    }

    if (venue.value === 'Others' && selectVenue.value.length <= 0) {
      toastRef.current.showToast();
      setMessage('Please select venue!');
      e.preventDefault();
      return;
    }

    if (
      new Date(startEvent.value) < new Date() ||
      new Date(endEvent.value) < new Date()
    ) {
      toastRef.current.showToast();
      setMessage('Cannot create past date event ');
      e.preventDefault();
      return;
    }

    if (new Date(endEvent.value) < new Date(startEvent.value)) {
      setMessage('End date should be greater than start date');
      toastRef.current.showToast();
      e.preventDefault();
      return;
    }

    e.preventDefault();

    isFetching.setInput(true);

    const formData = new FormData();

    formData.append('title', title.value);
    formData.append('start', startEvent.value);
    formData.append('end', endEvent.value);
    formData.append(
      'venue',
      venue.value !== 'Others' ? venue.value : selectVenue.value
    );
    formData.append(
      'organizer',
      organizer.value !== 'Others' ? organizer.value : selectOrganizer.value
    );
    formData.append('username', user?.name);
    formData.append('email', user?.email);
    formData.append('userId', user?.id);
    file.forEach((image: any) => formData.append('upload', image));
    e.preventDefault();

    axiosInstance
      .post(`/activities/createActivities`, formData, {
        withCredentials: true,
      })
      .then((res: any) => {
        if (res.status === 200) {
          const newActivities = {
            id: res.data.id,
            title: title.value,
            start: new Date(startEvent.value),
            end: new Date(endEvent.value),
            organizer:
              organizer.value !== 'Others'
                ? organizer.value
                : selectOrganizer.value,
            venue: venue.value !== 'Others' ? venue.value : selectVenue.value,
            banner: res.data.image_url,
            userId: user.id,
          };

          isFetching.setInput(false);

          title.setInput('');
          startEvent.setInput('');
          endEvent.setInput('');
          organizer.setInput('');
          venue.setInput('');
          selectOrganizer.setInput('');
          selectVenue.setInput('');

          setFile([]);

          dispatch(addNewActivities(newActivities));
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
      {isFetching.value && <Spinner />}
      <div className='relative mx-auto top-20 bg-white max-w-lg rounded-lg shadow z-20 '>
        <form
          className='flex flex-col px-5 py-3'
          onSubmit={(e) => formHandler(e)}
        >
          <section className='my-5'>
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
          <div className='grid grid-cols-2 gap-5'>
            <section className=''>
              <p className='my-1 text-sm text-gray-400 ml-1'>
                Start Date
                <span className='text-red-500'>*</span>
              </p>
              <input
                type='date'
                value={startEvent.value}
                required
                onChange={startEvent.onChange}
                className='bg-blue-50 px-3 py-2 rounded-lg outline-none w-full'
              />
            </section>
            <section className=''>
              <p className='my-1 text-smactivitiesSlice text-gray-400 ml-1'>
                End Date
                <span className='text-red-500'>*</span>
              </p>
              <input
                type='date'
                value={endEvent.value}
                required
                onChange={endEvent.onChange}
                className='bg-blue-50 px-3 py-2 rounded-lg outline-none w-full'
              />
            </section>
            <section className=''>
              <p className='my-1 text-sm text-gray-400 ml-1'>
                Organizer
                <span className='text-red-500'>*</span>
              </p>

              <select
                className='bg-blue-50 px-3 py-2 rounded-lg outline-none w-full'
                onChange={organizer.onChange}
                value={organizer.value}
              >
                {unitArray?.map((item: any, index: number) => (
                  <option key={index}>{item}</option>
                ))}
              </select>
            </section>
            <section className=''>
              <p className='my-1 text-sm text-gray-400 ml-1'>
                Venue
                <span className='text-red-500'>*</span>
              </p>
              <select
                className='bg-blue-50 px-3 py-2 rounded-lg outline-none w-full'
                onChange={venue.onChange}
                value={venue.value}
              >
                {organizerArray?.map((item: any, index: number) => (
                  <option key={index}>{item}</option>
                ))}
              </select>
            </section>
            <section
              className={`${
                organizer.value === 'Others' ? 'visible' : 'hidden'
              }`}
            >
              <p className='my-1 text-sm text-gray-400 ml-1'>
                Others Organizer
                <span className='text-red-500'>*</span>
              </p>
              <input
                type='text'
                value={selectOrganizer.value}
                onChange={selectOrganizer.onChange}
                className='bg-blue-50 px-3 py-2 rounded-lg outline-none w-full'
              />
            </section>
            <section
              className={`${venue.value === 'Others' ? 'visible' : 'hidden'}`}
            >
              <p className='my-1 text-sm text-gray-400 ml-1'>
                Others Venue
                <span className='text-red-500'>*</span>
              </p>
              <input
                type='text'
                value={selectVenue.value}
                onChange={selectVenue.onChange}
                className='bg-blue-50 px-3 py-2 rounded-lg outline-none w-full'
              />
            </section>
          </div>

          <section className='my-5'>
            <section
              className='mt-5 flex  w-[200px] items-center cursor-pointer 
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
              Create
            </button>
          </section>
          <Dropzone
            isShowing={isShowing}
            hide={toggle}
            fileDrop={addFile}
            files={file}
            removeFile={deleteFile}
          />
        </form>
        <Toast ref={toastRef} status={status} message={message} />
      </div>
    </ModalContainer>
  );
};

export default AddEvent;
