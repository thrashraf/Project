import React from 'react';

// components

import CardLineChart from '../../components/Cards/CardLineChart';

export default function Dashboard() {
  return (
    <>
      <div className='flex flex-wrap justify-center'>
        <div className='w-full xl:w-8/12 mb-12 xl:mb-0 px-4'>
          <CardLineChart />
        </div>
      </div>
    </>
  );
}
