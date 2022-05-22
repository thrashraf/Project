import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import CardPublication from '../../components/cardPublication';
import Modal2 from '../../components/Modal2';
import { getAllPublication } from '../../features/Publication/Publication';

type Props = {};

const Publication = (props: Props) => {
  const background = {
    backgroundImage: 'url(' + '/assets/bookshelves.jpg' + ')',
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllPublication());
  }, []);

  const [show, setShow] = useState(false);
  const [eShow, setEShow] = useState(false);
  // const [allPublication, setAllPublication] = useState<any>();
  const [publication, setPublication] = useState<any>(null);

  const viewPublicationHandler = (id: string, publication: any) => {
    setPublication(publication);
    setShow(!show);
  };
  return (
    <div
      className=' px-20 pb-16 pt-6 right-0 left-0 lg:h-full w-full bg-no-repeat bg-cover absolute'
      style={background}
    >
      <CardPublication viewPublicationHandler={viewPublicationHandler} />

      {/* <AddPublication isShowing={eShow} toggle={setEShow} /> */}

      {/* <button
  className=" bg-blue-500 absolute top-20 right-10 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-1 mx-10 text-xl"
  onClick={() => setEShow(!eShow)}
>
  +
</button> */}
      <div className='absolute -top-80'>
        <Modal2 publication={publication} show={show} setShow={setShow} />
      </div>
    </div>
  );
};

export default Publication;