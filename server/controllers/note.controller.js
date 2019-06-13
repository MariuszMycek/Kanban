import Note from '../models/note';
import uuid from 'uuid';
import Lane from '../models/lane';

// Add new Note
export function addNote(req, res) {
  const { note, laneId } = req.body;

  if (!note || !note.task || !laneId) {
    res.status(400).end();
  }

  const newNote = new Note({
    task: note.task,
  });

  newNote.id = uuid();
  newNote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    Lane.findOne({ id: laneId })
      .then(lane => {
        lane.notes.push(saved);
        return lane.save();
      })
      .then(() => {
        res.json(saved);
      });
  });
}

//Delete Note from Notes
export function deleteNote(req, res) {
  const { noteId } = req.params;

  Note.findOne({ id: noteId })
    .exec((err, note) => {
      if (err || !note) {
        res.status(500).send(err);
      } else {
        Lane.update({ $pull: { notes: { $in: [note._id] } } }).exec(
          (err, lane) => {
            if (err) {
              res.status(500).send(err);
            }
          }
        );
      }
    })
    .then(note => {
      note.remove(err => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).end();
      });
    });
}
