import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Specify the worker file
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ViewCatalogue = () => {
  const fileUrl = '/catalogue.pdf'; // Update this path to your actual PDF file URL

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Document file={fileUrl} onLoadError={(error) => console.error('PDF loading error:', error)}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default ViewCatalogue;