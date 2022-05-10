import { Route, Routes } from 'react-router-dom';
import Middleware from '../../middleware/Middleware';
import { Information } from './Information';
import { PersonalSideBar } from './PersonalSideBar';
import { Privacy } from './Privacy';
import { Settings } from './Settings';
import { Document } from './Document';
import Navbar from '../../components/Navbar';

type Props = {};

export const Profile = (props: Props) => {
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mt-24 lg:grid grid-cols-6 gap-10 px-10 m-auto'>
        <section className='col-span-2 hidden lg:block fixed'>
          <PersonalSideBar />
        </section>

        <section className='col-span-4 w-full relative left-80'>
          <Routes>
            <Route element={<Middleware />}>
              <Route index element={<Information />} />
              <Route path='documents' element={<Document />} />
              <Route path='account' element={<Information />} />
              <Route path='privacy' element={<Privacy />} />
              <Route path='setting' element={<Settings />} />
            </Route>
          </Routes>
        </section>
      </div>
    </div>
  );
};
