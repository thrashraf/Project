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

import Tables from './Tables';
import Events from './Events';
import Publication from './Publication';
import { Innovation } from './Innovation';
import useModal from '../../hooks/useModal';
import KpiModal from './KpiModal';
import Dashboard from './Dashboard';

export default function KJ() {
  const { isShowing, toggle } = useModal();

  return (
    <div className='relative'>
      <Sidebar sidebar={hdSidebar} />

      <div
        className='fixed left-7 top-[320px] text-sm z-50 flex w-20 justify-between font-semibold text-blueGray-600 cursor-pointer hover:text-blueGray-500'
        onClick={toggle}
      >
        <i className='fa-solid fa-chart-line'></i>
        <p>ADD KPI </p>
      </div>

      <KpiModal isShowing={isShowing} toggle={toggle} />

      <div className='relative md:ml-64 bg-blueGray-100 h-full '>
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className='px-4 md:px-10 mx-auto bg-blueGray-100 w-full -m-24'>
          <Routes>
            <Route element={<Middleware />}>
              <Route index element={<Dashboard />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='report' element={<Tables />} />
              <Route path='events' element={<Events />} />
              <Route path='publication' element={<Publication />} />
              <Route path='innovation' element={<Innovation />} />
            </Route>
          </Routes>
          <FooterAdmin />
        </div>
      </div>
    </div>
  );
}
