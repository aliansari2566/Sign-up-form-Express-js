const express = require("express");
const axios = require("axios");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signUp.html");
  });

app.listen(3000, function () {
    console.log("server is running on port 3000");
  });
  