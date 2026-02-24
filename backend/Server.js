const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const sequelize = require("./src/config/database");
require("dotenv").config();

const app = require("./src/app");


// Conectar banco
sequelize.sync()
  .then(() => console.log("Banco conectado"))
  .catch(err => console.error("Erro no banco:", err));


// Criar servidor HTTP
const server = http.createServer(app);


// Configurar Socket.IO corretamente
const io = new Server(server, {
  cors: {
    origin: ["https://find-me-i101.onrender.com", "https://FIND-ME.vercel.app"], // depois pode mudar para a porta do React
    methods: ["GET", "POST"]
  }
});


//Armazenar usuários em memória
let users = {};


// Conexão Socket
io.on("connection", (socket) => {

  console.log("Usuário conectado:", socket.id);

  // Receber localização
  socket.on("updateLocation", (data) => {

    users[socket.id] = data;

    io.emit("usersLocations", users);

  });


  // Quando desconectar
  socket.on("disconnect", () => {

    delete users[socket.id];

    io.emit("usersLocations", users);

  });

});


// Porta segura
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});