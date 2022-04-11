import { PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Template } from "../Report/Template";



const VerifyReport = () => {
    
    const [report, setReport] = useState<any>(null);

    const { state }: any = useLocation();

    useEffect(() => {
        setReport(state)
    }, [state])

    console.log(state)

  return (
    <>
        {report !== null ? (
            <div className="w-full h-full bg-black">
            <PDFViewer
                showToolbar={true}
                style={{
                width: "100%",
                height: "100%",
                }}
            >
                <Template
                title={report.program_name}
                content={report.content}
                name={report.program_name}
                organizer={report.organizer}
                date={report.date}
                venue={report.venue}
                photo={report.images}
                tentative={report.tentative}
                ajk={report.ajk}
                />
            </PDFViewer>
            </div>
        ) : 'loading...'}
    </>
  );
};

export default VerifyReport;
