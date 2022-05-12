import React, { useEffect, useState } from 'react';
import { DynamicInput } from '../../components/DynamicInput';
import useInput from '../../hooks/useInput';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { userSelector, updateUserInformation } from '../../features/user/User';
import Draw from './Draw';
import Notify from '../../components/Notify';
import useModal from '../../hooks/useModal';
import Dropzone from '../../components/Dropzone';
import ProfileModal from './ProfileModal';
import SignatureModal from './SignatureModal';

type Props = {};

export const Information = (props: Props) => {
  const [editMode, setEditMode] = useState<boolean>(true);

  const { user }: any = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const name = useInput('');
  const position = useInput('');
  const email = useInput('');
  const phoneNumber = useInput('');

  // const { isShowing: showUploadSignature, toggle: toggleUploadSignature } =
  //   useModal();
  const { isShowing, toggle } = useModal();
  const { isShowing: showSignatureModal, toggle: toggleSignature }: any =
    useModal();

  console.log(showSignatureModal);

  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      console.log(user);
      name.setInput(user.name);
      email.setInput(user.email);
      phoneNumber.setInput(user.phone_number);
      position.setInput(user.position);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const updateUser = () => {
    const data = {
      id: user.id,
      name: name.value,
      email: email.value,
      position: position.value,
      phoneNumber: phoneNumber.value,
    };

    dispatch(updateUserInformation(data));

    setEditMode(!editMode);
  };

  return (
    <div>
      <Draw modal={show} setModal={setShow} />
      <section className='w-full mt-5'>
        <section className='relative'>
          <div className='text-white'>
            <section className='relative text-[14px]'>
              <img
                src='/assets/default-header.jpg'
                alt=''
                className='h-[170px] w-full object-cover rounded-t-xl'
              />
              <i
                className='fa-solid fa-camera bg-blue-500 rounded-full w-7 h-7 p-1.5 absolute -bottom-14 z-10 left-24 cursor-pointer'
                onClick={toggle}
              ></i>
            </section>
          </div>
          <ProfileModal isShowing={isShowing} toggle={toggle} />
          <div className=''>
            <img
              className='w-[100px] h-[100px] rounded-full  absolute top-32 left-5 object-cover'
              src={`${
                user && user.profile_picture
                  ? `/assets/${user.profile_picture}`
                  : '/assets/dummy_profile.png'
              }`}
              alt=''
            />

            <button
              className='bg-blue-500 px-4 py-1 text-sm float-right text-white rounded-md  my-4'
              disabled={!editMode}
              onClick={() => setEditMode(!editMode)}
              style={!editMode ? { backgroundColor: '#dbeafe' } : {}}
            >
              <i className='far fa-edit'></i> edit
            </button>

            <button
              className={`bg-blue-500 px-4 py-1 text-sm float-right text-white rounded-md  my-4 mx-5 ${
                editMode && 'hidden'
              }`}
              onClick={updateUser}
            >
              <i className='far fa-save mr-2'></i>Save
            </button>
          </div>
        </section>

        {user ? (
          <div>
            <section className='lg:grid grid-cols-2 mt-24 gap-5'>
              <DynamicInput
                content={name.value}
                editMode={editMode}
                title='Name'
                onChange={name.onChange}
              />
              <DynamicInput
                content={position.value}
                editMode={editMode}
                title='Position'
                onChange={position.onChange}
              />

              <DynamicInput
                content={email.value}
                editMode={editMode}
                title='Email'
                onChange={email.onChange}
              />

              <DynamicInput
                content={phoneNumber.value}
                editMode={editMode}
                title='Phone Number'
                onChange={phoneNumber.onChange}
              />
            </section>
          </div>
        ) : null}

        <div className={`my-10 text-gray-500 ${!user && 'hidden'}`}>
          <SignatureModal
            isShowing={showSignatureModal}
            toggle={toggleSignature}
          />
          <h3>signature</h3>

          <div
            className={` justify-around ${
              user ? (user.signature ? 'hidden' : 'block lg:flex') : 'hidden'
            }`}
          >
            <section className='mt-5 text-sm'>
              <p>Draw signature here</p>
              <section className='relative mt-5 '>
                {user && !user.signature && <Notify />}
                <div
                  className='w-[300px] h-[150px] border-dashed border-2 border-blue-100 rounded-lg flex justify-center items-center cursor-pointer'
                  onClick={() => setShow(!show)}
                >
                  <img
                    src='/assets/add_signature.png'
                    alt='plus'
                    className='w-[50px] h-[50px] object-cover'
                  />
                </div>
              </section>
            </section>

            <section className='mt-5 text-sm'>
              <p>Already have signature? upload here</p>
              <section className='relative mt-5 '>
                {user && !user.signature && <Notify />}
                <div
                  className='w-[300px] h-[150px] border-dashed border-2 border-blue-100 rounded-lg flex justify-center items-center cursor-pointer'
                  onClick={() => toggleSignature()}
                >
                  <img
                    src='/assets/uploadImage.png'
                    alt='plus'
                    className='w-[50px] h-[50px] object-cover'
                  />
                </div>
              </section>
            </section>
          </div>

          <div
            className={`mt-5 ${
              user ? (user.signature ? 'visible' : 'hidden') : 'hidden'
            }`}
          >
            <img
              src={user && `/assets/${user.signature}`}
              className='w-[150px] h-[100px] object-cover'
            />

            <button
              className='flex mt-5 bg-blue-500 px-3 py-2 text-white rounded-lg'
              onClick={() => toggleSignature()}
            >
              Edit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
