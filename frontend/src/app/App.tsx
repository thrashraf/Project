import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from '../pages/Login/Login'
import Register from '../pages/Register';
import Report from '../pages/Report';
import { Home } from '../pages/Home/Home';
import Admin from '../pages/Admin';
import { useAppDispatch } from './hooks';
import { useEffect } from 'react';
import {  refreshUser } from '../features/user/User';
import Middleware from '../middleware/Middleware';
import { Publication } from '../pages/Publication/Publication'
import { Innovation } from '../pages/Innovation.tsx/Innovation';


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
          {/* public routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Home/>} />
          <Route path='/publication' element={<Publication/>} />
          <Route path='/innovation' element={<Innovation/>} />


          {/* protected route */}
          <Route element={<Middleware />}> 
            <Route path='/create-report' element={<Report />} />
            <Route path='/admin' element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
