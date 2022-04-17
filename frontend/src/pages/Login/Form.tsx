import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/Toast";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { loginUser, userSelector, clearState } from '../../features/user/User';
import useInput from "../../hooks/useInput";


export const Form = () => {

  const userEmail = useInput("");
  const userPassword = useInput("");

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

    const data = {email: userEmail.value , password: userPassword.value}
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
        value={userEmail.value}
        className=" bg-blue-100 px-3 py-3 rounded-lg outline-none"
        required
        onChange={userEmail.onChange}
      />
      <input
        type="password"
        placeholder="Password"
        value={userPassword.value}
        className=" bg-blue-100 px-3 py-3 rounded-lg mt-5 outline-none"
        required
        onChange={userPassword.onChange}
      />
      <a href="/something" className=" text-center mt-5 text-blue-500">
        Forgot Password? 
      </a>

      <button
        type="submit"
        className="mt-10 bg-blue-500 text-white px-3 py-3 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-blue-400 cursor-pointer flex justify-center items-center"
      >
        <img src="/assets/loading.svg" alt="loading" className={`w-[10px] h-[10px] animate-spin mr-2 ${isFetching ? null : 'hidden'}`}/>
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
