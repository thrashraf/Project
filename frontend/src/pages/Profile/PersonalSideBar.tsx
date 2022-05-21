import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { userSelector } from '../../features/user/User';

export const PersonalSideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [role, setRole] = useState<string>('');

  const { user }: any = useAppSelector(userSelector);

  useEffect(() => {
    if (!user) return;
    setRole(user.role);
  }, [user]);

  let SidebarArray = [
    {
      name: 'Account',
      description: 'Personal information',
      imgSrc: '/assets/account.png',
      route: '/account',
    },
    {
      name: 'Documents',
      description: 'Personal information',
      imgSrc: '/assets/document.png',
      route: '/documents',
    },
    {
      name: 'Privacy & Security',
      description: 'Password',
      imgSrc: '/assets/security.png',
      route: '/privacy',
    },
  ];

  // if (user && user.role !== 'staff') {
  //   SidebarArray = [
  //     {
  //       name: 'Account',
  //       description: 'Personal information',
  //       imgSrc: '/assets/account.png',
  //       route: '/account',
  //     },
  //     {
  //       name: 'Privacy & Security',
  //       description: 'Password',
  //       imgSrc: '/assets/security.png',
  //       route: '/privacy',
  //     },
  //   ];
  // }

  console.log(user);

  return (
    <div>
      {SidebarArray.filter((item) =>
        role !== 'staff' && role ? item.name !== 'Documents' : item
      ).map((sidebar: any) => (
        <aside
          key={sidebar.name}
          className={`hidden lg:flex my-5  border border-gray-300 rounded-xl px-3 py-3 cursor-pointer ${
            location.pathname === '/profile' + sidebar.route
              ? 'bg-[#eff6ff] border-[1.5px] border-solid border-[#0079fe]'
              : null
          }`}
          onClick={() => navigate(`/profile${sidebar.route}`)}
        >
          {console.log(sidebar)}
          <div className='bg-blue-500 px-3 py-3 rounded-lg mr-5'>
            <img
              src={sidebar.imgSrc}
              alt='profile'
              className='w-[35px] h-[35px] object-cover'
            />
          </div>
          <section>
            <h1>{sidebar.name}</h1>
            <p className='text-[12px] mt-1 text-gray-400'>
              {sidebar.description}
            </p>
          </section>
        </aside>
      ))}
    </div>
  );
};
