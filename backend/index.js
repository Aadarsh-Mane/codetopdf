import express from "express";
import { generateFiles } from "./generateFile.js";
import { executeCpp } from "./executeCpp.js";
import cors from "cors";
import { Document, Packer, Paragraph, TextRun } from "docx";
import PDFDocument from "pdfkit";
import { executePy } from "./executePy.js";
import { executeC } from "./executeC.js";
const app = express();
const PORT = 7000;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  console.log("hello from compiler");
  res.send("hello");
});
app.post("/run", async (req, res) => {
  const { language = "cpp", code } = req.body;
  console.log("u r using", language);
  if (code === undefined) {
    return res.status(400).json({ success: false, error: "No code provided" });
  }
  try {
    const filepath = await generateFiles(language, code);
    let output;
    if (language === "cpp") {
      output = await executeCpp(filepath);
    } else if (language === "python") {
      output = await executePy(filepath);
    } else if (language == "c") {
      output = await executeC(filepath);
    }
    res.json({ filepath, output });
    //   return res.json({ language, code });
  } catch (error) {
    // res.status(500).json({ success: false, error: error.stderr });
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
