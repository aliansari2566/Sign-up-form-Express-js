const express = require("express");
const fs = require("fs");
const axios = require("axios");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signUp.html");
});

// app.post("/",  function (req, res) {
//   json data

//   var jsonData1 = 'person:';

//   parse json
//   var jsonObj = JSON.parse(jsonData);
//   console.log(jsonObj);

//   stringify JSON Object
//   var jsonContent = JSON.stringify(jsonObj);
//   console.log(jsonContent);

//   fs.writeFile("data.json", JSON.stringify(req.body), 'utf8', function (err) {
//       if (err) {
//           console.log("An error occured while writing JSON Object to File.");
//           return console.log(err);
//       }

//       console.log("JSON file has been saved.");
//   });
//   console.log("temp=>>",req.body);

//   res.write(`<p> my name is  ${req.body.fname} ${req.body.lname} </p>`);

//   res.send();
// });
app.post("/", function (req, res) {
  try {
    // Create an empty array to hold user data
    let userDataArray;

    // Read the existing JSON data from the file (if it exists)
    fs.readFile("data.json", "utf8", function (readErr, data) {
      if (!readErr && data) {
        // Parse the existing data into a JavaScript array
        userDataArray = JSON.parse(data);
      }

      userDataArray.push({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      // Write the updated array back to the JSON file
      fs.writeFile(
        "data.json",
        JSON.stringify(userDataArray),
        "utf8",
        function (writeErr) {
          if (writeErr) {
            console.error(
              "An error occurred while writing JSON data to file.",
              writeErr
            );
            return res
              .status(500)
              .json({ error: "An error occurred while saving the data." });
          }
          console.log("JSON file has been updated with user data.");

          res
            .status(200)
            .json({ message: "Data saved successfully.", data: req.body });
        }
      );
    });
  } catch (error) {
    console.error("An error occurred.", error);
    res.status(500).json({ error: "An error occurred." });
  }
});

// app.post("/", function (req, res) {
//   try {

//     console.log("body=>", req.body);
//     fs.writeFile("data.json", JSON.stringify(req.body), "utf8", function (err) {
//       if (err) {
//         console.error(
//           "An error occurred while writing JSON Object to File.",
//           err
//         );
//         res
//           .status(500)
//           .json({ error: "An error occurred while saving the data." });
//       } else {
//         console.log("JSON file has been saved.");
//         console.log("Data =>>", req.body);
//         res
//           .status(200)
//           .json({ message: "Data saved successfully.", data: req.body });
//       }
//     });
//   } catch (error) {
//     console.error("An error occurred.", error);
//     res.status(500).json({ error: "An error occurred." });
//   }
// });

app.listen(3000, function () {
  console.log("server is running on port 3000");
});
