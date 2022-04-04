import { Image } from "./Image";
import { Form } from "./Form";

export const Login = () => {
  return (
    <div className=" h-screen px-10 flex flex-col justify-center max-w-md m-auto lg:grid grid-cols-2  lg:px-0 lg:w-full lg:max-w-[1600px] lg:overflow-hidden ">
      <div className=" lg:p-[20%]">
        <h1 className=" text-3xl">Welcome</h1>
        <p className=" text-gray-400">Let's Login With Us</p>

        <Form />
      </div>
      <Image />
    </div>
  );
};
