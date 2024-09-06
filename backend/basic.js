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
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const server = http.createServer(app);
const io = new Server(server);
const userSocketMap = {};

const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
};

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);

  socket.on("join", ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit("joined", {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  socket.on("code-change", ({ roomId, code }) => {
    socket.in(roomId).emit("code-change", { code });
  });

  // Listen for 'execute-code' event from frontend to execute code
  socket.on("execute-code", async ({ language = "cpp", code }) => {
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

      // Send the execution result back to the client
      socket.emit("execution-result", { output });
    } catch (error) {
      socket.emit("execution-error", error.message);
    }
  });

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

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
