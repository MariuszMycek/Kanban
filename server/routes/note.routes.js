import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';

const router = new Router();

// Add new Note
/* Example query body - required
{
  "note": {
      "task": "test"
  },
  "laneId": "21ddc5ae-367f-4e47-961c-60519f127fc7"
}

Example response:
{
    "__v": 0,
    "id": "2474ac4e-036a-420b-b30f-369a0b7740b8",
    "task": "test",
    "_id": "5d034f1dc8ca961b18e2b069"
}
*/
router.route('/notes').post(NoteController.addNote);

// Delete note
// Query format: localhost:3000/api/notes/<note ID>
// Example query localhost:3000/api/notes/71e17015-e339-423d-bef2-36852bc69d77
router.route('/notes/:noteId').delete(NoteController.deleteNote);

// Edit note
// Query format: localhost:3000/api/notes/<note ID>
// Example query localhost:3000/api/notes/71e17015-e339-423d-bef2-36852bc69d77
/* Example query body - required
{
    "note": {
        "task": "new content"
    }
}

Example response:
{
    "_id": "5d034f1dc8ca961b18e2b069",
    "id": "71e17015-e339-423d-bef2-36852bc69d77",
    "task": "new content",
    "__v": 0
}
*/
router.route('/notes/:noteId').put(NoteController.editNote);



export default router;
