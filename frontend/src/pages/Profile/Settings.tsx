import { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const loginDetail = useSelector((state: RootStateOrAny) => state.loginReducer);
  // const { userInfo } = loginDetail;

  // useEffect(() => {
  //   if (!userInfo) {
  //      navigate('/')
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userInfo])

  return (
    <div className="flex">
      {/* <button className="bg-red-500 px-4 py-2 text-sm float-right text-white rounded-md  my-4 mx-5"
      onClick={() => dispatch(logout())}>
        Logout
      </button> */}
    </div>
  );
};
