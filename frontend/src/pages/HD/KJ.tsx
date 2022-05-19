import React from 'react';
import { Routes, Route } from 'react-router-dom';

// components

import AdminNavbar from '../../components/Navbars/AdminNavbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import HeaderStats from '../../components/Headers/HeaderStats';
import FooterAdmin from '../../components/Footers/FooterAdmin';
import Middleware from '../../middleware/Middleware';
import { hdSidebar } from '../../constant/hdSidebar';
// views

import Dashboard from './Dashboard';
import Tables from './Tables';
import Events from './Events';

export default function KJ() {
  return (
    <>
      <Sidebar sidebar={hdSidebar} />
      <div className='relative md:ml-64 bg-blueGray-100 h-full '>
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className='px-4 md:px-10 h-full mx-auto bg-blueGray-100 w-full -m-24'>
          <Routes>
            <Route element={<Middleware />}>
              <Route index element={<Dashboard />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='report' element={<Tables />} />
              <Route path='events' element={<Events />} />
            </Route>
          </Routes>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
