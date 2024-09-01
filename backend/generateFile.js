import path from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";
import express from "express";
import { fileURLToPath } from "url";

const app = express();
const PORT = 7000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Convert `import.meta.url` to the equivalent of `__dirname`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirCodes = path.join(__dirname, "codes");

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

export const generateFiles = async (format, content) => {
  const jobId = uuid(); // Generate a unique ID
  const filename = `${jobId}.${format}`;
  const filepath = path.join(dirCodes, filename);
  await fs.promises.writeFile(filepath, content); // Write the code to the file asynchronously
  return filepath;
};
