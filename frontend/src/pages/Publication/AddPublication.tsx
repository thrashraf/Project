import React, { useEffect, useState } from "react";
import ModalUser from "../../components/ModalUser";
import useModal from "../../hooks/useModal";
import useInput from "../../hooks/useInput";
import axios from "axios";
import { useAppDispatch } from "../../app/hooks";
import {
  addPublication,
  getAllPublication,
} from "../../features/Publication/Publication";
import Dropzone from "../../components/Dropzone";
import DropZoneFile from "../../components/DropZoneFile";

const AddPublication = ({ isShowing, toggle }: any) => {
  const title = useInput("");
  const description = useInput("");
  const isbn = useInput("");
  const staff = useInput("");
  const year = useInput("");
  const dispatch = useAppDispatch();

  // for images
  const [file, setFile] = useState<any>([]);

  // for PDF
  const [filePDF, setFilePDF] = useState<any>([]);

  const { isShowing: showDropzone, toggle: toggleDropzone } = useModal();
  const { isShowing: showDropFile, toggle: toggleDropFile } = useModal();

  //for drop file
  const fileDrop = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        setFile([ ...files]);
      }
    }
  };

  //for validate file
  const validateFile = (file: any) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    console.log(validTypes.indexOf(file.type) === -1);
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  //to show file size
  const fileSize = (size: any) => {
    if (size === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  //to remove file
  const removeFile = (name: any) => {
    // find the index of the item
    // remove the item from array
    const selectedFileIndex = file.findIndex((e: any) => e.name === name);
    file.splice(selectedFileIndex, 1);
    // update selectedFiles array
    setFile([...file]);
  };


  console.log(staff.value);

  //! for pdf functions

  //for drop file
  const fileDropPDF = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      if (validateFilePDF(files[i])) {
        setFilePDF([...files]);
      }
    }
  };

  //for validate file
  const validateFilePDF = (file: any) => {
    const validTypes = ["application/pdf"];
    console.log(validTypes.indexOf(file.type) === -1);
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  console.log(file)

  //to remove file
  const removeFilePDF = (name: any) => {
    // find the index of the item
    // remove the item from array
    const selectedFileIndex = file.findIndex((e: any) => e.name === name);
    filePDF.splice(selectedFileIndex, 1);
    // update selectedFiles array
    setFilePDF([...filePDF]);
  };


  const formHandler = (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title.value);
    formData.append("description", description.value);
    formData.append("isbn", isbn.value);
    formData.append("staff", staff.value);
    formData.append("year", year.value);
    file.forEach((image: any) => formData.append("upload", image));
    filePDF.forEach((file: any) => formData.append("upload", file));

    axios
      .post("/api/publication/createPublication", formData)
      .then((res: any) => {
        if (res.status === 200) {

          const newPublication = {
            Title: title.value,
            Description: description.value,
            isbn: isbn.value,
            staff: staff.value,
            year: year.value,
            img_url: res.data.image_url ? res.data.image_url : null,
            pdf_url: res.data.pdf_url
          }
         
          dispatch(addPublication(newPublication));
          toggle();
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
   
  };

  return (
    <ModalUser modal={isShowing} setModal={toggle}>
      <div className="relative">
        <div className="left-0 right-0 mx-6 lg:mx-auto lg:max-w-lg break-words  py-8 px-8 lg:md:px-16  bg-white  shadow-md rounded-lg border border-gray-400">
          <form onSubmit={(e) => formHandler(e)} className="relative">
            <button
              type="button"
              onClick={() => toggle()}
              className=" cursor-pointer absolute -top-6 -right-12 mt-4 mr-5 focus:outline-none text-gray-400 hover:text-gray-600  transition duration-150 ease-in-out"
              data-modal-toggle="authentication-modal"
            >
              <i className="fa-solid fa-xmark fa-lg" />
            </button>
            <section className="">
              <p className="m-1">Title</p>
              <input
                type="text"
                value={title.value}
                onChange={title.onChange}
                className="bg-blue-100 py-1 rounded-lg w-full"
              />
            </section>

            <section className="">
              <p className="m-1">Description</p>
              <input
                type="text"
                value={description.value}
                onChange={description.onChange}
                className="bg-blue-100 py-1 rounded-lg w-full"
              />
            </section>

            <section className="mt-1">
              <p className="m-1">ISBN</p>
              <input
                type="text"
                value={isbn.value}
                onChange={isbn.onChange}
                className="bg-blue-100 py-1 rounded-lg w-full"
              />
            </section>
            <section className="mt-1">
              <p className="m-1">Staff Name:</p>
              <textarea
                value={staff.value}
                onChange={staff.onChange}
                className="bg-blue-100 py-1 rounded-lg w-full"
              />
            </section>

            <section className="mt-1">
              <p className="m-1">Year</p>
              <input
                type="number"
                value={year.value}
                onChange={year.onChange}
                className="bg-blue-100 py-1 rounded-lg w-full"
              />
            </section>

            <section className="my-5 flex">
              <section
                className="mt-5 flex  w-[200px] items-center cursor-pointer 
              text-slate-400 hover:text-blue-500
            "
                onClick={toggleDropzone}
              >
                <div className="p-5 rounded-md bg-blue-50 ">
                  <i className="fa-solid fa-images fa-2xl"></i>
                </div>
                <p className="ml-5 text-sm">Upload Images</p>
              </section>
              <section
                className="mt-5 flex  w-[200px] items-center cursor-pointer 
              text-slate-400 hover:text-blue-500
            "
                onClick={toggleDropFile}
              >
                <div className="p-5 rounded-md bg-blue-50 ">
                  <i className="fa-solid fa-file-pdf fa-2xl"></i>
                </div>
                <p className="ml-5 text-sm">Upload File</p>
              </section>
            </section>

            <Dropzone
              isShowing={showDropzone}
              hide={toggleDropzone}
              fileDrop={fileDrop}
              fileSize={fileSize}
              files={file}
              removeFile={removeFile}
            />

            <DropZoneFile
              isShowing={showDropFile}
              hide={toggleDropFile}
              fileDrop={fileDropPDF}
              fileSize={fileSize}
              files={filePDF}
              removeFile={removeFilePDF}
            />

            <div className=" justify-center flex">
              <button className="focus:outline-none transition duration-150 mt-5 ease-in-out hover:bg-indigo-600 bg-blue-500 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm">
                CREATE
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalUser>
  );
};
export default AddPublication;
