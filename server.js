const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const PORT = 3000;

// Block to have JSON properly encoded and to serve the JavaScript to the public file directory
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("./public"));

// Blocks of code to add/edit/delete notes.
app.post
app.get
app.delete