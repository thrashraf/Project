import { Route, Routes } from 'react-router-dom';
import Middleware from '../../middleware/Middleware';
import { Information } from './Information';
import { PersonalSideBar } from './PersonalSideBar';
import { Privacy } from './Privacy';
import { Document } from './Document';
import Navbar from '../../components/Navbar';
import { useAppSelector } from '../../app/hooks';
import { userSelector } from '../../features/user/User';

type Props = {};

export const Profile = (props: Props) => {
  const { user }: any = useAppSelector(userSelector);

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mt-24 lg:grid grid-cols-6 gap-10 px-10 m-auto'>
        <section className='col-span-2 hidden lg:block lg:fixed'>
          <PersonalSideBar />
        </section>

        <section className='col-span-4 w-full lg:relative lg:left-80'>
          <Routes>
            <Route element={<Middleware />}>
              {user?.role !== 'staff' ? (
                <>
                  <Route index element={<Information />} />
                  <Route path='account' element={<Information />} />
                  <Route path='privacy' element={<Privacy />} />
                </>
              ) : (
                <>
                  <Route index element={<Information />} />
                  <Route path='account' element={<Information />} />
                  <Route path='privacy' element={<Privacy />} />
                  <Route path='documents' element={<Document />} />
                </>
              )}
            </Route>
          </Routes>
        </section>
      </div>
    </div>
  );
};
