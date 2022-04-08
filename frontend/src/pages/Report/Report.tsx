import React, { useRef, useState } from "react";
import { Preview } from "./Preview";
import { ImageTemplate } from "./ImageTemplate";
import { Sidebar } from "./Sidebar";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Template } from "./Template";
import { PasswordModal } from "./PasswordModal";

const Report = () => {
  
  // ? report state
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [programName, setProgramName] = useState<string>("");
  const [organizer, setOrganizer] = useState<string>("");
  const [venue, setVenue] = useState<string>("");
  const [isPhoto, setIsPhoto] = useState<boolean>(false);
  const [photo, setPhoto] = useState<any[]>([]);
  const [tentative, setTentative] = useState<any>([]);
  const [ajk, setAjk] = useState<any>([]);

  //? utils
  const [editMode, setEditMode] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  //ref
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
    setTentative([...tentative, { tentative: {time: '', activities: ''}}])
  }

  const removeTentativeHandler = (index: number) => {
    const tentativeList = [...tentative];
    tentativeList.splice(index);
    setTentative(tentativeList);
  }

  const handleTentative = (e: any, index: number) => {
    const {name, value} = e.target
    const tentativeList = [...tentative];

    if (e.key === "Enter") {
      tentativeList[index]['tentative']['activities'] = value + '\n';
    }
    
    tentativeList[index]['tentative'][name] = value;
    setTentative(tentativeList);
  }

  const addAjkHandler = () => {
    setAjk([...ajk, { ajk: {role: '', names: ''}}])
  }

  const removeAjkHandler = (index: number) => {
    const AjkList = [...ajk];
    AjkList.splice(index);
    setAjk(AjkList);
  }

  const handleAjk = (e: any, index: number) => {
    const {name, value} = e.target
    const AjkList = [...ajk];
    
    AjkList[index]['ajk'][name] = value;
    setAjk(AjkList);
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
        handleTentative={handleTentative}
        addAjkHandler={addAjkHandler}
        removeAjkHandler={removeAjkHandler}
        handleAjk={handleAjk}
        ajk={ajk}
        editMode={editMode}
        setEditMode={setEditMode}
        showModal={showModal} setShowModal={setShowModal}
      />

      <section className="hidden lg:flex flex-col col-start-3 col-end-[-1] bg-[#525659] ">
        <div className="h-[800px] overflow-y-auto overflow-x-hidden w-[500px] m-auto mt-10 fixed left-[50%]">

          {/* <PDFViewer 
            showToolbar={false}
            style={{
              width: '100%',
              height: '95%',
            }}>

          </PDFViewer> */}
            <Preview
              title={title}
              content={content}
              name={programName}
              organizer={organizer}
              date={date}
              venue={venue}
              isPhoto={isPhoto}
              photo={photo} 
              tentative={tentative}
              ajk={ajk}
            />
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

                <div className="ml-10">
                  <section className="flex flex-row py-[8px] font-bold mt-10">
                    <p className="mr-10">MASA</p>
                    <p className="absolute left-[200px] max-w-[200px] break-words">AKTIVITI</p>
                  </section>
                  <section>
                    {tentative.map((row: any, index: number) => {
                      return(
                        <section key={index} className="flex flex-row py-[8px]">
                          <p className="mr-10">{row.tentative.time}</p>
                          <section>

                          {row.tentative.activities.split("\n").map((act: string, num: number) => {
                            return(
                              <p key={num} className="absolute left-[200px] max-w-[200px] break-words">{act}</p>
                            )
                          })}
                          </section>
                        </section>
                      )
                    })}
                  </section>

                </div>
              </div>
            ): null}

            {ajk.length >= 1 ? (
              <div className="my-2.5 h-[800px] w-[500px] font-Arimo font-normal m-auto bg-white rounded-sm p-10 flex flex-col text-[12px] relative whitespace-pre-line">
                <h1 className="font-bold">JAWATANKUASA</h1>

                <div className="ml-10">
                  <section className="flex flex-row py-[8px] font-bold mt-10">
                    <p >JAWATAN</p>
                    <p className="absolute left-[200px] ">NAMA</p>
                  </section>
                  <section>
                    {ajk.map((row: any, index: number) => {
                      return(
                        <section key={index} className="flex flex-row py-[8px]">
                          <section className="max-w-[110px] break-words">
                            <p >{row.ajk.role}</p>
                          </section>
                          <section className="max-w-[300px] break-words">
                          {row.ajk.names.split("\n").map((act: string, num: number) => {
                            return(
                              <p className="absolute left-[200px]  max-w-[200px] break-words" key={num} >{act}</p>
                            )
                          })}
                          </section>
                        </section>
                      )
                    })}
                  </section>

                </div>
              </div>
            ): null}
          </div>


        <section className="mt-10 flex justify-end mr-10">
         
        {editMode ? (
          <button className="mt-10 bg-blue-500 text-white px-3 py-2 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-blue-400 cursor-pointer w-[70px] h-[70px] fixed right-5 bottom-5
           " onClick={() => setEditMode(!editMode)} >
          
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
                tentative={tentative}
                ajk={ajk}
              />
            }
            fileName={title}
          >
            {({ loading }: any) =>
              loading ? <img src="/assets/loading.svg" className="w-[30px] h-[30px] animate-spin m-auto" alt="loading" /> : <i className="fa-solid fa-file-arrow-down fa-xl"></i>
            }
            
          </PDFDownloadLink>
          
        </button>
        ) : null}
      </section>  

      <PasswordModal showModal={showModal} setShowModal={setShowModal} />
      </section>
    </div>
  );
};

export default Report;
