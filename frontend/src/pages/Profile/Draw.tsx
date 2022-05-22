import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ModalUser from '../../components/ModalUser';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  userSelector,
  refreshUser,
  updateSignature,
  toggleEditSignature,
} from '../../features/user/User';
import { useDispatch } from 'react-redux';
import url from '../../utils/url';

type Props = {
  modal: boolean;
  setModal: any;
};

const Draw = (props: Props) => {
  const canvasRef = useRef<any>(null);
  const contextRef = useRef<any>(null);

  const { user }: any = useAppSelector(userSelector);
  const dispatch = useDispatch();

  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;

    canvas.style.backgroundColor = 'white';

    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    //context.globalCompositeOperation = "destination-over";
    context.fillStyle = '#FFF';
    context.fillRect(0, 0, canvas.width, canvas.height);
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }: any) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.fillStyle = 'white';
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }: any) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.fillStyle = 'white';
    contextRef.current.stroke();
  };

  const clear = () => {
    contextRef.current.fillStyle = '#FFF';
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    contextRef.current.fillRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  const convertToImage = () => {
    // let image = new Image();
    // console.log(canvasRef.current.toDataURL('image/jpeg', 1.0));

    const formData = new FormData();

    canvasRef.current.toBlob((blob: any) => {
      var file = new File([blob], 'fileName.jpeg', { type: 'image/jpeg' });
      formData.append('email', user?.email);
      formData.append('upload', file);
      axios
        .post(`${url}/api/user/uploadSignature`, formData, {
          withCredentials: true,
        })
        .then((res) => {
          props.setModal(!props.modal);
          dispatch(updateSignature(res.data.signature));
          dispatch(toggleEditSignature());
        })
        .catch((err) => {
          console.log(err);
        });
    }, 'image/jpeg');
  };
  return (
    <ModalUser modal={props.modal} setModal={props.setModal}>
      <div className='relative mx-auto p-4 w-full max-w-lg max-h-[200px] md:h-auto'>
        <div className='relative bg-white rounded-lg shadow '>
          <div className='flex justify-between items-center p-2 rounded-t '>
            <button
              type='button'
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  dark:hover:text-white'
              data-modal-toggle='medium-modal'
              onClick={() => props.setModal(!props.modal)}
            >
              <svg
                className='w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
          </div>
          <canvas
            className='w-[100%] rounded-b-lg'
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            ref={canvasRef}
          />

          <section className='absolute right-0 -bottom-16'>
            <button
              type='submit'
              className=' bg-white p-2 rounded-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  cursor-pointer mr-5 px-6'
              onClick={clear}
            >
              Clear
            </button>
            <button
              type='submit'
              className=' bg-blue-500 text-white p-2 rounded-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-blue-400 cursor-pointer  px-6'
              onClick={convertToImage}
            >
              Upload
            </button>
          </section>
        </div>
      </div>
    </ModalUser>
  );
};

export default Draw;
