import React, { useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/web/pdf_viewer.css';

// Set the worker source for PDF.js to handle PDF rendering in a separate thread
//  Worker source refers to the script that is loaded and executed in a web worker—a background thread separate from the main JavaScript thread of a web application. This allows the web application to perform tasks without blocking the user interface or affecting the main thread’s performance.
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function PDFViewer({ pdfUrl }) {
    // Reference to the canvas element where the PDF will be rendered
    const viewerRef = useRef(null);

    useEffect(() => {
        // Load the PDF document from the provided URL
        const loadingTask = pdfjsLib.getDocument(pdfUrl);

        loadingTask.promise.then((pdf) => {
            // Fetch the first page of the PDF
            pdf.getPage(1).then((page) => {
                // Set the scale for the PDF page rendering
                const scale = 1.5;
                const viewport = page.getViewport({ scale });

                // Get the canvas element from the reference
                const canvas = viewerRef.current;
                const context = canvas.getContext('2d');
                
                // Set canvas dimensions based on the PDF page size
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Define the rendering context with the canvas context and viewport
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };

                // Render the PDF page onto the canvas
                page.render(renderContext);
            });
        }).catch(error => {
            // Handle any errors during the PDF loading process
            console.error('Error loading PDF:', error);
        });
    }, [pdfUrl]); // Effect depends on the pdfUrl prop

    // Render a canvas element to display the PDF
    return <canvas ref={viewerRef}></canvas>;
}

export default PDFViewer;
