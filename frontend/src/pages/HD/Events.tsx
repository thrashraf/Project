import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import DeclineModal from './DeclineModal';
import Toast from '../../components/Toast';
import { PasswordModal } from '../Report/PasswordModal';
import { useAppSelector } from '../../app/hooks';
// components

import CardTable from '../../components/Cards/CardTable';
import useModal from '../../hooks/useModal';
import { userSelector } from '../../features/user/User';
import api from '../../utils/api';
import useInput from '../../hooks/useInput';

export default function Events() {
  const { user }: any = useAppSelector(userSelector);

  const [events, setEvents] = useState<any>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await axios.get(`/api/activities/getAllActivities?q=${''}`);
      setEvents([...data.data]);
    };
    fetch();
  }, []);

  return (
    <>
      <div className='flex flex-wrap mt-4'>
        <div className='w-full mb-12 px-4'>
          <div
            className={
              'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white'
            }
          >
            <div className='rounded-t mb-0 px-4 py-3 border-0'>
              <div className='flex flex-wrap items-center'>
                <div className='relative w-full px-4 max-w-full flex-grow flex-1'>
                  <h3 className={'font-semibold text-lg text-blueGray-700'}>
                    Events
                  </h3>
                </div>
              </div>
            </div>
            <div className='block w-full overflow-x-auto'>
              {/* Projects table */}
              <table className='items-center w-full bg-transparent border-collapse'>
                <thead>
                  <tr>
                    {['Title', 'Start', 'End', 'Organizer', 'Venue'].map(
                      (item: any) => (
                        <th
                          className={
                            'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center g-blueGray-50 text-blueGray-500 border-blueGray-100'
                          }
                        >
                          {item}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {events && events.length > 0 ? (
                    events?.map((event: any, index: number) => {
                      return (
                        <tr key={index} className='text-center'>
                          <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                            <span className='font-bold uppercase text-blue-500 hover:underline cursor-pointer'>
                              {event.title}
                            </span>
                          </td>
                          <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                            {event.start.split('-').reverse().join('/')}
                          </td>
                          <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                            {event.end.split('-').reverse().join('/')}
                          </td>
                          <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                            <p>{event.organizer}</p>
                          </td>
                          <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                            <p>{event.venue}</p>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr className='text-center flex'>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        <span className='font-bold uppercase text-blue-500 hover:underline cursor-pointer'>
                          No item
                        </span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
