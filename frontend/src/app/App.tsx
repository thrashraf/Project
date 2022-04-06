import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from '../pages/Login/Login'
import Register from '../pages/Register';
import Report from '../pages/Report';
import { Home } from '../pages/Home/Home';
import Admin from '../pages/Admin';
import { useAppDispatch, useAppSelector } from './hooks';
import { useEffect } from 'react';
import {  refreshUser, userSelector } from '../features/user/User';
import axios from 'axios';

function App() {

  const dispatch = useAppDispatch();
  

  useEffect(() => {
    dispatch(refreshUser())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className=' font-poppins h-full'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create-report' element={<Report />} />
          <Route path='/' element={<Home/>} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
