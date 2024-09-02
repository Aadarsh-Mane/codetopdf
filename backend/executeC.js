import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import express from "express";

const app = express();
const PORT = 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, "outputs");
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

export const executeC = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const localOutput = path.join(outputPath, `${jobId}.out`);
  try {
    return new Promise((resolve, reject) => {
      exec(
        `gcc ${filepath} -o ${localOutput} && ${localOutput}`,
        (error, stdout, stderr) => {
          if (error) {
            reject(`Error: ${stderr}`);
            console.error(`Error executing C++ code: ${stderr}`);
            return stderr;
          } else {
            resolve(stdout);
          }
        }
      );
    });
  } catch (error) {
    console.error(`Error executing C++ codedd: ${error.error}`);
    throw new Error(error.error);
  }
};
