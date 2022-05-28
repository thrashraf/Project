import { useEffect, useState } from 'react';

type Props = {
  isPhoto: boolean;
  photo: any;
  images: any;
  status: string;
  setCurrentImage: any;
};

export const ImageTemplate = (props: Props) => {
  const [images, setImages] = useState<any>(null);

  const photo = props.photo?.reduce(function (
    accumulator: any,
    currentValue: any,
    currrentIndex: any,
    array: any
  ) {
    if (currrentIndex % 2 === 0)
      accumulator.push(array.slice(currrentIndex, currrentIndex + 2));
    return accumulator;
  },
  []);

  useEffect(() => {
    const reduceImage =
      props.images &&
      props.images?.reduce(function (
        accumulator: any,
        currentValue: any,
        currrentIndex: any,
        array: any
      ) {
        if (currrentIndex % 2 === 0)
          accumulator.push(array.slice(currrentIndex, currrentIndex + 2));
        return accumulator;
      },
      []);

    setImages(reduceImage);
  }, [props.images]);

  console.log(images);

  const deleteImage = (name: any) => {
    console.log(props.images);
    const index = props.images.findIndex((photo: string) => photo === name);
    const tempArr = [...props.images];
    tempArr.splice(index, 1);
    props.setCurrentImage(tempArr);
  };

  return (
    <div>
      {images?.length > 0 &&
        images.map((item: any, index: number) => (
          <div
            key={index}
            className={`my-2.5 h-[800px] w-[500px] font-Arimo break-before-auto  font-normal m-auto bg-white rounded-sm p-10 flex flex-col text-[10px] relative ${
              photo.length > 0 || images.length > 0 ? 'visible' : 'hidden'
            }`}
          >
            <h1 className='font-bold'>GAMBAR GAMBAR SEPANJANG AKTIVITI</h1>
            <section className=' mt-10'>
              {item?.map((image: any, indexArr: number) => (
                <section
                  key={indexArr}
                  className='mt-5 whitespace-normal relative'
                >
                  <section
                    className='absolute -left-2 -top-4 cursor-pointer w-8 h-8 hover:bg-slate-300 rounded-full flex justify-center items-center'
                    onClick={() => deleteImage(image)}
                  >
                    <i className='fa-solid fa-xmark fa-2xl' />
                  </section>
                  <img
                    src={`/assets/${image}`}
                    alt='pho'
                    key={index}
                    className='w-[400px] h-[200px] object-cover m-auto'
                  />
                  <p className='mt-[5px] text-center'>Rajah {indexArr + 1.0}</p>
                  {console.log(props.status)}
                </section>
              ))}
            </section>
          </div>
        ))}

      {photo?.length > 0 &&
        photo.map((item: any, index: number) => (
          <div
            key={index}
            className={`my-2.5 h-[800px] w-[500px] font-Arimo break-before-auto  font-normal m-auto bg-white rounded-sm p-10 flex flex-col text-[10px] relative ${
              photo.length > 0 || images.length > 0 ? 'visible' : 'hidden'
            }`}
          >
            <h1
              className={`font-bold ${
                images?.length > 0 ? 'hidden' : 'visible'
              }`}
            >
              GAMBAR GAMBAR SEPANJANG AKTIVITI
            </h1>
            <section className=' mt-10'>
              <div></div>
              {item.map((image: any, currentIndex: number) => (
                <section key={index} className='mt-5 whitespace-normal'>
                  <img
                    src={`${URL.createObjectURL(image)}`}
                    alt='pho'
                    key={currentIndex}
                    className='w-[400px] h-[200px] object-cover m-auto'
                  />
                  <p className='mt-[5px] text-center'>
                    Rajah{' '}
                    {props.images.length > 0
                      ? index * 2 + 3 + currentIndex
                      : currentIndex + 1}
                  </p>
                </section>
              ))}
            </section>
          </div>
        ))}
    </div>
  );
};
