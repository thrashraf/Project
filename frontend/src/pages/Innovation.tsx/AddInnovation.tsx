import React from 'react'
import ModalUser from '../../components/ModalUser'
import useInput from '../../hooks/useInput';


type Props = {}

const AddInnovation = ({ isShowing, toggle }: any) =>{

    const title = useInput("");
    const description = useInput("");
    const isbn = useInput("");
    const staff = useInput("");
    const year = useInput("");
  return (
    <ModalUser modal={isShowing} setModal={toggle}>
        <div className="relative">
        <div className="left-0 right-0 mx-6 lg:mx-auto lg:max-w-lg break-words  py-8 px-8 lg:md:px-16  bg-white  shadow-md rounded-lg border border-gray-400">
          <form  className="relative">
          <button
                type='button'
                onClick={() => toggle()}
                className=' absolute -top-5 -right-10 text-black bg-transparent z-10 hover:bg-black hover:text-white  rounded-lg text-sm p-2 py-4 ml-auto inline-flex items-center'
                data-modal-toggle='authentication-modal'
              >
                <i className='fa-solid fa-xmark fa-lg' />
              </button>
            <section className="">
              <p className="m-1">Innovasion Title</p>
              <input
                type="text"
                value={title.value}
                onChange={title.onChange}
                className="bg-blue-100 py-1 rounded-lg w-full"
              />
            </section>

            <section className="mt-1">
              <p className="m-1">Name</p>
              <textarea
                
                value={staff.value}
                //onChange={(e) => contentHandler(e)}
                className="bg-blue-100 py-1 rounded-lg w-full"
              />
            </section>

            <section className="mt-1">
              <p className="m-1">Program</p>
              <input
                type="text"
                value={isbn.value}
                onChange={isbn.onChange}
                className="bg-blue-100 py-1 rounded-lg w-full"
              />
            </section>
            <section className="">
              <p className="m-1">Level</p>
              <input
                type="text"
                value={description.value}
                onChange={description.onChange}
                className="bg-blue-100 py-1 rounded-lg w-full"
              />
            </section>

            <section className="mt-1">
              <p className="m-1">Medal</p>
              <input
                type="text"
                value={year.value}
                onChange={year.onChange}
                className="bg-blue-100 py-1 rounded-lg w-full"
              />
            </section>

            {/* <section className="">
          <div className="flex justify-center mt-8">
            <div className="rounded-lg shadow-xl bg-gray-50 lg:w-[300px]">
              <div className="m-4">
                <label className=" inline-flex mb-2 text-center text-gray-500">
                  Upload Image(jpg,png,svg,jpeg)
                </label>
                <div className="flex items-center justify-center w-full">
                  <div
                    className="absolute top-4 right-6 cursor-pointer text-gray-500 hover:text-gray-300"
                    onClick={() => toggle()}
                  >
                    <i className="fa-solid fa-xmark fa-xl"></i>
                  </div>
                  <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                    <div className="flex flex-col items-center justify-center pt-7">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                        Select a photo
                      </p>
                    </div>
                    <input type="file" className="opacity-0" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section> */}

            <section className="my-5">
              <section
                className="mt-5 flex  w-[200px] items-center cursor-pointer 
              text-slate-400 hover:text-blue-500
            "
                // onClick={toggleDropzone}
              >
                <div className="p-5 rounded-md bg-blue-50 ">
                  <i className="fa-solid fa-images fa-2xl"></i>
                </div>
                <p className="ml-5 text-sm">Upload Images</p>
              </section>
            </section>

            {/* <Dropzone
              isShowing={showDropzone}
              hide={toggleDropzone}
              fileDrop={fileDrop}
              fileSize={fileSize}
              files={validFiles}
              removeFile={removeFile}
            /> */}

            <div className=" justify-center flex">
              <button className="focus:outline-none transition duration-150 mt-5 ease-in-out hover:bg-indigo-600 bg-blue-500 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm">
                CREATE
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalUser>
  )
}

export default AddInnovation