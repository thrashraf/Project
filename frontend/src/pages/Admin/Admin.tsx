import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { adminSidebar } from '../../constant/adminSidebar';

// components

import AdminNavbar from '../../components/Navbars/AdminNavbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import HeaderStats from '../../components/Headers/HeaderStats';
import FooterAdmin from '../../components/Footers/FooterAdmin';
import Middleware from '../../middleware/Middleware';
// views

import Users from './Users';
import Events from './Events';
import Publication from './Publication';
import Innovation from './Innovation';
import { useAppDispatch } from '../../app/hooks';
import { getKpi } from '../../features/admin/Admin';

export default function KJ() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getKpi());
  }, []);

  return (
    <>
      <Sidebar sidebar={adminSidebar} />
      <div className='relative md:ml-64 bg-blueGray-100 h-full '>
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className='px-4 md:px-10 mx-auto bg-blueGray-100 w-full -m-24'>
          <Routes>
            <Route element={<Middleware />}>
              <Route index element={<Users />} />
              <Route path='users' element={<Users />} />
              <Route path='events' element={<Events />} />
              <Route path='publication' element={<Publication />} />
              <Route path='innovation' element={<Innovation />} />
            </Route>
          </Routes>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
