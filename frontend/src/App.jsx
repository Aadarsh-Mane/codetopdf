import { useState } from 'react'
import './App.css'
import axios from "axios";

function App() {
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
      </div>
    </>
  );
}

export default App
