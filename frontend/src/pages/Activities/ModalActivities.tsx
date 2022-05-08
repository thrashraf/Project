import ModalUser from '../../components/ModalUser';
import More from '../../components/More';
import useEditMode from '../../hooks/useEditMode';
import useModal from '../../hooks/useModal';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  activitiesSelector,
  editModeHandler,
  editActivitiesHandler,
  updateActivities,
} from '../../features/activities/Activities';
import Spinner from '../../components/Spinner/Spinner';
import useInput from '../../hooks/useInput';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

type Props = {
  showActivity: boolean;
  setShowActivity: any;
};

export const ModalActivities = (props: Props) => {
  //for nav drop
  const { isShowing, toggle } = useModal();

  const dispatch = useDispatch();

  const { detailActivities, isFetching, editMode, isSuccess } =
    useAppSelector(activitiesSelector);

  const title = useInput('');
  const start = useInput('');
  const venue = useInput('');
  const organizer = useInput('');

  const [images, setImages] = useState<any>([]);
  const [id, setId] = useState<string>('');

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
    setImages(JSON.parse(detailActivities.img_url).map((item: any) => item));
    setId(detailActivities.id);
  }, [detailActivities, editMode]);

  const updateCurrentActivities = () => {
    const newActivities = {
      title: title.value,
      start: start.value,
      organizer: organizer.value,
      venue: venue.value,
      images: JSON.stringify(images),
      id,
    };

    dispatch(updateActivities(newActivities));
    isSuccess && dispatch(editActivitiesHandler(newActivities));
  };

  return (
    <ModalUser modal={props.showActivity} setModal={props.setShowActivity}>
      {console.log(detailActivities)}
      {detailActivities && (
        <div className='relative mx-auto bg-white max-w-md rounded-lg shadow z-50 '>
          {/* show when delete and update events */}
          {isFetching && <Spinner />}
          {/* show when delete and update events */}

          <div className='flex flex-col'>
            <section className='relative'>
              <More
                isShowing={isShowing}
                toggle={toggle}
                title={detailActivities.title}
                modal={props.showActivity}
                toggleModal={props.setShowActivity}
              />
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
              <img
                src={
                  JSON.parse(detailActivities.img_url).length > 0
                    ? detailActivities.img_url
                    : '/assets/default-placeholder.jpg'
                }
                alt={detailActivities.title}
                className='rounded-t-lg h-[200px] w-full object-cover'
              />

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
                  <section className='flex justify-between items-center mt-3 h-10'>
                    <span
                      className={`bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ${hideEditComp}`}
                    >
                      {detailActivities.organizer}
                    </span>
                    <input
                      type='text'
                      value={organizer.value}
                      onChange={(e) => organizer.setInput(e.target.value)}
                      className={`bg-blue-50 px-3 py-2 rounded-md outline-none w-[150px] text-black ${showEditComp}`}
                    />
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
