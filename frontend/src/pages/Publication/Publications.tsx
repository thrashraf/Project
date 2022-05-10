import React, { useEffect } from 'react';
import Modal2 from '../../components/Modal2';
import Navbar from '../../components/Navbar';
import CardPublication from '../../components/cardPublication';
import Footer from '../../components/Footer';
import { useState } from 'react';
import ModalUser from '../../components/ModalUser';

export const Publications = () => {
  const background = {
    backgroundImage: 'url(' + '/assets/bookshelves.jpg' + ')',
  };

  const [show, setShow] = useState(false);
  const [eShow, setEShow] = useState(false);
  const [allPublication, setAllPublication] = useState<any>();
  const [publication, setPublication] = useState<any>(null);

  const viewPublicationHandler = (id: string, publication: any) => {
    setPublication(publication);
    setShow(!show);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/publication/getAllPublication', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      let data = await response.json();
      console.log(data);
      setAllPublication(data.allPublication);
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />

      <section>
        <div className='pt-[10px]'>
          <div
            className=' px-20 pb-16 pt-6 right-0 left-0 lg:h-screen w-full bg-no-repeat bg-cover'
            style={background}
          >
            <CardPublication
              viewPublicationHandler={viewPublicationHandler}
              allPublication={allPublication}
            />
            <ModalUser modal={eShow} setModal={setEShow}>
              <div className='relative'>
                <div className='mt-0 left-0 right-0 mx-6 lg:mx-auto lg:max-w-lg break-words  py-8 px-8 lg:md:px-16  bg-white   fixed  shadow-md rounded-lg border border-gray-400'>
                  <section className=''>
                    <p className='m-1'>Title</p>
                    <input
                      type='text'
                      className='bg-blue-100 py-1 rounded-lg w-full'
                    />
                  </section>

                  <section className=''>
                    <p className='m-1'>Description</p>
                    <input
                      type='text'
                      className='bg-blue-100 py-1 rounded-lg w-full'
                    />
                  </section>

                  <section className='mt-1'>
                    <p className='m-1'>ISBN</p>
                    <input
                      type='text'
                      className='bg-blue-100 py-1 rounded-lg w-full'
                    />
                  </section>

                  <section className=''>
                    <div className='flex justify-center mt-8'>
                      <div className='rounded-lg shadow-xl bg-gray-50 lg:w-[300px]'>
                        <div className='m-4'>
                          <label className=' inline-flex mb-2 text-center text-gray-500'>
                            Upload Image(jpg,png,svg,jpeg)
                          </label>
                          <div className='flex items-center justify-center w-full'>
                            <div
                              className='absolute top-4 right-6 cursor-pointer text-gray-500 hover:text-gray-300'
                              onClick={() => setEShow(!eShow)}
                            >
                              <i className='fa-solid fa-xmark fa-xl'></i>
                            </div>
                            <label className='flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300'>
                              <div className='flex flex-col items-center justify-center pt-7'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='w-12 h-12 text-gray-400 group-hover:text-gray-600'
                                  viewBox='0 0 20 20'
                                  fill='currentColor'
                                >
                                  <path
                                    fill-rule='evenodd'
                                    d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                                    clip-rule='evenodd'
                                  />
                                </svg>
                                <p className='pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600'>
                                  Select a photo
                                </p>
                              </div>
                              <input type='file' className='opacity-0' />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <div className=' justify-center flex'>
                    <button className='focus:outline-none transition duration-150 mt-5 ease-in-out hover:bg-indigo-600 bg-blue-500 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm'>
                      <a href='' target='_blank'>
                        CREATE
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </ModalUser>
            <div className='justify-end flex'>
              <button
                className='inline-flex items-center justify-center w-16 h-16 mr-2 text-pink-100 transition-colors duration-150 bg-blue-700 rounded-full focus:shadow-outline hover:bg-blue-900'
                onClick={() => setEShow(!eShow)}
              >
                <p className=' text-2xl'>+</p>
              </button>
            </div>
            <Modal2 publication={publication} show={show} setShow={setShow} />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};
