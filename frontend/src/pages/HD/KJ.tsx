import React from "react";
import { Routes, Route } from "react-router-dom";

// components

import AdminNavbar from '../../components/Navbars/AdminNavbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import HeaderStats from '../../components/Headers/HeaderStats';
import FooterAdmin from '../../components/Footers/FooterAdmin';

// views

import Dashboard from './Dashboard';
import Tables from './Tables';

export default function KJ() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tables" element={<Tables />} />
          </Routes>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
