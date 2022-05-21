import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { activitiesSelector } from '../../features/activities/Activities';
import { userSelector } from '../../features/user/User';

type Props = {
  activities: any;
};

export const SideCard = (props: Props) => {
  const { user }: any = useAppSelector(userSelector);
  const { activitiesMonth }: any = useAppSelector(activitiesSelector);

  return (
    <>
      <div className='max-w-md col-span-1 mb-20'>
        <section>
          <h1 className='font-bold text-xl text-white'>Upcoming Events</h1>
          {/* to get current month */}
          <p className='text-sm  text-white'>
            All events in{' '}
            {new Date().toLocaleString('default', { month: 'long' })}
          </p>
        </section>
        {activitiesMonth
          ?.filter((item: any) => {
            const date = new Date(item.start);
            return date.getMonth() === new Date().getMonth();
          })
          .map((event: any, index: number) => (
            <section
              className='shadow-md mt-10 rounded-lg bg-white'
              key={index}
            >
              <img
                src={
                  event.banner
                    ? `/assets/${event.banner}`
                    : '/assets/default-placeholder.jpg'
                }
                alt={event.title}
                className='rounded-t-lg object-cover h-[100px] w-full'
              />

              <section className='p-4'>
                <section className='flex justify-between items-center text-gray-400 text-sm'>
                  <p>
                    {event.start.slice(0, 10).split('-').reverse().join('/')}
                  </p>
                  <p>{event.venue}</p>
                </section>

                <section className='mt-3'>
                  <h1 className='font-bold'>{event.title}</h1>
                  <section className='flex justify-between items-center mt-3 h-10'>
                    <span className='bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800'>
                      {event.organizer}
                    </span>
                    {new Date().toISOString().slice(0, 10) >= event.end && (
                      <Link to={`/create-report/${event.id}`}>
                        <button
                          className={`items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg focus:outline-none focus:ring-blue-300 ${
                            user ? 'visible' : 'hidden'
                          } `}
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
          ))}
      </div>
    </>
  );
};
