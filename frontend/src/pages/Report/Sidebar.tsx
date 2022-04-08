import React, { useRef } from "react";
import { Input } from "../../components/Input";
import { Image } from "../../icons/Image";
import Toast from '../../components/Toast';

type Props = {
  title: string;
  content: string;
  programName: string;
  date: string;
  organizer: string;
  venue: string;
  tentative: any;

  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setProgramName: React.Dispatch<React.SetStateAction<string>>;
  setOrganizer: React.Dispatch<React.SetStateAction<string>>;
  setVenue: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;

  showModal: boolean;
  addTentativeHandler: any;
  removeTentativeHandler: any;
  handleTentative: any;
  addAjkHandler: any;
  removeAjkHandler: any;
  handleAjk: any;
  ajk: any;
  editMode: boolean;

  contentHandler: (e: any) => void;
  uploadFile: () => void;
  uploadRef: any;
  fileSelectorHandler: (e: any) => void;
};

export const Sidebar = (props: Props) => {
  const formHandler = (e: any) => {
    e.preventDefault();
  };

  const toastRef = useRef<any>(null);

  const userAuthHandler = () => {
    if (
      props.title !== "" ||
      props.date !== "" ||
      props.organizer !== "" ||
      props.venue !== ""
    ) {
      props.setShowModal(!props.showModal);
    } else {
      toastRef.current !== null && toastRef.current.showToast()
    }

  };

  return (
    <section className="my-10 mx-5  lg:mx-10 col-start-1 col-end-3">
      {/* heading */}
      <h1 className="text-center font-medium text-2xl">Report Maker</h1>

      <Toast ref={toastRef} status={'error'} message={'Please fill all the required field!'} />

      <form action="" onSubmit={formHandler}>
        <div className="mt-10">
          <section className="w-full my-5">
            <p className="my-1 text-sm text-gray-400 ml-1">
              Program Name <span className="text-red-500">*</span>
            </p>
            <Input
              type="text"
              placeholder=""
              value={props.title}
              onChange={(e) => props.setTitle(e.target.value)}
            />
          </section>

          <section className="grid grid-cols-2 gap-5 my-5">
            <div>
              <p className="my-1 text-sm text-gray-400 ml-1">
                Date <span className="text-red-500">*</span>
              </p>
              <input
                type="date"
                className="bg-blue-50 px-3 py-3 rounded-lg outline-none w-full"
                value={props.date}
                data-date-format="DD MMMM YYYY"
                disabled={props.editMode}
                required
                onChange={(e) => props.setDate(e.target.value)}
              />
            </div>

            <div>
              <p className="my-1 text-sm text-gray-400 ml-1">
                Organizer <span className="text-red-500">*</span>
              </p>
              <input
                type="string"
                className="bg-blue-50 px-3 py-3 rounded-lg outline-none w-full"
                value={props.organizer}
                disabled={props.editMode}
                required
                onChange={(e) => props.setOrganizer(e.target.value)}
              />
            </div>
          </section>

          <section className="grid grid-cols-2 gap-5 my-5">
            <div>
              <p className="my-1 text-sm text-gray-400 ml-1">
                Venue <span className="text-red-500">*</span>
              </p>
              <input
                type="string"
                className="bg-blue-50 px-3 py-3 rounded-lg outline-none w-full"
                value={props.venue}
                disabled={props.editMode}
                required
                onChange={(e) => props.setVenue(e.target.value)}
              />
            </div>

            <section
              className="mt-5 flex items-center text-blue-400 cursor-pointer 
            "
              onClick={props.uploadFile}
            >
              <div className="px-3 py-2 rounded-md bg-blue-50">
                <Image />
              </div>
              <p className="ml-5 ">Upload Images</p>
              <input
                type="file"
                accept="image/*"
                multiple={true}
                name="upload"
                className="hidden"
                disabled={props.editMode}
                ref={props.uploadRef}
                onChange={(e) => props.fileSelectorHandler(e)}
              />
            </section>
          </section>

          <section className="w-full my-5">
            <p className="my-1 text-sm text-gray-400 ml-1">
              Content <span className="text-red-500">*</span>
            </p>
            <textarea
              cols={30}
              rows={13}
              value={props.content}
              onChange={props.contentHandler}
              disabled={props.editMode}
              onKeyPress={props.contentHandler}
              required
              className="bg-blue-50 px-3 py-3 rounded-lg outline-none w-full resize-none"
            />
          </section>

          <section className="my-10 ">
            <h2 className="text-gray-400 text-center mb-10">Tentative</h2>

            {props.tentative.map((ten: any, index: number) => {
              return (
                <div key={index} className="my-5">
                  <section className="flex items-start justify-between">
                    <input
                      type="time"
                      name="time"
                      disabled={props.editMode}
                      value={ten.tentative.date}
                      onChange={(e) => props.handleTentative(e, index)}
                      className="bg-blue-50 outline-none p-2 rounded-lg"
                    />
                    <textarea
                      className="bg-blue-50 px-4 rounded-lg outline-none w-[60%]"
                      name="activities"
                      disabled={props.editMode}
                      value={ten.tentative.activities}
                      onChange={(e) => props.handleTentative(e, index)}
                    />
                    {props.tentative.length >= 1 && (
                      <button
                        className="bg-red-500 w-7 h-7 rounded-full my-auto text-white"
                        onClick={() => props.removeTentativeHandler(index)}
                      >
                        -
                      </button>
                    )}
                  </section>
                </div>
              );
            })}
            {props.tentative.length <= 10 && (
              <button
                className="bg-blue-500 w-10 h-10 rounded-full my-auto text-white"
                onClick={props.addTentativeHandler}
              >
                +
              </button>
            )}
          </section>

          <section className="my-20 ">
            <h2 className="text-gray-400 text-center mb-10">
              Committee Members
            </h2>

            {props.ajk.map((ajk: any, index: number) => {
              return (
                <div key={index} className="my-5">
                  <section className="flex items-start justify-between">
                    <input
                      type="text"
                      name="role"
                      disabled={props.editMode}
                      value={ajk.role}
                      onChange={(e) => props.handleAjk(e, index)}
                      className="bg-blue-50 outline-none p-2 rounded-lg w-[120px] "
                    />
                    <textarea
                      className="bg-blue-50 px-4 rounded-lg outline-none w-[60%]"
                      name="names"
                      value={ajk.names}
                      disabled={props.editMode}
                      onChange={(e) => props.handleAjk(e, index)}
                    />
                    {props.ajk.length >= 1 && (
                      <button
                        className="bg-red-500 w-7 h-7 rounded-full my-auto text-white"
                        onClick={() => props.removeAjkHandler(index)}
                      >
                        -
                      </button>
                    )}
                  </section>
                </div>
              );
            })}
            {props.ajk.length <= 10 && (
              <button
                className="bg-blue-500 w-10 h-10 rounded-full my-auto text-white"
                onClick={props.addAjkHandler}
              >
                +
              </button>
            )}
          </section>

          <div className="flex justify-center">
            <button
              type="submit"
              onClick={() => props.setEditMode(!props.editMode)}
              className="mt-10 bg-blue-500 text-white px-3 py-2 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-blue-400 cursor-pointer w-[100px] mx-5"
            >
              {props.editMode ? "Edit" : "Save"}
            </button>

            <button
              type="submit"
              className="mt-10 bg-green-500 text-white px-3 py-2 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-green-400 cursor-pointer w-[100px] mx-5"
              onClick={userAuthHandler}
            >
              Verify
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
