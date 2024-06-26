const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const fs = require("fs");
const path = require('path');
const axios = require("axios");
app.use(express.json());

function errorHandler(err, req, res, next) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
}

app.use(errorHandler);

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});


app.get("/Openings", (req, res) => {
    try {
        const filePath = path.join(__dirname, "src", "data", "openings.json");
        const data = fs.readFileSync(filePath, "utf8");
        const jsonData = JSON.parse(data);

        res.status(200).json(jsonData);
    } catch (error) {
        console.error("Error reading or parsing JSON file:", error);
        res.status(500).send("Internal Server Error");
    }
});