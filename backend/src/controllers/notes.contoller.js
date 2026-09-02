const NotesSchema = require("../models/notes.model");

// create notes
const createNotesContoller = async (req, res) => {
  const { title, description } = req.body;

  const notes = await NotesSchema.create({
    title,
    description,
  });

  res.status(200).json({
    message: "Note created successfully",
    notes,
  });
};

// read notes
const getNotesController = async (req, res) => {
  const getNotes = await NotesSchema.find();

  res.status(200).json({
    message: "notes fetched successfully..",
    getNotes,
  });
};

// update notes
const updateNotesController = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const updateNotes = await NotesSchema.findByIdAndUpdate(
    id,
    { title, description },
    {
      new: true,
    },
  );

  res.status(200).json({
    message: "notes updated successfully..",
    updateNotes,
  });
};

// delete notes
const deleteNotesController = async (req, res) => {
  const { id } = req.params;

  const deleteNotes = await NotesSchema.findByIdAndDelete(id);

  res.status(200).json({
    message: "notes deleted successfully..",
    deleteNotes,
  });
};

module.exports = {
  createNotesContoller,
  getNotesController,
  updateNotesController,
  deleteNotesController,
};
