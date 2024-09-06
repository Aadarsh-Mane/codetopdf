import { useState, useContext } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import { PdfContext } from './PdfContext';

const PdfCustomizer = () => {
  const [content, setContent] = useState({
    title: '',
    aim: '',  // New Aim field
    body: '',
  });
  const { pdfData } = useContext(PdfContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContent({ ...content, [name]: value });
  };

  const generatePDF = async () => {
    try {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
  
      // Add a page in A4 size (595.28 x 841.89 points)
      const page = pdfDoc.addPage([595.28, 841.89]);
  
      const { title, body } = content;
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      const fontSize = 12;
  
      // Centering and bold simulation for the title
      if (title) {
        const titleFontSize = 18;
        const titleWidth = timesRomanFont.widthOfTextAtSize(title, titleFontSize);
        const titleX = (page.getWidth() - titleWidth) / 2;
  
        // Draw the title twice slightly offset to simulate boldness
        page.drawText(title.toUpperCase(), {
          x: titleX,
          y: page.getHeight() - 80, // Adjust Y for the title
          size: titleFontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
        page.drawText(title.toUpperCase(), {
          x: titleX + 0.5,
          y: page.getHeight() - 80 + 0.5,
          size: titleFontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
      }
  
      // Text with aim, theory, code, and output sections
      const text = `Aim:${content.aim || ''}\n\n\n\bTheory:${body}\n\n\nCode:\n\n${pdfData.code || ''}\n\n\nOutput:\n\n${pdfData.output || ''}`;
  
      // Draw the rest of the text
      page.drawText(text, {
        x: 40,
        y: page.getHeight() - 120, // Start text below the title
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
        maxWidth: page.getWidth() - 80, // Keep text within the margins
      });
  
      // Save the PDF and trigger download
      const pdfBytes = await pdfDoc.save();
      saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), `${title || 'document'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  
  

  const generateWord = () => {
    try {
      const doc = new Document({
        creator: 'Your Company',
        description: 'A custom Word document',
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                alignment: 'center', // Center the title
                children: [
                  new TextRun({ text: content.title, bold: true, size: 28 }),
                ],
              }),
              new Paragraph({ children: [new TextRun('\n')] }), // Add space after the title
              new Paragraph({
                children: [
                  new TextRun({ text: 'Aim:\n', bold: true }),
                  new TextRun(content.aim),
                ],
              }),
              new Paragraph({ children: [new TextRun('\n')] }), // Add space before the theory section
              new Paragraph({
                children: [
                  new TextRun({ text: 'Theory:\n', bold: true }),
                  new TextRun(content.body),
                ],
              }),
              new Paragraph({ children: [new TextRun('\n')] }), // Add space before the code section
              new Paragraph({
                children: [
                  new TextRun({ text: 'Code:\n', bold: true }),
                  new TextRun(pdfData.code || ''),
                ],
              }),
              new Paragraph({ children: [new TextRun('\n')] }), // Add space before the output section
              new Paragraph({
                shading: {
                  type: 'solid',
                  color: 'E0E0E0', // Background color in hex (light gray)
                  fill: 'E0E0E0', // Fill color in hex
                },
                children: [
                  new TextRun({ text: 'Output:\n', bold: true }),
                  new TextRun({
                    text: pdfData.output || '',
                    color: '000000', // Text color in hex (black)
                  }),
                ],
              }),
            ],
          },
        ],
      });
  
      Packer.toBlob(doc)
        .then((blob) => {
          saveAs(blob, `${content.title || 'document'}.docx`);
        })
        .catch((error) => {
          console.error('Error generating Word document:', error);
        });
    } catch (error) {
      console.error('Error in generateWord function:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-4xl font-semibold text-gray-800 mb-6">PDF Customizer</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={content.title}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="aim" className="block text-lg font-medium text-gray-700 mb-2">
          Aim
        </label>
        <textarea
          id="aim"
          name="aim"
          value={content.aim}
          onChange={handleInputChange}
          rows="3"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="body" className="block text-lg font-medium text-gray-700 mb-2">
          Theory
        </label>
        <textarea
          id="body"
          name="body"
          value={content.body}
          onChange={handleInputChange}
          rows="10"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="code" className="block text-lg font-medium text-gray-700 mb-2">
          Code from Code Editor
        </label>
        <textarea
          id="code"
          name="code"
          value={pdfData.code || ''}
          readOnly
          rows="10"
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="output" className="block text-lg font-medium text-gray-700 mb-2">
          Output from Code Editor
        </label>
        <textarea
          id="output"
          name="output"
          value={pdfData.output || ''}
          readOnly
          rows="10"
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
        ></textarea>
      </div>
      <div className="mt-6 text-center space-x-4">
        <button
          onClick={generatePDF}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
        >
          Download PDF
        </button>
        <button
          onClick={generateWord}
          className="bg-green-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-green-700 transition duration-300"
        >
          Download Word
        </button>
      </div>
    </div>
  );
};

export default PdfCustomizer;
