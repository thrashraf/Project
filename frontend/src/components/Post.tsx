import React from 'react';

const Posts = ({ allInno, loading }: any) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className='list-group mb-4'>
      {allInno.map((allInno:any) => (
        <li key={allInno} className='list-group-item'>
          {allInno.title}
        </li>
      ))}
    </ul>
  );
};

