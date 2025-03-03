import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Use local worker
pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;

const ViewCatalogue = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState(null);
  const fileUrl = "/catalogue.pdf";

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error("PDF loading error:", error);
    setError(error.message);
  };

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        padding: "20px",
      }}
    >
      {error ? (
        <div style={{ color: "red", textAlign: "center" }}>
          Error loading PDF: {error}
        </div>
      ) : (
        <>
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<div>Loading PDF...</div>}
            error={<div>Failed to load PDF file</div>}
          >
            <Page
              pageNumber={pageNumber}
              width={Math.min(800, window.innerWidth - 40)}
            />
          </Document>
          {numPages && (
            <div style={{ marginTop: "10px" }}>
              <p>
                Page {pageNumber} of {numPages}
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => changePage(-1)}
                  disabled={pageNumber <= 1}
                >
                  Previous
                </button>
                <button
                  onClick={() => changePage(1)}
                  disabled={pageNumber >= numPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ViewCatalogue;