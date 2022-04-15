/*eslint-disable*/
import axios from "axios";
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { userSelector, clearState } from "../features/user/User";
import { Link } from "react-router-dom";
import NavDrop from "../components/NavDrop";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function Navbar(props:any) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);


  const { user } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  console.log(user);

  const logoutHandler = () => {
    axios
      .delete("/api/user/logout")
      .then((res) => {
        console.log(res);
        dispatch(clearState());
        localStorage.clear()
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              href="/"
              className="text-[#47487a] text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
              SAMS
            </a>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                <a
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  onClick={() => navigate('/create-report')}
                >
                  <i className="text-[#47487a] far fa-file-alt text-lg leading-lg mr-2" />{" "}
                  Reports
                </a>
              </li>
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <NavDrop />
              </li>
              <li className="flex items-center">
                <a
                  className="hover:text-blue-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://web.facebook.com/mypsmza?_rdc=1&_rdr"
                  target="_blank"
                >
                  <i className="text-blueGray-400 fab fa-facebook text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Facebook</span>
                </a>
              </li>

              

              <li className="flex items-center">
                <a
                  className="hover:text-blue-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://www.instagram.com/mypsmza/"
                  target="_blank"
                >
                  <i className="text-blueGray-400 fab fa-instagram text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Instagram</span>
                </a>
              </li>

              <li className="flex items-center">
              {user ? (
                <button
                  className="bg-blue-500 text-white active:bg-blue-500 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                  onClick={logoutHandler}
                >
                  <i className="fas fa-arrow-alt-circle-down"></i> Logout
                </button>
                ) : (
                  <button
                  className="bg-blue-500 text-white active:bg-blue-500 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => navigate('/login')}
                  
                >
                  
                  <i className="fas fa-arrow-alt-circle-down" ></i> Login
                  
                </button>
                )}
                
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
