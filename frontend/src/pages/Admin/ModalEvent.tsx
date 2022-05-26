import React, { useEffect, useRef, useState } from 'react';
import ModalContainer from '../../components/ModalContainer';
import Dropzone from '../../components/Dropzone';
import useInput from '../../hooks/useInput';
import useModal from '../../hooks/useModal';
import Toast from '../../components/Toast';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addNewActivities,
  editActivitiesHandler,
} from '../../features/activities/Activities';
import { userSelector } from '../../features/user/User';
import { unitArray } from '../../constant/unitArray';
import api from '../../utils/api';
import { organizerArray } from '../../constant/organizerArray';

type Props = {
  isShowing: boolean;
  toggle: any;
  activities: any;
  mode: string;
};

const AddEvent = (props: Props) => {
  const dispatch = useAppDispatch();

  const title = useInput('');
  const startEvent = useInput('');
  const endEvent = useInput('');
  const organizer = useInput('');
  const venue = useInput('');
  const selectOrganizer = useInput('');
  const selectVenue = useInput('');

  //for toast
  const [status, setStatus] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const toastRef = useRef<any>(null);

  const createActivities = (e: any) => {
    if (organizer.value === 'select' || organizer.value === '') {
      toastRef.current.showToast();
      setMessage('Please select organizer!');
      e.preventDefault();
      return;
    }

    if (organizer.value === 'select' || venue.value === 'select') {
      toastRef.current.showToast();
      setMessage('Please insert all the field!');
      e.preventDefault();
      return;
    }

    if (organizer.value === 'select') {
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
    e.preventDefault();

    api
      .post('/api/activities/createActivities', formData)
      .then((res: any) => {
        console.log(res);
        if (res.status === 200) {
          const newActivities = {
            id: res.data.id,
            title: title.value,
            start: startEvent.value,
            end: endEvent.value,
            organizer:
              organizer.value !== 'Others'
                ? organizer.value
                : selectOrganizer.value,
            venue: venue.value !== 'Others' ? venue.value : selectVenue.value,
          };

          dispatch(addNewActivities(newActivities));
          props.toggle();
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const updateCurrentActivities = (e: any) => {
    if (organizer.value === 'select' || organizer.value === '') {
      toastRef.current.showToast();
      setMessage('Please select organizer!');
      e.preventDefault();
      return;
    }

    if (organizer.value === 'select' || venue.value === 'select') {
      toastRef.current.showToast();
      setMessage('Please insert all the field!');
      e.preventDefault();
      return;
    }

    if (organizer.value === 'select') {
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

    const formData = new FormData();
    e.preventDefault();
    formData.append('title', title.value);
    formData.append('start', startEvent.value);
    formData.append('venue', venue.value);
    formData.append('organizer', organizer.value);

    api
      .post(
        `/api/activities/updateActivities?q=${props.activities.id}`,
        formData
      )
      .then((res: any) => {
        if (res.status === 200) {
          console.log('ok');

          const newActivities = {
            id: props.activities.id,
            title: title.value,
            start: startEvent.value,
            end: startEvent.value,
            organizer: organizer.value,
            venue: venue.value,
          };

          dispatch(editActivitiesHandler(newActivities));
          props.toggle();
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!props.activities) return;
    if (props.mode === 'add') {
      title.setInput('');
      startEvent.setInput('');
      endEvent.setInput('');
      organizer.setInput('');
      venue.setInput('');
    } else {
      title.setInput(props.activities.title);
      startEvent.setInput(props.activities.start);
      endEvent.setInput(props.activities.end);
      organizer.setInput(props.activities.organizer);
      venue.setInput(props.activities.venue);
    }
  }, [props.mode, props.activities]);

  return (
    <ModalContainer isShowing={props.isShowing} toggle={props.toggle}>
      <Toast status='error' message={message} ref={toastRef} />
      <div className='relative mx-auto bg-white max-w-lg rounded-lg shadow z-50 '>
        <form
          className='flex flex-col px-5 py-3'
          onSubmit={
            props.mode === 'add'
              ? (e) => createActivities(e)
              : (e) => updateCurrentActivities(e)
          }
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
                {unitArray?.map((item: any) => (
                  <option>{item}</option>
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

          <section className=' flex justify-end my-5 mt-10'>
            <button
              className='flex hover:bg-black hover:text-white px-3 py-2  rounded-lg mr-5'
              onClick={props.toggle}
            >
              Cancel
            </button>
            <button className='flex bg-blue-500 px-3 py-2 text-white rounded-lg'>
              {props.mode === 'add' ? 'Create' : 'Update'}
            </button>
          </section>
        </form>
        <Toast ref={toastRef} status={status} message={message} />
      </div>
    </ModalContainer>
  );
};

export default AddEvent;
