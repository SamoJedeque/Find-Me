const express = require('express');
const cors = require("cors");

const locationRoutes = require('./routes/location.routes');
const autRoutes = require("./routes/authRoutes");
const registerRoute = require("./routes/registerRoute");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', locationRoutes);
app.use("/api/auth", autRoutes);
app.use("/api/create", registerRoute);
app.use("/api/user", userRoutes);


module.exports = app;