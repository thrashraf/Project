import React from 'react';
import { useParams } from 'react-router-dom';

type Props = {};

const PdfViewer = (props: Props) => {
  const src = useParams();

  return (
    <iframe
      width='100%'
      height='800'
      frameBorder='0'
      src="http://docs.google.com/gview?url=https://sams-upload.s3.ap-southeast-1.amazonaws.com/Resume_Zulasraf1654247772978.pdf cell's File's File's URL&embedded=true"
    ></iframe>
  );
};

export default PdfViewer;
