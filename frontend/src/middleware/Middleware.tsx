import { useLocation, Navigate, Outlet } from "react-router-dom";

const Middleware = () => {

  const isAuth = localStorage.getItem('isAuth');
  const location = useLocation();

  console.log(isAuth);

  return (
    isAuth === 'true' ? <Outlet/> : <Navigate to='/login' state={{ from: location}} replace/>
  )
}

export default Middleware