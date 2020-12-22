const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const PORT = 3000;

// Block to have JSON properly encoded and to serve the JavaScript to the public file directory
app.use(express.urlencoded({extended: true}));
app.use(express.static("./public"));
app.use(express.json());

// These route the to the html files in the public folder
app.get("/notes", (request, response) => {
    response.sendFile(path.join(__dirname,"/public/notes.html"));
})
// Forgot to add _dirname the first time. It is needed to return the directory that is running the script
app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname,"/public/index.html"));
})


// Blocks of code that route the api to add/edit/delete

// Gets the notes that were previously saved on db.json
app.get("/api/notes", (request, response) => {
    response.sendFile(path.join(__dirname, "db/db.json"));
})

// Posts the changes made and will be stored in the db.json file
app.post("/api/notes", (request, response) => {

})

// Handles the delete requests for the notes
app.delete("/api/notes/:id", (request, response) => {

})