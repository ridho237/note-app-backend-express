const { nanoid } = require("nanoid");
const notes = require("./notes");
const express = require("express");

const router = express.Router();

const addNoteHandler = (req, res) => {
  const { title, tags, body } = req.body;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    id,
    title,
    tags,
    body,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    res.status(201).json({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "Catatan gagal ditambahkan",
    });
  }
};

const getALLNotesHandler = (req, res) => {
  res.json({
    status: "success",
    data: {
      notes,
    },
  });
};

const getNoteByIdHandler = (req, res) => {
  const { id } = req.params;
  const note = notes.filter((n) => n.id === id)[0];

  if (note) {
    res.json({
      status: "success",
      data: {
        note,
      },
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "Catatan tidak ditemukan",
    });
  }
};

const editNoteByIdHandler = (req, res) => {
  const { id } = req.params;
  const { title, tags, body } = req.body;
  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    res.status(200).json({
      status: "success",
      message: "Catatan berhasil diperbarui",
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "Gagal memperbarui catatan. Id tidak ditemukan",
    });
  }
};

const deleteNoteByIdHandler = (req, res) => {
  const { id } = req.params;
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    res.status(200).json({
      status: "success",
      message: "Catatan berhasil dihapus",
    });
  } else {
    res.status(400).json({
      status: "fail",
      message: "Catatan gagal dihapus, Id tidak ditemukan",
    });
  }
};

module.exports = { addNoteHandler, getALLNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };
