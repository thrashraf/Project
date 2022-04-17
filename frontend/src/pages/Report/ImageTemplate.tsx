
type Props = {
    isPhoto: boolean,
    photo: any
}

export const ImageTemplate = (props: Props) => {

  return (
    props.photo.length > 0 ? props.photo.reduce(function(accumulator: any, currentValue: any, currrentIndex: any, array: any) {
      if (currrentIndex % 2 === 0) 
      accumulator.push(array.slice(currrentIndex, currrentIndex + 2))
      return accumulator
    }, []).map((image: any, index: number) => {
      return (
      <div
            className={`my-2.5 h-[800px] w-[500px] font-Arimo break-before-auto  font-normal m-auto bg-white rounded-sm p-10 flex flex-col text-[10px] relative ${
              !props.isPhoto && "hidden"
            }`}
          >
            <h1 className="font-bold">GAMBAR GAMBAR SEPANJANG AKTIVITI</h1>
            <section className=" mt-10">
              
              {image.map((img: any, index: number) => {
                console.log(URL.createObjectURL(img));
                return(
                  <section key={index} className="mt-5 whitespace-normal">
                    <img src={`${URL.createObjectURL(img)}`} alt="pho" key={index} className="w-[400px] h-[200px] object-cover m-auto"/>
                    <p className="mt-[5px] text-center">Rajah {index + 1.0}</p>
                  </section>
                )
              })}
            </section>
      </div>
      )
    })
    : null
  )
}

