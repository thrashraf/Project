import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/Toast";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { loginUser, userSelector, clearState } from '../../features/user/User';


export const Form = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const { isFetching, isSuccess, isError, errorMessage, redirect } = useAppSelector(
    userSelector
  );

  const navigate = useNavigate();
  const toastRef = useRef<any>(null);
  
  const dispatch = useAppDispatch()

  const onSubmithandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = {email, password}
    dispatch(loginUser(data))
  };

  useEffect(() => {
    if (isError) {
      createUserHandler('error', errorMessage)
      dispatch(clearState());
    }
    if (isSuccess) {
      navigate(redirect)
      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  

    const createUserHandler = (status: string, message: string) =>{
      if(toastRef.current !== null){
        setStatus(status)
        setMessage(message)
        toastRef.current.showToast()
      }
    }

  return (
    <form onSubmit={onSubmithandler} action="" className=" flex flex-col mt-10">

      <Toast 
      
      status = {status}
      message = {message}
      ref = {toastRef}
      />

      <input
        type="text"
        placeholder="Email"
        value={email}
        className=" bg-blue-100 px-3 py-3 rounded-lg outline-none"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        className=" bg-blue-100 px-3 py-3 rounded-lg mt-5 outline-none"
        onChange={(e) => setPassword(e.target.value)}
      />
      <a href="/something" className=" text-center mt-5 text-blue-500">
        Forgot Password? 
      </a>

      <button className="mt-10 bg-blue-500 text-white px-3 py-3 rounded-lg">
        Login
      </button>

      <p className="mt-10 text-center">
        doesn't have an account?
        <span
          className=" underline text-blue-500 ml-2 cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>
      
    </form>
  );
};
