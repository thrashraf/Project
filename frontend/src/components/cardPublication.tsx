import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { publicationSelector } from '../features/Publication/Publication';

type Props = {
  viewPublicationHandler: any;
};

export const CardPublication = (props: Props) => {
  const { allPublication, isFetching }: any =
    useAppSelector(publicationSelector);
  console.log(isFetching);
  const [show, setShow] = useState(false);
  return (
    <div className='grid lg:w-full w-full lg:grid-cols-4  gap-10'>
      {allPublication
        ? allPublication.map((publication: any) => {
            console.log(publication);
            return (
              <div
                key={publication.key}
                className='relative hover:scale-110 duration-500 mt-[100px] '
                onClick={() =>
                  props.viewPublicationHandler(publication.key, publication)
                }
              >
                <img
                  src={`/uploads/${publication.img_url[0]}`}
                  alt='/'
                  className='object-cover   h-[150px] w-full'
                />
                <div className='absolute top-0 left-0 lg:w-full h-full  cursor-pointer'></div>
              </div>
            );
          })
        : null}
    </div>
  );
};
export default CardPublication;
