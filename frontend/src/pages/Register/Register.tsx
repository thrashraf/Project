import { Image } from './Image';
import { Form } from './Form';

const Register = () => {
  return (
    <div className='h-screen px-10 flex flex-col justify-center max-w-md m-auto lg:grid grid-cols-2  lg:px-0 lg:w-full lg:max-w-[1700px] lg:overflow-hidden'>
      {/* images */}
      <Image />

      {/* form */}
      <section className='lg:px-[20%] py-[10%]'>
        <h1 className='text-3xl font-semibold'>Welcome Back</h1>
        <p className='text-gray-400'>let's continue with us</p>

        <Form />
      </section>
    </div>
  );
};

export default Register;
