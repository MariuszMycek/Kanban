import Lane from '../models/lane';
import uuid from 'uuid';
import Note from '../models/note';

// Add Lane
export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }

  const newLane = new Lane(req.body);

  newLane.notes = [];

  newLane.id = uuid();
  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

// Get Lanes
export function getLanes(req, res) {
  Lane.find().exec((err, lanes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ lanes });
  });
}

// Delete Lane
export function deleteLane(req, res) {
  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err || !lane) {
      res.status(500).send(err);
    } else {
      lane.notes.forEach(note => {
        Note.findOne({ _id: note._id }).exec((err, note) => {
          if (err) {
            res.status(500).send(err);
          }
          note.remove();
        });
      });
      lane.remove(() => {
        res.status(200).end();
      });
    }
  });
}

export function renameLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  } else {
    Lane.findOneAndUpdate(
      { id: req.params.laneId },
      { name: req.body.name },
      { new: true }
    ).exec((err, lane) => {
      if (err || !lane) {
        res.status(500).send(err);
      } else {
        res.json(lane);
      }
    });
  }
}
