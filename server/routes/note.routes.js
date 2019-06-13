import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';

const router = new Router();

// Add new Note
router.route('/notes').post(NoteController.addNote);

// Delete note
router.route('/notes/:noteId').delete(NoteController.deleteNote);

export default router;
