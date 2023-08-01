import express from 'express';
import {
  getAllNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController';

const router = express.Router();

router.get('/', getAllNotes);

router.get('/:noteId', getNote);

router.post('/', createNote);

router.patch('/:noteId', updateNote);

router.delete('/:noteId', deleteNote);

export default router;
