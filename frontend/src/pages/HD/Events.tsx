import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import DeclineModal from './DeclineModal';
import Toast from '../../components/Toast';
import { PasswordModal } from '../Report/PasswordModal';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
// components

import CardTable from '../../components/Cards/CardTable';
import useModal from '../../hooks/useModal';
import { userSelector } from '../../features/user/User';
import api from '../../utils/api';
import useInput from '../../hooks/useInput';
import generateYears from '../../utils/generateYears';
import {
  activitiesSelector,
  dropdownActivities,
  getActivities,
  getMonthActivities,
  handleFilter,
  setFilterHandler,
} from '../../features/activities/Activities';
import Dropdown from '../../components/Dropdown';
import { Header } from '../Activities/Header';
import { List } from '../Activities/List';
import { month } from '../../constant/month';

export default function Events() {
  const { activities, query, filterData, showFilter, activitiesMonth } =
    useAppSelector(activitiesSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getActivities(query));
  }, [query]);

  const years = generateYears();

  const { isShowing: openFilter, toggle: toggleFilter } = useModal();
  const { isShowing: openYear, toggle: toggleYear } = useModal();
  const { isShowing: openMonth, toggle: toggleMonth } = useModal();

  //for modal
  // const [detailActivities, setDetailActivities] = useState<any>(null);

  //for filter activity by draft or done;
  const [filterBy, setFilterBy] = useState<string>('all');
  const [year, setYear] = useState<string>('');
  const [monthFil, setMonth] = useState<string>('');

  const filterActivities = ['All', 'Past Events', 'Upcoming Events'];

  useEffect(() => {
    dispatch(getActivities(query));
  }, [filterData, query]);

  useEffect(() => {
    dispatch(getMonthActivities());
  }, []);

  useEffect(() => {
    if (!activities) return;

    if (filterBy === 'All') {
      dispatch(dropdownActivities(activitiesMonth));
    } else if (filterBy === 'Upcoming Events') {
      const filterActivity = activitiesMonth.filter(
        (item: any) => (new Date(item.end) as any) > new Date()
      );
      console.log(filterActivity);
      dispatch(dropdownActivities(filterActivity));
    } else if (filterBy === 'Events') {
      const filterActivity = activitiesMonth.filter(
        (item: any) => (new Date(item.end) as any) < new Date()
      );
      console.log(filterActivity);
      dispatch(dropdownActivities(filterActivity));
    }

    if (year) {
      const filterActivity = activitiesMonth.filter(
        (item: any) => (new Date(item.end).getFullYear() as any) === year
      );
      dispatch(dropdownActivities(filterActivity));
    }

    if (year === 'Year') {
      setYear('');
    }

    if (monthFil === 'Month') {
      setMonth('');
    }

    //? for year and month
    month.map((item: string) => {
      if (monthFil === item && year) {
        const filterActivity = activitiesMonth.filter(
          (item: any) =>
            month[(new Date(item.end).getMonth() as any) + 1] === monthFil &&
            (new Date(item.end).getFullYear() as any) === year
        );

        console.log(filterActivity);
        dispatch(dropdownActivities(filterActivity));
      }

      //? for draft & report
      if (year && filterBy === 'Upcoming Events') {
        const filterActivity = activitiesMonth.filter(
          (item: any) =>
            (new Date(item.end).getFullYear() as any) === year &&
            (new Date(item.end) as any) > new Date()
        );
        dispatch(dropdownActivities(filterActivity));
      }

      if (year && filterBy === 'Events') {
        const filterActivity = activitiesMonth.filter(
          (item: any) =>
            (new Date(item.end).getFullYear() as any) === year &&
            (new Date(item.end) as any) < new Date()
        );
        dispatch(dropdownActivities(filterActivity));
      }
    });
    console.log(filterBy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterBy, monthFil, year]);

  return (
    <>
      <div className='relative w-full h-[40px] z-[100px]'>
        <Header toggleAdd={false} showView={false} />
      </div>
      <List
        activities={activities}
        setFilterItem={setFilterBy}
        setMonth={setMonth}
        filterBy={filterBy}
        monthFil={monthFil}
        setYear={setYear}
        year={year}
      />
      {/* {' '}
      <section className='flex py-1 z-10 w-full justify-center '>
        <section className=' bg-white rounded-lg z-10'>
          <span className='p-2 ml-3 text-gray-400'>
            <i className='fa-solid fa-magnifying-glass' />
          </span>
          <input
            type='text'
            placeholder='search by Title'
            className='text-lg px-4 py-2 bg-white rounded-t-lg rounded-b-lg  w-[400px] focus:outline-none'
            onChange={(e) => dispatch(handleFilter(e.target.value))}
            value={query}
          />
          {console.log(filterData)}
          {filterData.slice(0, 15).length !== 0 && showFilter && (
            <div className='bg-white absolute top-80 shadow-md no-scrollbar overflow-hidden z-10 h-[200px] w-[450px] bottom-52 rounded-lg px-4 py-2 overflow-y-auto'>
              {filterData?.map((item: any, index: number) => (
                <>
                  {item.title.includes(query.toLowerCase()) && (
                    <p
                      className='p-3 cursor-pointer hover:bg-slate-100'
                      onClick={() => dispatch(setFilterHandler(item.title))}
                      key={index}
                    >
                      {item.title}
                    </p>
                  )}

                  {filterData.slice(0, 1).map((item: any) => (
                    <p
                      className='p-3 cursor-pointer hover:bg-slate-100'
                      onClick={() => dispatch(setFilterHandler(item.organizer))}
                      key={index}
                    >
                      {item.organizer}
                    </p>
                  ))}
                </>
              ))}
            </div>
          )}
          <Dropdown
            isOpen={openFilter}
            setIsOpen={toggleFilter}
            setFilterBy={filterBy.setInput}
            navdropArr={filterActivities}
            filterBy={filterBy.value}
            title='Filter By'
            icon='fa-solid fa-filter mr-3'
          />
          <Dropdown
            isOpen={openYear}
            setIsOpen={toggleYear}
            setFilterBy={setYear.setInput}
            //navdropArr={years}
            filterBy={setYear.value}
            title='Year'
            icon='fa-solid fa-calendar mr-3'
          />

          <Dropdown
            isOpen={openMonth}
            setIsOpen={toggleMonth}
            setFilterBy={month.onChange}
            navdropArr={month}
            filterBy={month.value}
            title='Month'
            icon='fa-solid fa-calendar mr-3'
          />
        </section>
      </section> */}
      {/* <div className='flex flex-wrap mt-4'>
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
                  {activities && activities.length > 0 ? (
                    activities?.map((event: any, index: number) => {
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
      </div> */}
    </>
  );
}
