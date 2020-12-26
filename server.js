// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3000;
const app = express();

let idNum = Math.floor(Math.random() * 50000);
// Block to have JSON properly encoded and to serve the JavaScript to the public file directory
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// These route the to the html files in the public folder
// Forgot to add _dirname the first time. It is needed to return the directory that is running the script
app.get("/notes", (request, response) => {
    response.sendFile(path.join(__dirname, "/public/notes.html"));
    console.log(response);
});

// Blocks of code that route the api to add/edit/delete
// Gets the notes that were previously saved on db.json
app.get("/api/notes", (request, response) => {
    response.sendFile(path.join(__dirname, "/db/db.json"));
    //console.log(request);
    //console.log(__dirname);
    //console.log("File has been gotten.");
})

// Posts the changes made and will be stored in the db.json file
app.post("/api/notes", (request, response) => {
    let newNote = request.body;
    newNote.id = idNum;
    newNote = JSON.stringify(newNote);
    fs.writeFile("./db/db.json", newNote, (err) => {
        if (err) throw err;
        else {
        console.log(newNote);
        }
    response.json(newNote);
    });
    
    console.log("File has been saved.");
})

// Handles the delete requests for the notes
app.delete("/api/notes/:id", (request, response) => {
    let currentId = request.params.id;
    console.log(request.params);
    console.log(currentId);
    parseFile.filter((oldNote) => {
        return oldNote.id != currentId;
    })
    response.json(parseFile);
    console.log("File has been deleted.");
})

app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname + "/public/index.html"));
});

// Server listener
app.listen(PORT, () => {
    console.log("Listening on PORT: " + PORT);
})