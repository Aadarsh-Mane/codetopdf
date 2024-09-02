import { useState, useContext } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import { PdfContext } from './PdfContext'; // Import the context

const PdfCustomizer = () => {
  const [content, setContent] = useState({
    title: '',
    body: '',
  });
  const { pdfOutput } = useContext(PdfContext); // Use context to get PDF output

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContent({ ...content, [name]: value });
  };

  const generatePDF = () => {
    const input = document.getElementById('pdf-preview');

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save(`${content.title || 'document'}.pdf`);
    });
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
        <label htmlFor="body" className="block text-lg font-medium text-gray-700 mb-2">
          Body
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
        <label htmlFor="output" className="block text-lg font-medium text-gray-700 mb-2">
          Output from Code Editor
        </label>
        <textarea
          id="output"
          name="output"
          value={pdfOutput || ''}
          readOnly
          rows="10"
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
        ></textarea>
      </div>
      <div id="pdf-preview" className="p-6 bg-gray-100 border border-gray-300 rounded-md">
        <h3 className="text-2xl font-bold text-gray-800">{content.title}</h3>
        <p className="mt-4 text-lg text-gray-600">{content.body}</p>
        {pdfOutput && (
          <div className="mt-4">
            <h4 className="text-lg font-semibold text-gray-800">Code Output:</h4>
            <pre className="p-4 border border-gray-300 rounded-md bg-gray-50">{pdfOutput}</pre>
          </div>
        )}
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={generatePDF}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default PdfCustomizer;
