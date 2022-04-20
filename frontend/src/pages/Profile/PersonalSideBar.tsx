import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SidebarArray from '../../constant/SidebarArray';

export const PersonalSideBar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  return <div>
    {SidebarArray.map((sidebar) => (
      <aside key={sidebar.name} className={`hidden lg:flex my-5  border border-gray-300 rounded-xl px-3 py-3 cursor-pointer ${location.pathname === '/profile'+ sidebar.route ? 'bg-[#eff6ff] border-[1.5px] border-solid border-[#0079fe]' : null} `} 
      onClick={() => navigate(`/profile${sidebar.route}`)}
      >
        <div className='bg-blue-500 px-3 py-3 rounded-lg mr-5'>
          <img src={sidebar.imgSrc} alt="profile" className='w-[35px] h-[35px] object-cover'/>
        </div>
        <section>
          <h1>{sidebar.name}</h1>
          <p className='text-[12px] mt-1 text-gray-400'>{sidebar.description}</p>
        </section>
      </aside>
    ))}
  </div>;
};
