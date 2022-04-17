import axios from "axios";
import React, {  useEffect, useState } from "react";
import { DynamicInput } from "../../components/DynamicInput";
import useInput from '../../hooks/useInput';
import { useAppSelector } from '../../app/hooks';
import { userSelector } from '../../features/user/User';
import Draw from './Draw'

type Props = {};

export const Information = (props: Props) => {
 
  const [editMode, setEditMode] = useState<boolean>(false);

  const { user }: any = useAppSelector(userSelector);

  const firstName = useInput("");
  const position = useInput("");
  const email = useInput("");
  const phoneNumber = useInput("");

  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if(user) {
      console.log(user);
      firstName.setInput(user.name)
      email.setInput(user.email);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  
  // const updateUser = async () => {

  //   await axios
  //     .post("http://localhost:5000/api/updateUser", {
  //       id,
  //       firstName,
  //       lastName,
  //       email,
  //       phoneNumber,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       setEditMode(!editMode);
  //       console.log("click");
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <div className=" ">
      <Draw modal={show} setModal={setShow} />
      <section className="w-full mt-5">
        <section className="relative">
          <div>
            <img
              src="/assets/default-header.jpg"
              alt=""
              className="h-[170px] w-full object-cover rounded-t-xl"
            />
          </div>

          <div className="">
            <span className="bg-gray-300  px-[30px] py-[25px] rounded-full text-white absolute top-32 left-5">
              <i className="fas fa-user fa-2x"></i>
            </span>

            <button
              className="bg-blue-500 px-4 py-1 text-sm float-right text-white rounded-md  my-4"
              disabled={editMode}
              onClick={() => setEditMode(!editMode)}
              style={editMode ? { backgroundColor: "#dbeafe" } : {}}
            >
              <i className="far fa-edit"></i> edit
            </button>

            <button
              className="bg-blue-500 px-4 py-1 text-sm float-right text-white rounded-md  my-4 mx-5"
              // onClick={updateUser}
              style={editMode ? { display: "block" } : { display: "none" }}
            >
              <i className="far fa-save mr-2"></i>Save
            </button>
          </div>
        </section>

        {user ? ( 
          <div>
            <section className="lg:grid grid-cols-2 mt-24 gap-5">
              <DynamicInput
                content={firstName.value}
                editMode={editMode}
                title="First Name"
                onChange={firstName.onChange}
              />
              <DynamicInput
                content={position.value}
                editMode={editMode}
                title="Position"
                onChange={position.onChange}
              />

              <DynamicInput
                content={email.value}
                editMode={editMode}
                title="Email"
                onChange={email.onChange}
              />

              <DynamicInput
                content={phoneNumber.value}
                editMode={editMode}
                title="Phone Number"
                onChange={phoneNumber.onChange}
              />
            </section>
          </div>
        ) : null}
        
        <div className="my-10 text-gray-500">
          <p>signature</p>
          <section className="relative mt-5 ">
            <span className="absolute bg-blue-500 w-[15px] h-[15px] rounded-full animate-ping -top-2 -left-1"/>
            <span className="absolute bg-blue-500 w-[15px] h-[15px] rounded-full -top-2 -left-1"/>
            <div className="w-[300px] h-[150px] border-dashed border-2 border-blue-100 rounded-lg flex justify-center items-center cursor-pointer"
            onClick={() => setShow(!show)}
            >
              <img src="/assets/add_signature.png" alt="plus" className="w-[50px] h-[50px] object-cover" />
            </div>
          </section>
        </div>


      </section>
    </div>
  );
};
