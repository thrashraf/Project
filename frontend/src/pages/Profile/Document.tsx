import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

export const Document = () => {
  const [tabs, setTabs] = useState<number>(0);
  const [document, setDocument] = useState<any>();

  useEffect(() => {
    api
      .get('/api/report/getAllReport')
      .then((res) => {
        setDocument(res.data.reports);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className='flex justify-between mt-5'>
        {[
          '/assets/file.png',
          '/assets/file_check.png',
          '/assets/file_declined.png',
        ].map((item: any, index: number) => (
          <section
            key={index}
            className={`bg-slate-100 rounded-lg w-[100px] h-[100px] flex justify-center items-center cursor-pointer ${
              tabs === index && 'bg-blue-200 text-blue-600'
            }`}
            onClick={() => setTabs(index)}
          >
            <img src={item} className='w-[50px] h-[50px]' />
          </section>
        ))}
      </div>

      <div className='flex flex-col mt-5'>
        <div className='rounded-t-lg bg-white mt-5'>
          <div className='rounded-t px-4 py-3 border-0 mb-5'>
            <div className='flex flex-wrap items-center'>
              <div className='relative w-full px-4 max-w-full flex-grow flex-1'>
                <h3 className={'font-semibold text-xl '}>
                  {tabs === 0
                    ? 'Pending'
                    : tabs === 1
                    ? 'Verified'
                    : 'Declined'}
                </h3>
              </div>
            </div>
          </div>
          <table className='items-center w-full bg-transparent border-collapse text-center '>
            <thead>
              <tr>
                {['Title', 'Date', 'Status', 'Venue'].map((item: any) => (
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    }
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='shadow-md '>
              {document
                ? document.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        <span className='font-bold uppercase text-blue-500 hover:underline cursor-pointer'>
                          {item.program_name}
                        </span>
                      </td>
                      {/* <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {item.start.split('-').reverse().join('/')}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {item.organizer}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {item.venue}
                      </td> */}
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
