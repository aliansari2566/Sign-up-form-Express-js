const express = require("express");
const axios = require("axios");
const request = require("request");
const bodyParser = require("body-parser");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signUp.html");
  });

  app.post("/", async function (req, res) {
   
   
    
   
    console.log("temp=>>",  req.body.fname);
    res.write(`<p> my name is  ${req.body.fname} ${req.body.lname} </p>`);
 
    res.send();
  });
app.listen(3000, function () {
    console.log("server is running on port 3000");
  });
  