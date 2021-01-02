// Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

// Block to have JSON properly encoded and to serve the JavaScript to the public file directory
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// Array to push to json folder
const objArr = [];

// This route the to the html files in the public folder
app.get("/notes", (request, response) => {
    response.sendFile(path.join(__dirname,"./public/notes.html"));
})

// Variables that will be used in multiple times in the methods
let idNum = Math.floor(Math.random() * 50000);

// This reads the files while on the page so it updates constantly
let readFile = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));

// Blocks of code that route the api to add/edit/delete
// Gets the notes that were previously saved on db.json
app.get("/api/notes", (request, response) => {
    response.sendFile(path.join(__dirname, "./db/db.json"));
})


// Posts the changes made and will be stored in the db.json file
app.post("/api/notes", (request, response) => {
    const newNote = request.body;
    newNote.id = idNum;
    console.log(newNote);
    objArr.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(objArr), (err) => {
        if (err) throw err;
    })
    response.json(readFile);
    console.log("Saved");
    console.log(objArr);
})

// Handles the delete requests for the notes
app.delete("/api/notes/:id", (request, response) => {
    let currentId = request.params.id;
    console.log(request.params);
    readFile = readFile.filter(note => {
        return note.id != currentId;
    })
    fs.writeFileSync("./db/db.json", JSON.stringify(readFile), (err) => {
        if(err) throw err;
    })
    response.json(readFile);
    console.log("Deleted");
})

// This route the to the html files in the public folder
app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname,"./public/index.html"));
})

// Shows that the server is up
app.listen(PORT, () => {
    console.log("Listening on PORT: " + PORT);
})