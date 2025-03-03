import React, { useState, useEffect, useRef } from 'react';
import pdf from './catalogue.pdf';

const ScrollablePdfViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const pagesRef = useRef([]);
  const fileUrl = pdf;
  const fileName = "catalogue.pdf"; // Display filename
  
  // Load PDF on component mount
  useEffect(() => {
    let mounted = true;
    let pdfDocumentProxy = null;
    
    const loadPdf = async () => {
      try {
        setLoading(true);
        
        // Import PDF.js - using build instead of webpack
        const pdfjs = await import('pdfjs-dist/build/pdf');
        
        // Set worker source from CDN
        pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
        
        // Load the PDF document
        const loadingTask = pdfjs.getDocument(fileUrl);
        pdfDocumentProxy = await loadingTask.promise;
        
        if (!mounted) return;
        
        setNumPages(pdfDocumentProxy.numPages);
        
        // Render all pages
        renderAllPages(pdfjs, pdfDocumentProxy);
      } catch (err) {
        console.error('Error loading PDF:', err);
        if (mounted) {
          setError(`Failed to load PDF: ${err.message}`);
          setLoading(false);
        }
      }
    };
    
    // Function to render all pages
    const renderAllPages = async (pdfjs, pdf) => {
      if (!mounted || !containerRef.current) return;
      
      try {
        // Initialize refs array with correct length
        pagesRef.current = Array(pdf.numPages).fill().map((_, i) => 
          pagesRef.current[i] || React.createRef());
        
        // Force a re-render to create canvas elements
        setNumPages(pdf.numPages);
        
        // Small delay to ensure canvas elements are created
        setTimeout(async () => {
          if (!mounted) return;
          
          // Calculate optimal scale based on container width
          const containerWidth = Math.min(800, window.innerWidth - 40);
          
          // Render each page
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            if (!mounted) return;
            
            const page = await pdf.getPage(pageNum);
            const canvas = pagesRef.current[pageNum - 1].current;
            
            if (!canvas) continue;
            
            const context = canvas.getContext('2d');
            const viewport = page.getViewport({ scale: 1 });
            const scale = containerWidth / viewport.width;
            const scaledViewport = page.getViewport({ scale });
            
            // Set canvas dimensions
            canvas.width = scaledViewport.width;
            canvas.height = scaledViewport.height;
            
            // Render PDF page
            const renderContext = {
              canvasContext: context,
              viewport: scaledViewport,
            };
            
            await page.render(renderContext).promise;
          }
          
          if (mounted) {
            setLoading(false);
          }
        }, 100);
      } catch (err) {
        console.error('Error rendering pages:', err);
        if (mounted) {
          setError(`Failed to render pages: ${err.message}`);
          setLoading(false);
        }
      }
    };
    
    loadPdf();
    
    // Cleanup function
    return () => {
      mounted = false;
      if (pdfDocumentProxy) {
        pdfDocumentProxy.destroy().catch(console.error);
      }
    };
  }, [fileUrl]);
  
  return (
    <div className="flex flex-col items-center w-full p-4">
      {/* File path/name display */}
     
      {error ? (
        <div className="text-red-500 text-center p-4 border border-red-200 bg-red-50 rounded w-full max-w-4xl">
          {error}
        </div>
      ) : (
        <div 
          ref={containerRef} 
          className="border border-gray-300 rounded-b shadow-md w-full max-w-4xl overflow-y-auto h-screen max-h-screen relative"
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
              <div className="text-blue-500">Loading...</div>
            </div>
          )}
          
          {numPages && Array.from(new Array(numPages), (el, index) => (
            <div key={`page_${index + 1}`} className="flex justify-center border-b border-gray-200 last:border-0 py-4">
              <canvas ref={pagesRef.current[index]} className="block" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScrollablePdfViewer;