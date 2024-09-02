import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TermsService from './components/TermsService';
import PrivacyPolicy from './components/PrivacyPolicy';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { PdfProvider } from './pages/PdfContext'; // Import the PdfProvider

// Lazy load other components
const CodeEditor = lazy(() => import('./pages/CodeEditor'));
const PdfCustomizer = lazy(() => import('./pages/PdfCustomizer'));
const AiSuggestions = lazy(() => import('./pages/AiSuggestions'));
const Collaborate = lazy(() => import('./pages/Collaborate'));

function App() {
<<<<<<< HEAD
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");
  const handleSubmit = async () => {
    // console.log(code);
    const payload = {
      language,
      code,
    };
    try {
      const { data } = await axios.post("http://localhost:7000/run", payload);
      setOutput(data.output);
      // setCode("");
      console.log(data);
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Unknown error occurred";
      console.error("Error executing code:", errorMessage);
      setOutput(`Error: ${errorMessage}`);
      // setOutput("Error executing code");
      // const errorMessage = error.response?.data?.error || "Unknown error";
      // setOutput(errorMessage);
    }
  };
  return (
    <>
      <div>
        <h1>Online code to pdf</h1>
        <div>
          <label>Language : </label>

          <select value={language}
            onChange={
              (e) => {
                setLanguage(e.target.value);
                console.log(e.target.value);
              }
            }
          >
            <option value="cpp">C++</option>
            <option value="c">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
            <option value="ruby">Ruby</option>
            {/* <option value="go">Go</option>
          <option value="swift">Swift</option>
          <option value="rust">Rust</option>
          <option value="bash">Bash</option>
          <option value="csharp">C#</option>
          <option value="php">PHP</option> */}
            {/* <option value="typescript">TypeScript</option>
          <option value="kotlin">Kotlin</option>
          <option value="sql">SQL</option>
          <option value="css">CSS</option>
          <option value="html">HTML</option>
          <option value="xml">XML</option>
          <option value="json">JSON</option> */}
          </select>
        </div>
        <br />
        <textarea
          rows="20"
          cols="75"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
        ></textarea>
        <br />
        <button onClick={handleSubmit}>Submit</button>
        <p>{output}</p>
=======
  return (
    <PdfProvider> {/* Wrap the app with PdfProvider */}
      <div className="flex flex-col min-h-screen">
        <Router>
          <Navbar />
          <main className="flex-grow pt-16">
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/editor" element={<CodeEditor />} />
                <Route path="/customizer" element={<PdfCustomizer />} />
                <Route path="/ai-suggestions" element={<AiSuggestions />} />
                <Route path="/collaborate" element={<Collaborate />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsService />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </Router>
>>>>>>> 19dff18b92202e24eecaaed86e71897030e9a6e1
      </div>
    </PdfProvider>
  );
}

export default App;
