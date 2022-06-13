import { Image } from './Image';
import { Form } from './Form';

export const Login = () => {
  return (
    <div className=' h-screen px-10 flex flex-col justify-center max-w-md m-auto lg:grid grid-cols-5  lg:px-0 lg:w-full lg:max-w-[1700px] lg:overflow-hidden '>
      <div className=' flex flex-col col-span-3'>
        <div className='max-w-xl pl-[20%] pt-[20%]'>
          <h1 className=' text-3xl'>Welcome</h1>
          <p className=' text-gray-400'>Let's Login With Us</p>
          <Form />
        </div>
      </div>
      <Image />
    </div>
  );
};
