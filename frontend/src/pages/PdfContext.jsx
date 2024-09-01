import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

// Create Context
const PdfContext = createContext();

// Context Provider Component
export const PdfProvider = ({ children }) => {
  const [pdfOutput, setPdfOutput] = useState("");

  return (
    <PdfContext.Provider value={{ pdfOutput, setPdfOutput }}>
      {children}
    </PdfContext.Provider>
  );
};

PdfProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom Hook to use PdfContext
// eslint-disable-next-line react-refresh/only-export-components
export const usePdf = () => {
  const context = useContext(PdfContext);
  if (!context) {
    throw new Error('usePdf must be used within a PdfProvider');
  }
  return context;
};

export { PdfContext };
