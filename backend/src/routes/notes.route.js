const express = require("express");
const {
  createNotesContoller,
  getNotesController,
  updateNotesController,
  deleteNotesController,
} = require("../controllers/notes.contoller");

const router = express.Router();

router.post("/create", createNotesContoller);
router.get("/getNotes", getNotesController);
router.put("/update/:id", updateNotesController);
router.delete("/delete/:id", deleteNotesController);

module.exports = router;
