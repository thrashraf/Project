import React, { useEffect, useState, useRef } from 'react'




export default function Slider () {
    const [currentIndex, setCurrentIndex] = 
    useState(0);
    
    let count = 0;
    let slideInterval: any
    const slideRef = useRef<HTMLDivElement>(null);
    
    
    const featuredProducts = [
        "/assets/1.jpg",
        "/assets/2.jpg",
        "/assets/3.jpg",
    
    ];
    
    const removeAnimation = () => {
        if(slideRef.current !== null){

            slideRef.current.classList.remove("fade-anim");
        }
    }

    useEffect(() => {
        if(slideRef.current !== null){

            
            // slideRef.current.addEventListener
            // ('animationend', removeAnimation)
            startSlider();
        }

    }, []);

    const startSlider = () => {
        slideInterval = setInterval(() => {
                handleOnNextClick();
            }, 3000);
        };



        const handleOnNextClick = () => {
            if(slideRef.current !== null){
            
                count = (count + 1) % featuredProducts.
                length;
                setCurrentIndex(count);
                slideRef.current.classList.add
                ("fade-anim")
            }
        };
        const handleOnPreviousClick = () => {
            if(slideRef.current !== null){
            const productsLength = featuredProducts.
            length;
            // count = (currentIndex + productsLength - 1) % productsLength;
            setCurrentIndex(count);
            slideRef.current.classList.add
            ("fade-anim")
            }
        };
        

  return (
      <div className=' flex justify-center items-center'> 
           <div ref={slideRef} className=' lg:w-full select-none relative h-[270px] lg:h-[660px] object-cover'>
          <div className=" aspect-w-16 aspect-h-9">

          <img src={featuredProducts[currentIndex]} alt="" className=' lg:object-cover object-cover  w-full lg:h-[660px]   hover:cursor-pointer'/>
          </div>

      </div>

      </div>
     

  )
}
