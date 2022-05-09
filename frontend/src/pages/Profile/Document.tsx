import React, { useState } from 'react';

export const Document = () => {
  const [tabs, setTabs] = useState<number>(0);

  return (
    <div className='flex justify-around mt-5'>
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
  );
};
