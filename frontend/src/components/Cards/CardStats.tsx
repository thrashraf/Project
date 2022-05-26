import React from 'react';
import PropTypes from 'prop-types';

export default function CardStats({
  statSubtitle,
  statTitle,
  statArrow,
  statPercentColor,
  statDescripiron,
  statIconName,
  statIconColor,
  kpi,
}: any) {
  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg'>
        <div className='flex-auto p-4'>
          <div className='flex flex-wrap'>
            <div className='relative w-full pr-4 max-w-full flex-grow flex-1'>
              <h5 className='text-blueGray-400 uppercase font-bold text-lg'>
                {statSubtitle}
              </h5>
              <section className=''>
                <span className='font-semibold text-2xl text-blueGray-700'>
                  {statTitle}
                </span>

                <span className='text-lg text-slate-400 ml-2'>{kpi}</span>
              </section>
            </div>
            <div className='relative w-auto pl-4 flex-initial'>
              <div
                className={
                  'text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ' +
                  statIconColor
                }
              >
                <i className={statIconName}></i>
              </div>
            </div>
          </div>
          <p className='text-sm text-blueGray-400 mt-4'>
            <span className={statPercentColor + ' mr-2'}>
              <i
                className={
                  statArrow === 'up'
                    ? 'fas fa-arrow-up'
                    : statArrow === 'down'
                    ? 'fas fa-arrow-down'
                    : ''
                }
              ></i>{' '}
            </span>
            <span className='whitespace-nowrap'>{statDescripiron}</span>
          </p>
        </div>
      </div>
    </>
  );
}

CardStats.defaultProps = {
  statSubtitle: 'Traffic',
  statTitle: '350,897',
  statIconColor: 'bg-red-500',
};

CardStats.propTypes = {
  statSubtitle: PropTypes.string,
  statTitle: PropTypes.string,
  statArrow: PropTypes.oneOf(['up', 'down']),
  statPercent: PropTypes.string,
  // can be any of the text color utilities
  // from tailwindcss
  statPercentColor: PropTypes.string,
  statDescripiron: PropTypes.string,
  statIconName: PropTypes.string,
  // can be any of the background color utilities
  // from tailwindcss
  statIconColor: PropTypes.string,
  kpi: PropTypes.string,
};
