import express from "express";
import { generateFiles } from "./generateFile.js";
import { executeCpp } from "./executeCpp.js";
import cors from "cors";
import { Document, Packer, Paragraph, TextRun } from "docx";
import PDFDocument from "pdfkit";
import { executePy } from "./executePy.js";
import { executeC } from "./executeC.js";
import { Server } from "socket.io";
import http from "http";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  console.log("hello from compiler");
  res.send("hello");
});
const userSocketMap = {};

// Function to get all connected clients in a room
const getAllConnectedClients = (roomId) => {
  // Return an empty array if no clients are connected
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
};

// Route to get all clients in a room
app.get("/clients/:roomId", (req, res) => {
  const roomId = req.params.roomId;
  const clients = getAllConnectedClients(roomId);
  res.json(clients); // Return the connected clients in JSON format
});

io.on("connection", (socket) => {
  // Store the username in the `userSocketMap`
  socket.on("join", ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);

    const clients = getAllConnectedClients(roomId);

    // Emit the updated list of clients to everyone in the room
    io.in(roomId).emit("clients-updated", { clients });

    // Notify other clients that a new user has joined
    socket
      .in(roomId)
      .emit("new-user-joined", { username, socketId: socket.id });
  });

  // Broadcast language change along with the username
  socket.on("language-change", ({ roomId, language, username }) => {
    socket.in(roomId).emit("language-change", { language, username });
  });
  // Broadcast code changes to everyone in the room (including the sender)
  socket.on("code-change", ({ roomId, code }) => {
    socket.in(roomId).emit("code-change", { code }); // Emit to other clients
    socket.emit("code-change", { code }); // Emit to the sender to update their own code editor (optional)
  });

  // Broadcast code execution along with the username
  socket.on(
    "execute-code",
    async ({ language = "cpp", code, roomId, username }) => {
      if (!code) {
        socket.emit("execution-error", "No code provided");
        return;
      }

      try {
        const filepath = await generateFiles(language, code);
        let output;

        if (language === "cpp") {
          output = await executeCpp(filepath);
        } else if (language === "python") {
          output = await executePy(filepath);
        } else if (language === "c") {
          output = await executeC(filepath);
        }

        // Emit the result to all clients in the room along with the username
        io.in(roomId).emit("execution-result", { output, username });
      } catch (error) {
        socket.emit("execution-error", error.message);
      }
    }
  );

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit("disconnected", {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
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
export const generateText = async (req, res) => {
  const { prompt } = req.body;
  const genAI = new GoogleGenerativeAI(
    "AIzaSyDkJjdP4M_w7kTIaLHFyMuM8SuWZhnuuuc"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  res.json({ result: result.response.text() });
};
app.post("/generate-text", generateText);
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
