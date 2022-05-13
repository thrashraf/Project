import React, { useState } from 'react';
import Modal from './ModalContainer';
import fileSize from '../utils/calculateImageSize';

const Dropzone = ({ isShowing, hide, ...props }: any) => {
  const [dropZoneActive, setDropZoneActive] = useState<boolean>(false);

  return (
    <Modal isShowing={isShowing} hide={hide}>
      <div className='p-5 bg-white mx-auto relative max-w-lg rounded-lg '>
        <section
          className='flex justify-end mb-5 cursor-pointer'
          onClick={hide}
        >
          <i className='fa-solid fa-xmark' />
        </section>

        <div
          className={`p-10 bg-slate-50 border-2 border-dashed text-center   flex flex-col rounded-lg 
        ${
          dropZoneActive
            ? 'text-blue-500 border-blue-500'
            : 'border-gray-400 text-slate-300 '
        }
        `}
          onDragOver={(e) => {
            setDropZoneActive(true);
            e.preventDefault();
          }}
          onDragLeave={(e) => {
            setDropZoneActive(false);
            e.preventDefault();
          }}
          onDrop={(e) => props.fileDrop(e)}
        >
          <i className='fa-solid fa-images fa-5x mb-5' />
          Drop image
        </div>

        <div className='my-5'>
          {props.files.length >= 1 &&
            props.files?.map((data: any, i: number) => (
              <div
                className='flex justify-between py-2 px-5 mb-2 bg-slate-200 items-center text-sm rounded-md'
                key={i}
              >
                <div className='flex '>
                  <span className={`mr-3 ${data.invalid ? 'file-error' : ''}`}>
                    {data.name}
                  </span>
                  <span>({fileSize(data.size)})</span>
                </div>

                <i
                  className='fa-solid fa-xmark'
                  onClick={() => props.removeFile(data.name)}
                />
              </div>
            ))}
        </div>
      </div>
    </Modal>
  );
};

export default Dropzone;
