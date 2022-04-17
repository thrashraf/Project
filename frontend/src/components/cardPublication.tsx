import { useState } from "react";

type Props = {
  viewPublicationHandler: any;
  allPublication: any;
};

export const CardPublication = (props: Props) => {
  const [show, setShow] = useState(false);
console.log(props.allPublication)
  return (
    <div className="grid grid-cols-4  gap-10">
    {props.allPublication?.map((publication: any) => {

        return (
            <div
            key={publication.key}
            className="relative mt-[100px] "
            onClick={() => props.viewPublicationHandler(publication.key, publication)}
          >
            <img src={`/assets/${publication.img_url}`} alt="/" className="object-cover h-[150px] w-full" />
            <div className="bg-gray-900/30  absolute top-0 left-0 w-full h-full cursor-pointer"></div>
          </div>
        )
       
    })}
      
    </div>
  );
};
export default CardPublication;
