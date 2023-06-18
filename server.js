// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}

// GET
// send projectData
app.get("/data", (req, res) => {
  consosle.log("GET requeset received");
  res.send(projectData);
});

// POST
app.post("/post", (req, res) => {
  const data = req.body;
  projectData["temperature"] = data.temperature;
  projectData["date"] = data.date;
  projectData["feeling"] = data.feeling;

  res.send("post success");
});

app.get("/all", (req, res) => {
  res.send(projectData);
});
