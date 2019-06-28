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

export function deleteNote(req, res) {
  const { noteId } = req.params;

  Note.findOne({ id: noteId }).exec(async (err, foundNote) => {
    if (err || !foundNote) {
      res.status(500).send(err);
    } else {
      await Lane.updateOne({ $pull: { notes: { $in: [foundNote._id] } } }).exec(
        err => {
          if (err) {
            res.status(500).send(err);
          }
        }
      );
      foundNote.remove((err, note) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(note);
        }
      });
    }
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
