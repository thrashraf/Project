import React, { useRef, useState } from "react";
import { Preview } from "./Preview";
import { ImageTemplate } from "./ImageTemplate";
import { Sidebar } from "./Sidebar";
import { PasswordModal } from "./PasswordModal";
import api from '../../utils/api'
import { useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/user/User";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/Toast";

const Report = () => {

  const { user }: any = useAppSelector(userSelector);
  
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
  const [showModal, setShowModal] = useState<boolean>(false);

  //ref
  const uploadRef = useRef<HTMLInputElement>(null);
  const toastRef = useRef<any>(null);

  //user
  const [password, setPassword] = useState<string>('');

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();


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
    setTentative([...tentative,{time: '', activities: ''}])
  }

  const removeTentativeHandler = (index: number) => {
    const tentativeList = [...tentative];
    tentativeList.splice(index);
    setTentative(tentativeList);
  }

  const handleTentative = (e: any, index: number) => {
    const {name, value} = e.target
    const tentativeList = [...tentative];

    tentativeList[index][name] = value;
    setTentative(tentativeList);
  }

  const addAjkHandler = () => {
    setAjk([...ajk, {role: '', names: ''}])
  }

  const removeAjkHandler = (index: number) => {
    const AjkList = [...ajk];
    AjkList.splice(index);
    setAjk(AjkList);
  }

  const handleAjk = (e: any, index: number) => {
    const {name, value} = e.target
    const AjkList = [...ajk];
    
    AjkList[index][name] = value;
    setAjk(AjkList);
  }


  const fileSelectorHandler = (e: any) => {
    const tempArr: any = [];

    console.log(e.target.files);
    tempArr.push(...e.target.files)

    setPhoto(tempArr);
    setIsPhoto(true);
  };

  const authHandler = async (e: any) => {
    
    e.preventDefault();

    const email = user.email
    const reqPassword = password

    await api.post('/api/user/auth', {email, reqPassword})
    .then(res => {
      console.log(res);
      formHandler(e)
    })
  };

  const timeConvertor = (time: any) => {
    // first checks the correct time format and then split it into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If the time format is correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM based on given hour
      time[0] = +time[0] % 12 || 12; // change the hour based on AM/PM
    }
    return time.join (''); // return new time format as a String
  }

  const formHandler = async (e: any) => {
    
    e.preventDefault();

    const formData: any = new FormData(); // Currently empty

    formData.append('userId', user.id);
    formData.append('owner', user.name);
    formData.append('profile_picture', user.profile_picture);
    formData.append("title", title);
    formData.append("date", date);
    formData.append("organizer", organizer);
    formData.append("venue", venue);
    formData.append("content", content);
    photo.forEach(tag => formData.append('upload', tag));
    tentative.forEach((tentative: any) => formData.append("tentative",JSON.stringify(tentative)));
    ajk.forEach((ajk: any) => formData.append("ajk", JSON.stringify(ajk)));
    
    await api.post('/api/report/createReport', formData)
    .then(res => {
      setMessage('Successful submit report! 🎉');
      setStatus('success')
      toastRef.current.showToast();
      setTimeout(() => {
        navigate('/profile/documents');
      }, 4000)
    })
    .catch(err => {
      console.log(err);
      setMessage('Something went wrong...');
      setStatus('error');
      toastRef.current.showToast();
    })
  };


  return (
    <div className="lg:grid grid-cols-5 h-full">

      <Toast message={message} status={status} ref={toastRef} />
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
        showModal={showModal} 
        setShowModal={setShowModal}
        password={password}
        formHandler={formHandler}
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
                    <p>({user && user.name})</p>
                    {/* <p>(PENGARAH)</p> */}
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
                          <p className="mr-10">{timeConvertor(row.time)}</p>
                          <section>

                          {row.activities.split("\n").map((act: string, num: number) => {
                            return(
                              //fix absolute
                              <p key={num} className="max-w-[200px] break-words relative left-[50px]">{act}</p>
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
                            <p >{row.role}</p>
                          </section>
                          <section className="max-w-[300px] break-words">
                          {row.names.split("\n").map((act: string, num: number) => {
                            return(
                              <p className="max-w-[200px] break-words relative left-[90px]" key={num} >{act}</p>
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
      <PasswordModal showModal={showModal} setShowModal={setShowModal} password={password} setPassword={setPassword} authHandler={authHandler} />
      </section>
    </div>
  );
};

export default Report;
