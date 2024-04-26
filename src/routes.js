const express = require("express");
const router = express.Router();
const { addNoteHandler, getALLNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require("./handler");

router.post("/notes", addNoteHandler);
router.get("/notes", getALLNotesHandler);
router.get("/notes/:id", getNoteByIdHandler);
router.put("/notes/:id", editNoteByIdHandler);
router.delete("/notes/:id", deleteNoteByIdHandler);

module.exports = router;
