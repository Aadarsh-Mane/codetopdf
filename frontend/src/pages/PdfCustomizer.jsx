import { useState, useContext } from 'react';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import { PdfContext } from './PdfContext';
import axios from 'axios';

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
                alignment: 'center',
                children: [
                  new TextRun({ text: content.title, bold: true, size: 28 }),
                ],
              }),
              new Paragraph({ children: [new TextRun('\n')] }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'Aim:\n', bold: true }),
                  new TextRun(content.aim),
                ],
              }),
              new Paragraph({ children: [new TextRun('\n')] }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'Theory:\n', bold: true }),
                  new TextRun(content.body),
                ],
              }),
              new Paragraph({ children: [new TextRun('\n')] }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'Code:\n', bold: true }),
                  new TextRun(pdfData.code || ''),
                ],
              }),
              new Paragraph({ children: [new TextRun('\n')] }),
              new Paragraph({
                shading: {
                  type: 'solid',
                  color: 'E0E0E0',
                  fill: 'E0E0E0',
                },
                children: [
                  new TextRun({ text: 'Output:\n', bold: true }),
                  new TextRun({
                    text: pdfData.output || '',
                    color: '000000',
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

  const handleDownloadPDF = async () => {
    try {
      const wordFileUrl = 'https://my.url/file.docx'; // Replace with your Word file URL

      const response = await axios.post('https://sync.api.cloudconvert.com/v2/jobs', {
        tasks: {
          'import-my-file': {
            operation: 'import/url',
            url: wordFileUrl,
          },
          'convert-my-file': {
            operation: 'convert',
            input: 'import-my-file',
            input_format: 'docx',
            output_format: 'pdf',
          },
          'export-my-file': {
            operation: 'export/url',
            input: 'convert-my-file',
          },
        },
        redirect: true,
      }, {
        headers: {
          'Authorization': `Bearer YOUR_CLOUDCONVERT_API_KEY`, // Replace with your API key
          'Content-Type': 'application/json',
        },
      });

      const jobId = response.data.data.id;

      // Poll for the job status
      const pollJobStatus = async () => {
        try {
          const jobResponse = await axios.get(`https://sync.api.cloudconvert.com/v2/jobs/${jobId}`, {
            headers: {
              'Authorization': `Bearer YOUR_CLOUDCONVERT_API_KEY`, // Replace with your API key
            },
          });

          if (jobResponse.data.data.status === 'finished') {
            const exportTask = jobResponse.data.data.tasks.find(task => task.name === 'export-my-file');
            if (exportTask && exportTask.result && exportTask.result.files && exportTask.result.files.length > 0) {
              window.open(exportTask.result.files[0].url, '_blank');
            }
          } else if (jobResponse.data.data.status === 'failed') {
            console.error('Conversion failed.');
          } else {
            // Poll again in 5 seconds
            setTimeout(pollJobStatus, 5000);
          }
        } catch (error) {
          console.error('Error checking job status:', error);
        }
      };

      // Start polling for job status
      pollJobStatus();
    } catch (error) {
      console.error('Error creating conversion job:', error);
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
          Output from Code Execution
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
      <div className="flex gap-4">
        {/* <button
          onClick={generatePDF}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Download PDF
        </button> */}
        <button
          onClick={generateWord}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Download Word
        </button>
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default PdfCustomizer;
