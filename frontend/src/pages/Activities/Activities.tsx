import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';
import { SideCard } from './SideCard';
import { Header } from './Header';
import { List } from './List';
import { ModalActivities } from './ModalActivities';
import useModal from '../../hooks/useModal';
import AddEvent from './AddEvent';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  activitiesSelector,
  getActivities,
  getMonthActivities,
  viewDetailActivities,
  dropdownActivities,
} from '../../features/activities/Activities';

const Activities = () => {
  const dispatch = useAppDispatch();

  const { activities, activitiesMonth, query, view } =
    useAppSelector(activitiesSelector);

  //for activities and filter for list
  // const [activities, setActivities] = useState<any>(null);
  //for view
  //const [view, setView] = useState<string>("calendar");
  //for modal
  const [showActivity, setShowActivity] = useState<boolean>(false);
  //for query
  // const [query, setQuery] = useState<string>("");
  //for sideCard
  // const [activitiesMonth, setActivitiesMonth] = useState<any>(null);
  //for show filter data
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<any>([]);
  //for modal
  // const [detailActivities, setDetailActivities] = useState<any>(null);

  //for filter activity by draft or done;
  const [filterBy, setFilterBy] = useState<string>('all');

  //for add event modal
  const { isShowing: isAddEvent, toggle: toggleAdd } = useModal();

  const localizer = momentLocalizer(moment);

  useEffect(() => {
    dispatch(getActivities(query));
  }, [filterData, query]);

  useEffect(() => {
    dispatch(getMonthActivities());
  }, []);

  const detailActivities = (event: any) => {
    dispatch(viewDetailActivities(event));
    setShowActivity(!showActivity);
  };

  useEffect(() => {
    if (!activities) return;

    if (filterBy === 'All') {
      dispatch(dropdownActivities(activitiesMonth));
    } else if (filterBy === 'Draft activities') {
      const filterActivity = activitiesMonth.filter(
        (item: any) => (new Date(item.end) as any) > new Date()
      );
      dispatch(dropdownActivities(filterActivity));
    } else if (filterBy === 'Report activities') {
      const filterActivity = activitiesMonth.filter(
        (item: any) => (new Date(item.end) as any) < new Date()
      );
      dispatch(dropdownActivities(filterActivity));
    } else {
      const filterActivity = activitiesMonth.filter(
        (item: any) => (new Date(item.end).getFullYear() as any) === filterBy
      );
      dispatch(dropdownActivities(filterActivity));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterBy]);

  return (
    <div className='h-full bg-slate-50'>
      <Navbar />

      <section className='h-[400px] absolute inset-0 bg-lightBlue-600' />

      <ModalActivities
        showActivity={showActivity}
        setShowActivity={setShowActivity}
      />

      <AddEvent isShowing={isAddEvent} toggle={toggleAdd} />

      <div className='mt-28 px-5 lg:grid grid-cols-3 gap-16 max-w-[1500px] m-auto relative'>
        <SideCard activities={activitiesMonth} />

        <section className=' col-span-2'>
          {activities && (
            <div>
              <Header toggleAdd={toggleAdd} />

              {view === 'calendar' ? (
                <div className='mt-10'>
                  <Calendar
                    localizer={localizer}
                    events={activities}
                    startAccessor='start'
                    endAccessor='end'
                    onSelectEvent={(e) => detailActivities(e)}
                    style={{
                      height: 550,
                      border: '1px solid #ccc',
                      borderRadius: '10px',
                      padding: '20px',
                      backgroundColor: '#fff',
                    }}
                    eventPropGetter={(event) => ({
                      style: {
                        backgroundColor: '#3b82f6',
                        fontSize: '14px',
                      },
                    })}
                    views={['month']}
                  />
                </div>
              ) : (
                <List
                  activities={activities}
                  setFilterData={setFilterData}
                  setFilterItem={setFilterBy}
                />
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Activities;
