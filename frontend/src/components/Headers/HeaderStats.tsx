import { AsyncThunkAction } from '@reduxjs/toolkit';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  activitiesSelector,
  getActivities,
} from '../../features/activities/Activities';
import {
  getInnovation,
  innovationSelector,
} from '../../features/Innovation/Innovation';
import {
  getAllPublication,
  publicationSelector,
} from '../../features/Publication/Publication';
import useInput from '../../hooks/useInput';

// components

import CardStats from '../Cards/CardStats';

export default function HeaderStats() {
  const dispatch = useAppDispatch();

  const amount = useInput('');

  useEffect(() => {
    dispatch(getAllPublication());
    dispatch(getActivities(''));
    dispatch(getInnovation(''));
  }, []);

  const { activities } = useAppSelector(activitiesSelector);
  const { allPublication } = useAppSelector(publicationSelector);
  const { allInnovation } = useAppSelector(innovationSelector);

  return (
    <>
      {/* Header */}
      <div className='relative bg-lightBlue-600 md:pt-32 pb-32 pt-12'>
        <div className='px-4 md:px-10 mx-auto w-full'>
          <div>
            {/* Card stats */}
            <div className='flex flex-wrap justify-center'>
              <div className='w-full lg:w-6/12 xl:w-3/12 px-4'>
                <CardStats
                  statSubtitle='Events'
                  statTitle={activities?.length}
                  kpi={'of 10'}
                  statPercentColor='text-emerald-500'
                  statIconName='fa-solid fa-calendar'
                  statIconColor='bg-red-500'
                />
              </div>
              <div className='w-full lg:w-6/12 xl:w-3/12 px-4'>
                <CardStats
                  statSubtitle='Publication'
                  statTitle={allPublication?.length}
                  statPercentColor='text-red-500'
                  statIconName='fa-solid fa-book'
                  statIconColor='bg-orange-500'
                />
              </div>
              <div className='w-full lg:w-6/12 xl:w-3/12 px-4'>
                <CardStats
                  statSubtitle='Innovation'
                  statTitle={allInnovation?.length}
                  statPercentColor='text-orange-500'
                  statIconName='fa-solid fa-lightbulb'
                  statIconColor='bg-pink-500'
                />
              </div>
              {/* <div className='w-full lg:w-6/12 xl:w-3/12 px-4'>
                <CardStats
                  statSubtitle='Users'
                  statTitle={amount?.value}
                  statArrow='up'
                  statPercent='12'
                  statPercentColor='text-emerald-500'
                  statIconName='fas fa-users'
                  statIconColor='bg-lightBlue-500'
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
