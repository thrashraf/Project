import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { userSelector } from '../../features/user/User';

type Props = {
  title: string;
  content: string;
  name: string;
  organizer: string;
  date: string;
  venue: string;
  position: string;
  signature: string;
};

export const Preview = (props: Props) => {
  const { user }: any = useAppSelector(userSelector);

  return (
    <div className='my-2/5 h-[800px] w-[500px] text-[12px] font-serif m-auto  bg-white rounded-sm p-10 flex flex-col relative'>
      <img
        src='/assets/logoPoli.png'
        alt='psmza'
        className='w-[150px] mx-auto'
      />

      <div className='mt-5'>
        <section className='uppercase font-bold text-center'>
          <h1>LAPORAN {props.title}</h1>
          <h1>JABATAN TEKNOLOGI MAKLUMAT DAN KOMUNIKASI</h1>
          <h1>POLITEKNIK SULTAN MIZAN ZAINAL ABIDIN, DUNGUN TERENGGANU</h1>
        </section>

        <section className='mt-10 font-Arimo font-normal '>
          <h1 className='font-bold '>BUTIRAN PROGRAM</h1>
          <ol className=' list-[lower-alpha] ml-5 list-outside'>
            <li className='my-2'>Nama Program: {props.title}</li>
            <li className='my-2'>Penganjur: {props.organizer}</li>
            <li className='my-2'>
              Tarikh: {props.date?.split('-').reverse().join('/')}
            </li>
            <li className='my-2'>Tempat: {props.venue}</li>
          </ol>
        </section>

        <section className='mt-10'>
          <h1 className='font-bold'>PENGISIAN/PERLAKSANAAN PROGRAM</h1>
          {props.content
            ?.slice(0, 2100)
            .split('\n')
            .map((text, index) => {
              return (
                <p
                  key={index}
                  className=' indent-8 font-Arimo font-normal mt-2.5 text-justify leading-[10px]'
                >
                  {text}
                </p>
              );
            })}
        </section>

        <div className='w-full flex justify-between'>
          <section
            className={` ${
              props.content?.length > 2051 ? 'hidden' : null
            } absolute bottom-5 font-Arimo font-normal`}
          >
            <p>Disediakan oleh: </p>
            <div className=' border-b-2 border-dotted border-black w-[80px] mt-2 h-[30px]'>
              <img
                src={props.signature && `/assets/${props.signature}`}
                alt='signature'
                className='object-cover h-[50px] mx-auto'
              />
            </div>
            <section className='text-[8px]'>
              <p>({user?.name})</p>
              <p>({props.position})</p>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
};
