import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TermsService from './components/TermsService';
import PrivacyPolicy from './components/PrivacyPolicy';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { PdfProvider } from './pages/PdfContext'; // Import the PdfProvider
import CodeEditor1 from './pages/CodeEditor1';
import JoinRoom from './pages/JoinRoom';
import TextGenerator from './pages/GeminiAi';

// Lazy load other components
const CodeEditor = lazy(() => import('./pages/CodeEditor'));
const PdfCustomizer = lazy(() => import('./pages/PdfCustomizer'));
const AiSuggestions = lazy(() => import('./pages/AiSuggestions'));
const Collaborate = lazy(() => import('./pages/Collaborate'));

function App() {
  return (
    <PdfProvider> {/* Wrap the app with PdfProvider */}
      <div className="flex flex-col min-h-screen">
        <Router>
          <Navbar />
          <main className="flex-grow pt-16">
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/done" element={<JoinRoom />} />
                <Route path="/editor/:roomId" element={<CodeEditor1 />} />
                <Route path="/editor" element={<CodeEditor />} />
                <Route path="/customizer" element={<PdfCustomizer />} />
                <Route path="/ai-suggestions" element={<AiSuggestions />} />
                <Route path="/collaborate" element={<Collaborate />} />
                <Route path="/next-ai" element={<TextGenerator />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsService />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </Router>
      </div>
    </PdfProvider>
  );
}

export default App;
