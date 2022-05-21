import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from '../pages/Login/Login';
import Register from '../pages/Register';
import Report from '../pages/Report';
import { Home } from '../pages/Home/Home';
import Admin from '../pages/Admin';
import { useAppDispatch, useAppSelector } from './hooks';
import { useEffect } from 'react';
import { refreshUser, userSelector } from '../features/user/User';
import Middleware from '../middleware/Middleware';
import { Publications } from '../pages/Publication/Publications';
import { Innovation } from '../pages/Innovation.tsx/Innovation';
import KJ from '../pages/HD/KJ';
import VerifyReport from '../pages/HD/VerifyReport';
import { Profile } from '../pages/Profile/Profile';
import Activities from '../pages/Activities/Activities';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=' font-poppins h-full'>
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Home />} />
          <Route path='/publication' element={<Publications />} />
          <Route path='/innovation' element={<Innovation />} />

          {/* protected route */}
          <Route element={<Middleware />}>
            <Route path='/create-report/:id' element={<Report />} />
            <Route path='/admin/*' element={<Admin />} />
            <Route path='/verify-report/:id' element={<VerifyReport />} />
            <Route path='/kj/*' element={<KJ />} />
            <Route path='/profile/*' element={<Profile />} />
            <Route path='/activities' element={<Activities />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
