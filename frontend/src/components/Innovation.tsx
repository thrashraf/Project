import React from 'react'

const Innovation = (props:any) => {
  return (

            

            <div className='relative '>
                <img src={props.bg} alt='/' className='object-cover h-[250px] w-full'/>
                <div className='bg-gray-900/30  absolute top-0 left-0 w-full h-full cursor-pointer'>
                    <p className='left-4 bottom-4 text-2xl font-bold text-white  absolute'>
                        {props.text}
                    </p>

                </div>
            </div>
            
            
        
    
  )
}
export default Innovation;

