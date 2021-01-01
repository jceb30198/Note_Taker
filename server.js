// Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

// Block to have JSON properly encoded and to serve the JavaScript to the public file directory
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("./public"));

// Array to push to json folder
let objArr = [];


// These route the to the html files in the public folder
app.get("/notes", (request, response) => {
    response.sendFile(path.join(__dirname,"./public/notes.html"));
    //console.log(response.json());
})


// Variables that will be used in multiple times in the methods
let idNum = Math.floor(Math.random() * 50000);

// Blocks of code that route the api to add/edit/delete

// Gets the notes that were previously saved on db.json
app.get("/api/notes", (request, response) => {
    response.sendFile(path.join(__dirname, "./db/db.json"));
    //console.log(response);
})

// Posts the changes made and will be stored in the db.json file
app.post("/api/notes", (request, response) => {
    let jsonParse = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    let newNote = request.body;
    let id = idNum;
    console.log(id);
    objArr.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(objArr), (err) => {
        if (err) throw err;
    })
    //response.json(jsonParse);
    console.log("Saved");
    console.log(objArr);
})

// Handles the delete requests for the notes
app.delete("/api/notes/:id", (request, response) => {
    let currentId = request.params.id;
    console.log(currentId);
    jsonParse.filter((oldNote) => {
        return oldNote.id != currentId;
    })
    response.json(jsonParse);
    console.log("Deleted");
})

app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname,"./public/index.html"));
    //console.log(response);
})

app.listen(PORT, () => {
    console.log("Listening on PORT: " + PORT);
})