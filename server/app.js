require("dotenv").config({ path: "./config.env" });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const mongoose = require("mongoose");
const connectionString = process.env.ATLAS_URI;

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error: "));

const app = express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", require("./routes/api"));

// Global error handling
app.use((req, res, next, err) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;