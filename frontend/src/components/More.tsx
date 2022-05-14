import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  deleteActivitiesHandler,
  deleteActivities,
  editModeHandler,
} from '../features/activities/Activities';
import { activitiesSelector } from '../features/activities/Activities';

const More = ({ isShowing, toggle, toggleModal, modal, id, deleteItem }: any) => {
  const dispatch = useAppDispatch();

  const { isSuccess } = useAppSelector(activitiesSelector);

  const deleteEvents = () => {
    // dispatch(deleteActivities(id));
    deleteItem()
    toggle();
    toggleModal(!modal);

    isSuccess && dispatch(deleteActivitiesHandler(id));
  };

  const edit = () => {
    console.log('lol');
    dispatch(editModeHandler());
  };

  console.log(isShowing)

  return (
    <>
      <button
        className='top-2 left-2 absolute text-black bg-transparent z-10 hover:bg-black hover:text-white  rounded-lg text-sm py-5 px-3 ml-auto inline-flex items-center '
        onClick={toggle}
      >
        <i className='fa-solid fa-ellipsis-vertical fa-xl ' />
      </button>

      {/* navdrop */}
      {isShowing && (
        <section className='bg-white absolute -left-32 w-[120px] z-50'>
          <ul>
            <li
              className='cursor-pointer hover:bg-slate-200 py-1 px-5'
              onClick={edit}
            >
              Edit
            </li>
            <li
              className='cursor-pointer hover:bg-slate-200 py-1 px-5'
              onClick={() => deleteEvents()}
            >
              Delete
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default More;
