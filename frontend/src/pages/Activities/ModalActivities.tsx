import ModalUser from '../../components/ModalUser';
import More from '../../components/More';
import useModal from '../../hooks/useModal';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  activitiesSelector,
  editActivitiesHandler,
  editModeHandler,
  deleteActivities,
  deleteActivitiesHandler,
} from '../../features/activities/Activities';
import Spinner from '../../components/Spinner/Spinner';
import useInput from '../../hooks/useInput';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Dropzone from '../../components/Dropzone';
import axios from 'axios';
import { unitArray } from '../../constant/unitArray';
import { userSelector } from '../../features/user/User';
import { Link } from 'react-router-dom';
import url from '../../utils/url';

type Props = {
  showActivity: boolean;
  setShowActivity: any;
};

export const ModalActivities = (props: Props) => {
  //for nav drop
  const { isShowing, toggle } = useModal();
  const { isShowing: showDropzone, toggle: toggleDropzone } = useModal();

  const dispatch = useDispatch();

  const { detailActivities, editMode, isSuccess } =
    useAppSelector(activitiesSelector);

  const { user }: any = useAppSelector(userSelector);

  const title = useInput('');
  const start = useInput('');
  const venue = useInput('');
  const organizer = useInput('');
  const [id, setId] = useState<string>('');

  let isFetching = false;

  //for show and hide components
  const showEditComp = editMode ? 'visible' : 'hidden';
  const hideEditComp = editMode ? 'hidden' : 'visible';

  const toggleEditMode = () => dispatch(editModeHandler());

  useEffect(() => {
    if (!detailActivities) return;
    console.log(detailActivities);
    title.setInput(detailActivities.title);
    start.setInput(detailActivities.start);
    venue.setInput(detailActivities.venue);
    organizer.setInput(detailActivities.organizer);
    setId(detailActivities.id);
  }, [detailActivities, editMode]);

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
      return false;
    }
    return true;
  };

  //to remove file
  const deleteFile = (name: any) => {
    // find the index of the item
    // update validFiles array
    const selectedFileIndex = file.findIndex((e: any) => e.name === name);
    file.splice(selectedFileIndex, 1);
    // update selectedFiles array
    setFile([...file]);
  };

  const updateCurrentActivities = () => {
    const formData = new FormData();

    formData.append('title', title.value);
    formData.append('start', start.value);
    formData.append('venue', venue.value);
    formData.append('organizer', organizer.value);

    file.forEach((image: any) => formData.append('upload', image));

    isFetching = true;

    axios
      .post(`${url}/api/activities/updateActivities?q=${id}`, formData, {
        withCredentials: true,
      })
      .then((res: any) => {
        if (res.status === 200) {
          console.log('ok');
          isFetching = true;

          const newActivities = {
            id: detailActivities.id,
            title: title.value,
            start: start.value,
            organizer: organizer.value,
            venue: venue.value,
            banner: res.data.image_url
              ? res.data.image_url
              : detailActivities.banner,
          };

          dispatch(editActivitiesHandler(newActivities));
          //toggle modal
          props.setShowActivity(!props.showActivity);
          //toggle more button
          toggle();
          //to clear files
          //dispatch(resetFile());
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const deleteCurrentActivities = () => {
    if (!detailActivities) return;
    dispatch(deleteActivities(detailActivities.id));
    isSuccess && dispatch(deleteActivitiesHandler(detailActivities.id));
    props.setShowActivity(!props.showActivity);
  };

  return (
    <ModalUser modal={props.showActivity} setModal={props.setShowActivity}>
      {detailActivities && (
        <div className='relative mx-auto bg-white max-w-md rounded-lg shadow z-50 '>
          {/* show when delete and update events */}
          {isFetching && <Spinner />}
          {/* show when delete and update events */}
          {console.log(detailActivities.userId, user.id)}
          <div className='flex flex-col'>
            <section className='relative'>
              {detailActivities.userId === user?.id && (
                <More
                  isShowing={isShowing}
                  toggle={toggle}
                  id={detailActivities.id}
                  modal={props.showActivity}
                  toggleModal={props.setShowActivity}
                  deleteItem={() => deleteCurrentActivities()}
                />
              )}
              <button
                type='button'
                onClick={() => props.setShowActivity(!props.showActivity)}
                className=' absolute top-2 right-2 text-black bg-transparent z-10 hover:bg-black hover:text-white  rounded-lg text-sm p-2 py-4 ml-auto inline-flex items-center'
                data-modal-toggle='authentication-modal'
              >
                <i className='fa-solid fa-xmark fa-lg' />
              </button>
            </section>
            <>
              <section className='relative'>
                <img
                  src={
                    detailActivities.banner
                      ? `/uploads/${detailActivities.banner}`
                      : '/assets/default-placeholder.jpg'
                  }
                  alt={detailActivities.title}
                  className='rounded-t-lg h-[200px] w-full object-cover'
                />

                <i
                  onClick={toggleDropzone}
                  className={`fa-solid fa-camera cursor-pointer text-6xl fa-2xl absolute top-[30%] left-[45%] text-gray-300 ${
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
              </section>

              <section className='p-4'>
                <section className='flex justify-between items-center text-gray-400 text-sm'>
                  <p className={hideEditComp}>
                    {detailActivities.start
                      .slice(0, 10)
                      .split('-')
                      .reverse()
                      .join('/')}
                  </p>
                  <input
                    type='date'
                    value={start.value}
                    onChange={(e) => start.setInput(e.target.value)}
                    className={`bg-blue-50 px-3 py-2 rounded-md outline-none w-[150px] text-black ${showEditComp}`}
                  />
                  <p className={hideEditComp}>{detailActivities.venue}</p>
                  <input
                    type='text'
                    onChange={(e) => venue.setInput(e.target.value)}
                    value={venue.value}
                    className={`bg-blue-50 px-3 py-2 rounded-md outline-none w-[150px] text-black ${showEditComp}`}
                  />
                </section>

                <section className='mt-3 flex flex-col'>
                  <h1 className={`font-bold ${hideEditComp}`}>
                    {detailActivities.title}
                  </h1>
                  <input
                    type='text'
                    value={title.value}
                    onChange={(e) => title.setInput(e.target.value)}
                    className={`bg-blue-50 px-3 py-2 rounded-md outline-none w-[full text-black ${showEditComp}`}
                  />
                  <section className='flex justify-between items-center mt-3 h-10 w-full'>
                    <span
                      className={`bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ${hideEditComp}`}
                    >
                      {detailActivities.organizer}
                    </span>

                    <select
                      className={`bg-blue-50 px-3 py-2 rounded-md outline-none w-[150px] text-black ${showEditComp}`}
                      onChange={organizer.onChange}
                      value={organizer.value}
                    >
                      {unitArray?.map((item: any) => (
                        <option>{item}</option>
                      ))}
                    </select>

                    <section>
                      <button
                        className={`hover:bg-black mr-5 text-black px-4 py-2 rounded-lg hover:text-white ${showEditComp}`}
                        onClick={toggleEditMode}
                      >
                        Cancel
                      </button>
                      <button
                        className={`bg-blue-500 px-4 py-2 rounded-lg text-white ${showEditComp}`}
                        onClick={updateCurrentActivities}
                      >
                        Save
                      </button>
                      {new Date().toISOString().slice(0, 10) >=
                        detailActivities.end && (
                        <Link to={`/create-report/${detailActivities.id}`}>
                          <button
                            className={`items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg focus:outline-none focus:ring-blue-300 ${
                              user ? 'visible' : 'hidden'
                            } ${hideEditComp}`}
                          >
                            Create Report
                            <i className='ml-2 fa-solid fa-arrow-right-long' />
                          </button>
                        </Link>
                      )}
                    </section>
                  </section>
                </section>
              </section>
            </>
          </div>
        </div>
      )}
    </ModalUser>
  );
};
