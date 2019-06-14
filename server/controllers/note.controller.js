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

// Delete Note from Notes
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

// Edit note
export function editNote(req, res) {
  const { note } = req.body;
  const { noteId } = req.params;

  if (!note || !note.task) {
    res.status(403).end();
  } else {
    Note.findOneAndUpdate(
      { id: noteId },
      { task: note.task },
      { new: true }
    ).exec((err, newNote) => {
      if (err || !newNote) {
        res.status(500).send(err);
      } else {
        res.json(note);
      }
    });
  }
}
