import { useState } from "react";

type Props = {
  viewPublicationHandler: any;
  allPublication: any;
};

export const CardPublication = (props: Props) => {
  const [show, setShow] = useState(false);
console.log(props.allPublication)
  return (
    <div className="grid lg:w-full w-full lg:grid-cols-4  gap-10">
    {props.allPublication?.map((publication: any) => {

        return (
            <div
            key={publication.key}
            className="relative hover:scale-110 duration-500 mt-[100px] "
            onClick={() => props.viewPublicationHandler(publication.key, publication)}
          >
            <img src={`/assets/${publication.img_url}`} alt="/" className="object-cover   h-[150px] w-full" />
            <div className="absolute top-0 left-0 lg:w-full h-full  cursor-pointer"></div>
          </div>
        )
       
    })}
      
    </div>
  );
};
export default CardPublication;
