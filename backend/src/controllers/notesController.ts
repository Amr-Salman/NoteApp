import asyncHandler from 'express-async-handler';
import { RequestHandler } from 'express';
import noteModel from '../models/noteModel';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

const getAllNotes: RequestHandler = asyncHandler(async (req, res) => {
  const notes = await noteModel.find().exec();
  res.status(200).json(notes);
});

const getNote: RequestHandler = asyncHandler(async (req, res) => {
  const { noteId } = req.params;

  // Check if the note ID is a valid mongoose ID
  if (!mongoose.isValidObjectId(noteId)) {
    throw createHttpError(400, 'Invalid note ID');
  }

  const note = await noteModel.findById(noteId).exec();

  // Check if the note exists
  if (!note) {
    throw createHttpError(404, 'Note not found!');
  }
  res.status(200).json(note);
});

interface CreateNoteBody {
  title?: string;
  text?: string;
}

const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> =
  asyncHandler(async (req, res) => {
    const { title, text } = req.body;

    // Handle error if there is no title
    if (!title) {
      throw createHttpError(400, 'Note must have a title');
    }

    const newNote = await noteModel.create({ title, text });
    res.status(201).json(newNote);
  });

interface UpdateNoteParams {
  noteId: string;
}
interface UpdateNoteBody {
  title?: string;
  text?: string;
}

const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = asyncHandler(async (req, res) => {
  const newTitle = req.body.title;
  const newText = req.body.text;
  const noteId = req.params.noteId;

  // Check if the note ID is a valid mongoose ID
  if (!mongoose.isValidObjectId(noteId)) {
    throw createHttpError(400, 'Invalid note ID');
  }

  // Handle error if there is no title
  if (!newTitle) {
    throw createHttpError(400, 'Note must have a title');
  }

  const note = await noteModel.findById(noteId).exec();

  // Check if the note exists
  if (!note) {
    throw createHttpError(404, 'Note not found!');
  }

  // Update the note
  note.title = newTitle;
  note.text = newText;

  const updatedNote = await note.save();

  res.status(200).json(updatedNote);
});

// @Route   api/notes/:noteId
// @Access  Private
interface DeleteNoteParams {
  noteId: string;
}

const deleteNote: RequestHandler<DeleteNoteParams, unknown, unknown, unknown> =
  asyncHandler(async (req, res) => {
    const noteId = req.params.noteId;

    // Check if the note ID is a valid mongoose ID
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note ID');
    }

    const note = await noteModel.findByIdAndDelete(noteId).exec();

    // Check if the note exists
    if (!note) {
      throw createHttpError(404, 'Note not found!');
    }

    res.status(200).json(note);
  });

export { getAllNotes, createNote, getNote, updateNote, deleteNote };
