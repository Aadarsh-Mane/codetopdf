import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import axios from "axios";
function App() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const handleSubmit = async () => {
    // console.log(code);
    const payload = {
      langauge: "cpp",
      code,
    };
    try {
      const { data } = await axios.post("http://localhost:7000/run", payload);
      setOutput(data.output);
      // setCode("");
      console.log(data);
    } catch (error) {
      console.error(error);
      // setOutput("Error executing code");
      const errorMessage = error.response?.data?.error || "Unknown error";
      setOutput(errorMessage);
    }
  };
  return (
    <div>
      <h1>Online code to pdf</h1>
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
  );
}

export default App;
