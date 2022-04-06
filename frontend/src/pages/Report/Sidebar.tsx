import React from 'react'
import { Input } from "../../components/Input";
import { Image } from "../../icons/Image";

type Props = {
    title: string,
    content: string,
    programName: string,
    date:string,
    organizer: string,
    venue: string,
    tentative: any

    setTitle: React.Dispatch<React.SetStateAction<string>>
    setContent: React.Dispatch<React.SetStateAction<string>>
    setProgramName: React.Dispatch<React.SetStateAction<string>>
    setOrganizer: React.Dispatch<React.SetStateAction<string>>
    setVenue: React.Dispatch<React.SetStateAction<string>>
    setDate: React.Dispatch<React.SetStateAction<string>>
    addTentativeHandler: any
    removeTentativeHandler: any

    contentHandler: (e: any) => void
    uploadFile: () => void
    uploadRef: any
    fileSelectorHandler: (e: any) => void

}

export const Sidebar = (props: Props) => {

  return (
    <section className="my-10 mx-5  lg:mx-10 col-start-1 col-end-3">
        {/* heading */}
        <h1 className="text-center font-medium text-2xl">Report Maker</h1>

        <div className="mt-10">
          <section className="w-full my-5">
            <p className="my-1 text-sm text-gray-400 ml-1">Title</p>
            <Input
              type="text"
              placeholder=""
              value={props.title}
              onChange={(e) => props.setTitle(e.target.value)}
            />
          </section>

          <section className="grid grid-cols-2 gap-5 my-5">
            <div>
              <p className="my-1 text-sm text-gray-400 ml-1">Program Name</p>
              <input
                type="text"
                className="bg-blue-50 px-3 py-3 rounded-lg outline-none w-full"
                value={props.programName}
                onChange={(e) => props.setProgramName(e.target.value)}
              />
            </div>
            <div>
              <p className="my-1 text-sm text-gray-400 ml-1">Organizer</p>
              <input
                type="string"
                className="bg-blue-50 px-3 py-3 rounded-lg outline-none w-full"
                value={props.organizer}
                onChange={(e) => props.setOrganizer(e.target.value)}
              />
            </div>
          </section>

          <section className="grid grid-cols-2 gap-5 my-5">
            <div>
              <p className="my-1 text-sm text-gray-400 ml-1">Date</p>
              <input
                type="date"
                className="bg-blue-50 px-3 py-3 rounded-lg outline-none w-full"
                value={props.date}
                data-date-format="DD MMMM YYYY"
                onChange={(e) => props.setDate(e.target.value)}
              />
            </div>
            <div>
              <p className="my-1 text-sm text-gray-400 ml-1">Venue</p>
              <input
                type="string"
                className="bg-blue-50 px-3 py-3 rounded-lg outline-none w-full"
                value={props.venue}
                onChange={(e) => props.setVenue(e.target.value)}
              />
            </div>
          </section>

          <section className="w-full my-5">
            <p className="my-1 text-sm text-gray-400 ml-1">Content</p>
            <textarea
              cols={30}
              rows={13}
              value={props.content}
              onChange={props.contentHandler}
              onKeyPress={props.contentHandler}
              className="bg-blue-50 px-3 py-3 rounded-lg outline-none w-full resize-none"
            />
          </section>

          <section
            className="my-5 flex items-center text-blue-400 cursor-pointer 
          "
            onClick={props.uploadFile}
          >
            <div className="px-3 rounded-md bg-blue-50">
              <Image />
            </div>
            <p className="ml-5 font-medium">Upload Images</p>
            <input
              type="file"
              accept="image/*"
              multiple={true}
              name="upload"
              className="hidden"
              ref={props.uploadRef}
              onChange={(e) => props.fileSelectorHandler(e)}
            />
          </section>

          <section className='my-10 '>
            <h2 className='text-gray-400 text-center mb-10'>Tentative</h2>

            {props.tentative.map((ten: any, index: number) => {
              return (
              <div key={index} className='my-5'>
                <section className='flex items-start justify-between'>
                  <input type="time" name="" id="" className='bg-blue-50 outline-none p-2 rounded-lg'/>
                  <textarea className='bg-blue-50 px-4 rounded-lg outline-none w-[60%]'/>
                  {props.tentative.length >= 1 && (
                    <button className='bg-red-500 w-7 h-7 rounded-full my-auto text-white' onClick={()=> props.removeTentativeHandler(index)}>-</button>
                  )}
                </section>
              </div>
            )
          })}
          { props.tentative.length <= 10 && (
            <button className='bg-blue-500 w-10 h-10 rounded-full my-auto text-white' onClick={props.addTentativeHandler}>+</button>
          )}
          </section>
          
        </div>
      </section>

  )
}

