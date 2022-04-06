import React, { useRef, useState } from "react";
import { Preview } from "./Preview";
import { ImageTemplate } from "./ImageTemplate";
import { Sidebar } from "./Sidebar";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Template } from "./Template";

const Report = () => {
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [programName, setProgramName] = useState<string>("");
  const [organizer, setOrganizer] = useState<string>("");
  const [venue, setVenue] = useState<string>("");

  const [isPhoto, setIsPhoto] = useState<boolean>(false);
  const [photo, setPhoto] = useState<any[]>([]);

  const [editMode, setEditMode] = useState<boolean>(false);

  const [tentative, setTentative] = useState<any>([]);

  const uploadRef = useRef<HTMLInputElement>(null);

  const contentHandler = (e: any) => {
    if (e.key === "Enter") {
      setContent(`${e.target.value}\n`);
    }
    setContent(e.target.value);
  };

  const uploadFile = () => {
    if (uploadRef.current !== null) {
      uploadRef.current.click();
    }
  };

  const addTentativeHandler = () => {
    setTentative([...tentative, { tentative: ''}])
  }

  const removeTentativeHandler = (index: number) => {
    const tentativeList = [...tentative];
    tentativeList.splice(index);
    setTentative(tentativeList);
  }

  const fileSelectorHandler = (e: any) => {
    const tempArr: any = [];

    console.log(e.target.files);
    [...e.target.files].map((file) => {
      return tempArr.push({
        data: file,
        url: URL.createObjectURL(file),
      });
    });

    setPhoto(tempArr);
    setIsPhoto(true);
  };


  return (
    <div className="lg:grid grid-cols-5 h-full">
      <Sidebar
        title={title}
        content={content}
        date={date}
        organizer={organizer}
        venue={venue}
        programName={programName}
        setTitle={setTitle}
        setContent={setContent}
        setProgramName={setProgramName}
        setOrganizer={setOrganizer}
        setVenue={setVenue}
        setDate={setDate}
        contentHandler={contentHandler}
        uploadFile={uploadFile}
        uploadRef={uploadRef}
        fileSelectorHandler={fileSelectorHandler}
        tentative={tentative}
        addTentativeHandler={addTentativeHandler}
        removeTentativeHandler={removeTentativeHandler}

      />

      <section className="hidden lg:flex flex-col col-start-3 col-end-[-1] bg-[#525659] ">
        <div className="h-[800px] w-[500px] m-auto mt-10">
            <Preview
              title={title}
              content={content}
              name={programName}
              organizer={organizer}
              date={date}
              venue={venue}
              isPhoto={isPhoto}
              photo={photo} 
            />
          </div>

        {content.length > 2186 ? (
          <div className="my-2.5 h-[800px] w-[500px] font-Arimo font-normal m-auto bg-white rounded-sm p-10 flex flex-col text-[12px] relative">
            {content
              .slice(2186, content.length)
              .split("\n")
              .map((text, index) => {
                console.log(text.length);
                return (
                  <p key={index} className=" indent-8 mt-2.5 text-justify leading-[10px]">
                    {text}
                  </p>
                );
              })}


            <section
              className={`mt-10 ${
                content.length > 2186 ? null : "hidden"
              } absolute bottom-10`}
            >
              <p>Disediakan oleh: </p>
              <div className=" border-b-2 border-dotted border-black w-[80px] mt-2 h-[30px]">
                <img
                  src="/assets/signature.png"
                  alt="signature"
                  className="object-cover h-[30px] mx-auto"
                />
              </div>
              <section className="text-[8px]">
                <p>(MUHAMMAD ZULASRAF BIN ZULKIFLI)</p>
                <p>(PENGARAH)</p>
              </section>
            </section>

          </div>
        ) : null}
        
        <ImageTemplate isPhoto={isPhoto} photo={photo} />

        {tentative.length >= 1 ? (
          <div className="my-2.5 h-[800px] w-[500px] font-Arimo font-normal m-auto bg-white rounded-sm p-10 flex flex-col text-[12px] relative">
            <h1 className="font-bold">TENTATIF PROGRAM</h1>
          </div>
        ): null}

        <section className="mt-10 flex justify-end mr-10">
          <button className="mt-10 bg-green-500 text-white px-3 py-2 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-green-400 cursor-pointer w-[100px] mr-5">
            Verify
          </button>

        <button className="mt-10 bg-blue-500 text-white px-3 py-2 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-blue-400 cursor-pointer w-[100px] " onClick={() => setEditMode(!editMode)} >
          {editMode ? (
          <PDFDownloadLink
            document={
              <Template
                title={title}
                content={content}
                name={programName}
                organizer={organizer}
                date={date}
                venue={venue}
                isPhoto={isPhoto}
                photo={photo}
              />
            }
            fileName={title}
          >
            {({ loading }: any) =>
              loading ? "Loading document..." : "Download"
            }
          </PDFDownloadLink>
          ) : 'Save'}
          
        </button>
      </section>  
      </section>
    </div>
  );
};

export default Report;
