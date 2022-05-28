import { PDFDownloadLink } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { userSelector } from '../../features/user/User';
import api from '../../utils/api';
import axiosInstance from '../../utils/axiosInstance';
import { Template } from '../Report/Template';

export const Document = () => {
  const [tabs, setTabs] = useState<number>(0);
  const [document, setDocument] = useState<any>();
  const [allDocuments, setAllDocuments] = useState<any>();

  const { user }: any = useAppSelector(userSelector);

  useEffect(() => {
    if (!user) return;

    axiosInstance
      .get(`/activities/getReportUser?q=${user.id}`)
      .then((res) => {
        setAllDocuments(res.data);

        const pendingData = res.data.filter(
          (item: any) => item.status === 'pending'
        );
        setDocument(pendingData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  useEffect(() => {
    if (!document) return;

    if (tabs === 0) {
      const filteredDocument = allDocuments.filter(
        (item: any) => item.status === 'pending'
      );
      setDocument(filteredDocument);
    } else if (tabs === 1) {
      const filteredDocument = allDocuments.filter(
        (item: any) => item.status === 'verified'
      );
      setDocument(filteredDocument);
    } else {
      const filteredDocument = allDocuments.filter(
        (item: any) => item.status === 'declined'
      );
      setDocument(filteredDocument);
    }
  }, [tabs]);

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
                {['Title', 'Date', 'Status', 'Submit On', 'Action'].map(
                  (item: any, index) => (
                    <th
                      key={index}
                      className={
                        'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      }
                    >
                      {item}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className='shadow-md '>
              {document
                ? document.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        <span className='font-bold uppercase text-blue-500 hover:underline cursor-pointer'>
                          {item.title}
                        </span>
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {item.start.split('-').reverse().join('/')}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        <i
                          className={`fas fa-circle ${
                            item.status === 'verified'
                              ? 'text-green-500'
                              : item.status === 'pending'
                              ? 'text-orange-500'
                              : 'text-red-500'
                          }  mr-2 `}
                        ></i>{' '}
                        {item.status}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {item.submitOn}
                      </td>
                      <td
                        className={`border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ${
                          tabs === 1 ? 'visible' : 'hidden'
                        }`}
                      >
                        {console.log(item.images)}
                        <button>
                          <PDFDownloadLink
                            document={
                              <Template
                                title={item.title}
                                content={item.content}
                                name={item.title}
                                organizer={item.organizer}
                                date={item.start}
                                venue={item.venue}
                                photo={item.images}
                                tentative={item.tentative}
                                ajk={item.ajk}
                                staffName={item.owner}
                                signature={item.signature}
                                kjSignature={item.kjSignature}
                                kjName={item.kjName}
                              />
                            }
                            fileName={item.title}
                          >
                            {({ blob, url, loading, error }) =>
                              loading ? 'Loading' : 'Download'
                            }
                          </PDFDownloadLink>
                        </button>
                      </td>
                      <td
                        className={`border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ${
                          tabs === 2 ? 'visible' : 'hidden'
                        }`}
                      >
                        <Link to={`/create-report/${item.id}`}>
                          <button className='bg-blue-500 rounded-lg px-5 py-2 text-white'>
                            Resubmit
                          </button>
                        </Link>
                      </td>
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
