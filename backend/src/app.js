const express = require("express");
const notesRoute = require("./routes/notes.route");
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
}))

app.use("/notes", notesRoute);

module.exports = app;
