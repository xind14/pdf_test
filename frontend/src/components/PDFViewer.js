import React, { useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/web/pdf_viewer.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function PDFViewer({ pdfUrl }) {
    const viewerRef = useRef(null);

    useEffect(() => {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        loadingTask.promise.then((pdf) => {
            pdf.getPage(1).then((page) => {
                const scale = 1.5;
                const viewport = page.getViewport({ scale });
                
                const canvas = viewerRef.current;
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };
                page.render(renderContext);
            });
        });
    }, [pdfUrl]);

    return <canvas ref={viewerRef}></canvas>;
}

export default PDFViewer;
