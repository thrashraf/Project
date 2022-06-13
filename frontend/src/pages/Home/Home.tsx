/*eslint-disable*/
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAppSelector } from '../../app/hooks';
import { userSelector } from '../../features/user/User';

export const Home = () => {
  const navigate = useNavigate();

  const { user }: any = useAppSelector(userSelector);
  useEffect(() => {
    if (user?.role === 'hd') {
      navigate('/kj/dashboard');
    } else if (user?.role === 'admin') {
      navigate('/admin/dashboard');
    }
  }, [user]);

  const background = {
    backgroundImage: "url(" + "/assets/bg.jpg" + ")",
  };
  return (
    <>
      <Navbar fixed />
       <section className=" pt-16 items-center bg-cover overflow-x-hidden flex h-screen w-full"
       style={background}>
        
         
        <div className="container mx-auto items-center flex flex-wrap"
        // style={background}
        >
          <div className="w-full md:w-8/12 lg:ml-[100px] lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold z-10 text-4xl text-[#4c4c4c]">
                Staff Activity Management System 
              </h2>
              <p className='mt-4 text-lg leading-relaxed text-[#a7adba]'>
                We simplify the reporting process for staff and make it easier
                to search for existing department of information technology
                activities.
              </p>
              <div className='mt-12'>
                <a
                  href='/login'
                  target=''
                  className='get-started rounded-2xl text-white font-bold px-6 py-4 outline-none focus:outline-none mr-1 mb-1 bg-blue-500 active:bg-blue-500 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150'
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        </div>

        
        {/* <img
          className="absolute object-cover top-0 b-auto right-0 pt-16  -mt-48 sm:mt-0 w-full h-screen"
          src="/assets/bg.jpg"
          alt="..."
        /> */}
      </section>

      <section className='mt-48 md:mt-40 pb-40 relative bg-[#d5deea]'>
        <div
          className='-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20'
          style={{ transform: 'translateZ(0)' }}
        >
          <svg
            className='absolute bottom-0 overflow-hidden'
            xmlns='http://www.w3.org/2000/svg'
            preserveAspectRatio='none'
            version='1.1'
            viewBox='0 0 2560 100'
            x='0'
            y='0'
          >
            <polygon
              className=' text-[#d5deea] fill-current'
              points='2560 0 2560 100 0 100'
            ></polygon>
          </svg>
        </div>
        <div className='container mx-auto'>
          <div className='flex flex-wrap items-center'>
            <div className='w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32'>
              <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blue-500'>
                <img
                  alt='...'
                  src='https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80'
                  className='w-full align-middle rounded-t-lg'
                />
                <blockquote className='relative p-8 mb-4'>
                  <svg
                    preserveAspectRatio='none'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 2560 600'
                    className='absolute left-0 w-full top-[-99px] block h-[600px] '
                  >
                    <polygon
                      className='text-blue-500 fill-current'
                      points='2560 0 2560 100 0 100'
                    ></polygon>
                  </svg>
                  <h4 className='text-xl font-bold text-white'>
                    Generate Staff Reports
                  </h4>
                  <p className='text-md font-light mt-2 text-white'>
                    We accelerate the creation of reports by staff members,
                    which makes it easier to customise the report you want to
                    create.
                  </p>
                </blockquote>
              </div>
            </div>

            <div className='w-full md:w-6/12 px-4'>
              <div className='flex flex-wrap'>
                <div className='w-full md:w-6/12 px-4'>
                  <div className='relative flex flex-col mt-4'>
                    <div className='px-4 py-5 flex-auto'>
                      <div className='text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white'>
                        <i className='fa fa-sitemap'></i>
                      </div>
                      <h6 className='text-xl mb-1 font-semibold'>STAFF</h6>
                      <p className='mb-4 text-blueGray-500'>
                        We grow staff into brilliant individuals.
                      </p>
                    </div>
                  </div>
                  <div className='relative flex flex-col min-w-0'>
                    <div className='px-4 py-5 flex-auto'>
                      <div className='text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white'>
                        <i className='fas fa-drafting-compass'></i>
                      </div>
                      <h6 className='text-xl mb-1 font-semibold'>Activity</h6>
                      <p className='mb-4 text-blueGray-500'>
                        Now, users can access the website and view all
                        department activity.
                      </p>
                    </div>
                  </div>
                </div>
                <div className='w-full md:w-6/12 px-4'>
                  <div className='relative flex flex-col min-w-0 mt-4'>
                    <div className='px-4 py-5 pt-[50px] flex-auto'>
                      <div className='text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white'>
                        <i className='fas fa-newspaper'></i>
                      </div>
                      <h6 className='text-xl mb-1 font-semibold'>
                        Head Of Department
                      </h6>
                      <p className='mb-4 text-blueGray-500'>
                        We make it simple for head of department to verify
                        reports with the simple tap.
                      </p>
                    </div>
                  </div>
                  <div className='relative flex flex-col min-w-0'>
                    <div className='px-4 py-5 flex-auto'>
                      <div className='text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white'>
                        <i className='fas fa-file-alt'></i>
                      </div>
                      <h6 className='text-xl mb-1 font-semibold'>
                        Documentation
                      </h6>
                      <p className='mb-4 text-blueGray-500'>
                        Users can create reports on current activities by
                        utilising the report generator provided on this website.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='container mx-auto overflow-hidden pb-20'>
          <div className='flex flex-wrap items-center'>
            <div className='w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-48'>
              <div className='text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white'>
                <i className='fas fa-sitemap text-xl'></i>
              </div>
              <h3 className='text-3xl mb-2 font-semibold leading-normal'>
                Staff Activity Management System
              </h3>
              <p className='text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600'>
                We put forth all of our efforts to ensure that each activity is
                carried out in the most professional manner possible.
              </p>
            </div>

            <div className='w-full md:w-5/12 px-4 mr-auto ml-auto mb-10'>
              <div className='relative flex flex-col min-w-0 w-full mb-6 mt-48 md:mt-0'>
                <video
                  autoPlay
                  loop
                  muted
                  src='/assets/ER.mp4'
                  className='w-full align-middle rounded-lg flex shadow-lg -top-200-px  mt-[200px] left-260-px max-w-250-px'
                />
              </div>
            </div>
          </div>

          <div className='flex flex-wrap items-center pt-32'>
            <div className='w-full md:w-6/12 px-4 mr-auto ml-auto mt-32'>
              <div className='justify-center flex flex-wrap relative'>
                <div className='my-4 w-full lg:w-6/12 px-4'>
                  <a href='/publication' target='_blank'>
                    <div className='bg-red-600 shadow-lg rounded-lg text-center p-8'>
                      <img
                        alt='...'
                        className='shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white'
                        src='/assets/publication.png'
                      />
                      <p className='text-lg text-white mt-4 font-semibold'>
                        Publication
                      </p>
                    </div>
                    <div className='bg-[#69AADB] shadow-lg rounded-lg text-center p-8 mt-8'>
                      <a href='/innovation' target='_blank'>
                        <img
                          alt='...'
                          className='shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white'
                          src='/assets/innovation.png'
                        />
                        <p className='text-lg text-white mt-4 font-semibold'>
                          Innovation
                        </p>
                      </a>
                    </div>
                    <div className='bg-emerald-500 shadow-lg rounded-lg text-center p-8 mt-8'>
                    <a href='/activities' target='_blank'>
                      <img
                        alt='...'
                        className='shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white'
                        src='/assets/planner.png'
                      />
                      <p className='text-lg text-white mt-4 font-semibold'>
                        Events
                      </p>
                      </a>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className='w-full md:w-4/12 px-12 md:px-4 ml-auto mb-[100px] mr-auto mt-48'>
              <div className='text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white'>
                <i className='fas fa-drafting-compass text-xl'></i>
              </div>
              <h3 className='text-3xl mb-2 font-semibold leading-normal'>
                Department Activity
              </h3>
              <p className='text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600'>
                Each activity will be documented in the staff activity
                management system and verified by the head of department.
              </p>

              <a
                href='/activities'
                target='_blank'
                className='font-bold text-blueGray-700 hover:text-blueGray-500 ease-linear transition-all duration-150'
              >
                View all
                <i className='fa fa-angle-double-right ml-1 leading-relaxed'></i>
              </a>
            </div>
          </div>
        </div>

        <div className='container mx-auto px-4 pb-32 pt-48'>
          <div className='items-center flex flex-wrap'>
            <div className='w-full md:w-5/12 ml-auto px-12 md:px-4'>
              <div className='md:pr-12'>
                <div className='text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white'>
                  <i className='fas fa-file-alt text-xl'></i>
                </div>
                <h3 className='text-3xl font-semibold'>
                  Complex Documentation
                </h3>
                <p className='mt-4 text-lg leading-relaxed text-blueGray-500'>
                  This website includes a sophisticated document storage system
                  that enables user to store innovation and publication files.
                </p>
                <ul className='list-none mt-6'>
                  <li className='py-2'>
                    <div className='flex items-center'>
                      <div>
                        <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3'>
                          <i className='fas fa-fingerprint'></i>
                        </span>
                      </div>
                      <div>
                        <h4 className='text-blueGray-500'>
                          Here, you can securely store your report.
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className='py-2'>
                    <div className='flex items-center'>
                      <div>
                        <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3'>
                          <i className='fab fa-html5'></i>
                        </span>
                      </div>
                      <div>
                        <h4 className='text-blueGray-500'>
                          Carefully crafted for Users
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className='py-2'>
                    <div className='flex items-center'>
                      <div>
                        <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3'>
                          <i className='far fa-paper-plane'></i>
                        </span>
                      </div>
                      <div>
                        <h4 className='text-blueGray-500'>
                          You can view the activity of your department here.
                        </h4>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className='w-full md:w-6/12 mr-auto px-4 pt-24 md:pt-0'>
              <img
                alt='...'
                className='max-w-full rounded-lg shadow-xl'
                style={{
                  transform:
                    'scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg)',
                }}
                src='/assets/diges_psmza.png'
              />
            </div>
          </div>
        </div>
      </section>

      <section className='block relative  bg-[#B5D1EA]'>
        <div className='container mx-auto'>
          <div className='justify-center flex flex-wrap'>
            <div className='w-full lg:mb-[30px] lg:w-12/12 px-4  -mt-24'>
              <div className='flex flex-wrap'>
                <div className='w-full lg:w-4/12 px-4'>
                  <h5 className='text-xl font-semibold pb-4 text-center'>
                    Login Page
                  </h5>
                  <Link to='/login'>
                    <div className=' hover:scale-110 relative flex flex-col min-w-0 break-words bg-white w-full mb-2 shadow-lg rounded-lg ease-linear transition-all duration-150'>
                      <img
                        alt='...'
                        className='align-middle border-none max-w-full h-auto rounded-lg'
                        src='/assets/login1.png'
                      />
                    </div>
                  </Link>
                </div>

                <div className='w-full lg:w-4/12 px-4'>
                  <h5 className='text-xl font-semibold pb-4 text-center'>
                    Events
                  </h5>
                  <Link to='/activities'>
                    <div className='hover:scale-110 relative flex flex-col min-w-0 break-words bg-white w-full mb-2 shadow-lg rounded-lg ease-linear transition-all duration-150'>
                      <img
                        alt='...'
                        className='align-middle border-none max-w-full h-auto rounded-lg'
                        src='/assets/events.png'
                      />
                    </div>
                  </Link>
                </div>

                <div className='w-full lg:w-4/12 px-4'>
                  <h5 className='text-xl font-semibold pb-4 text-center'>
                    HomePage
                  </h5>
                  <Link to='/'>
                    <div className='hover:scale-110 relative flex flex-col min-w-0 break-words bg-white w-full mb-2 shadow-lg rounded-lg ease-linear transition-all duration-150'>
                      <img
                        alt='...'
                        className='align-middle border-none max-w-full h-auto rounded-lg'
                        src='assets/Homepage.png'
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};
