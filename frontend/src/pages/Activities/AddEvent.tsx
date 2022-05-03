import React, { useEffect, useRef, useState } from "react";
import ModalContainer from "../../components/ModalContainer";
import Dropzone from "../../components/Dropzone";
import useInput from "../../hooks/useInput";
import useModal from "../../hooks/useModal";
import Toast from '../../components/Toast';
import axios from "axios";
import { useAppDispatch } from '../../app/hooks';
import { addNewActivities } from '../../features/activities/Activities';

type Props = {
  isShowing: boolean;
  toggle: any;
};

const AddEvent = (props: Props) => {

  const dispatch = useAppDispatch();

  const title = useInput("");
  const startEvent = useInput("");
  const endEvent = useInput("");
  const organizer = useInput("");
  const venue = useInput("");

  const [file, setFile] = useState<any>([]);
  const [validFiles, setValidFiles] = useState<any>([]);
  

  //for toast
  const [status, setStatus] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const toastRef = useRef<any>(null);

  //dropzone State
  const { isShowing, toggle } = useModal();

  //for drop file
  const fileDrop = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        setFile((prevArray: any) => [...prevArray, ...files]);
      } else {
        setStatus("error")
        setMessage("Not support file type")
        toastRef.current && toastRef.current.showToast();
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
    const validFileIndex = validFiles.findIndex((e: any) => e.name === name);
    validFiles.splice(validFileIndex, 1);
    // update validFiles array
    setValidFiles([...validFiles]);
    const selectedFileIndex = file.findIndex((e: any) => e.name === name);
    file.splice(selectedFileIndex, 1);
    // update selectedFiles array
    setFile([...file]);
  };

  //to remove duplicate name
  useEffect(() => {
    let filteredArray = file.reduce((file: any, current: any) => {
      const x = file.find((item: any) => item.name === current.name);
      if (!x) {
        return file.concat([current]);
      } else {
        return file;
      }
    }, []);
    setValidFiles([...filteredArray]);
  }, [file]);

  const formHandler = (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('title', title.value);
    formData.append('start', startEvent.value);
    formData.append('end', endEvent.value);
    formData.append('venue', venue.value);
    formData.append('organizer', organizer.value);
    validFiles.forEach((image: any) => formData.append('upload', image));

    axios.post('/api/activities/createActivities', formData)
    .then((res: any) => {
      if (res.status === 200) {

        const newActivities = {
          title: title.value,
          start: startEvent.value,
          end: endEvent.value,
          organizer: organizer.value,
          venue: venue.value,
          img_url: JSON.stringify(validFiles)
        }

        dispatch(addNewActivities(newActivities));
        props.toggle();
        
      }
    })
    .catch((err: any) => {
      console.log(err);
    })
  }

  return (
    <ModalContainer
      isShowing={props.isShowing}
      toggle={props.toggle}
      hide={props.toggle}
    >
      <div className="relative mx-auto bg-white max-w-lg rounded-lg shadow z-50 ">
        <form className="flex flex-col px-5 py-3" onSubmit={(e) => formHandler(e)}>
          <section className="my-5">
            <p className="my-1 text-sm text-gray-400 ml-1">
              Title
              <span className="text-red-500">*</span>
            </p>
            <input
              type="text"
              value={title.value}
              onChange={title.onChange}
              className="bg-blue-50 px-3 py-2 rounded-lg outline-none w-full"
            />
          </section>
          <div className="grid grid-cols-2 gap-5">
            <section className="">
              <p className="my-1 text-sm text-gray-400 ml-1">
                Start Date
                <span className="text-red-500">*</span>
              </p>
              <input
                type="date"
                value={startEvent.value}
                onChange={startEvent.onChange}
                className="bg-blue-50 px-3 py-2 rounded-lg outline-none w-full"
              />
            </section>
            <section className="">
              <p className="my-1 text-sm text-gray-400 ml-1">
                End Date
                <span className="text-red-500">*</span>
              </p>
              <input
                type="date"
                value={endEvent.value}
                onChange={endEvent.onChange}
                className="bg-blue-50 px-3 py-2 rounded-lg outline-none w-full"
              />
            </section>
            <section className="">
              <p className="my-1 text-sm text-gray-400 ml-1">
                Organizer
                <span className="text-red-500">*</span>
              </p>
              <input
                type="text"
                value={organizer.value}
                onChange={organizer.onChange}
                className="bg-blue-50 px-3 py-2 rounded-lg outline-none w-full"
              />
            </section>
            <section className="">
              <p className="my-1 text-sm text-gray-400 ml-1">
                Venue
                <span className="text-red-500">*</span>
              </p>
              <input
                type="text"
                value={venue.value}
                onChange={venue.onChange}
                className="bg-blue-50 px-3 py-2 rounded-lg outline-none w-full"
              />
            </section>
          </div>
          <section className="my-5">
            <section
              className="mt-5 flex  w-[200px] items-center cursor-pointer 
              text-slate-400 hover:text-blue-500
            "
              onClick={toggle}
            >
              <div className="p-5 rounded-md bg-blue-50 ">
                <i className="fa-solid fa-images fa-2xl"></i>
              </div>
              <p className="ml-5 text-sm">Upload Images</p>
            </section>
          </section>
          <section className=" flex justify-end">
            <button
              className="flex hover:bg-black hover:text-white px-3 py-2  rounded-lg mr-5"
              onClick={props.toggle}
            >
              Cancel
            </button>
            <button className="flex bg-blue-500 px-3 py-2 text-white rounded-lg">
              Create
            </button>
          </section>
          <Dropzone
            isShowing={isShowing}
            hide={toggle}
            fileDrop={fileDrop}
            fileSize={fileSize}
            files={validFiles}
            removeFile={removeFile}
          />
        </form>
        <Toast
        ref={toastRef}
        status={status}
        message={message}
        />
      </div>
    </ModalContainer>
  );
};

export default AddEvent;
