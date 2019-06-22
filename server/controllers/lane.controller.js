import Lane from '../models/lane';
import uuid from 'uuid';
import Note from '../models/note';

// Add Lane
export function addLane(req, res) {
  if (!req.body.name) {
    res.status(415).end();
  } else {
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
    if (err) {
      res.status(500).send(err);
    } else if (!lane) {
      res.status(404).end();
    } else {
      lane
        .remove((err, deletedLane) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.json(deletedLane);
          }
        })
        .then(resLane => {
          resLane.notes.forEach(note => {
            Note.findOne({ _id: note._id }).exec((err, newNote) => {
              if (err) {
                res.status(500).send(err);
              }
              newNote.remove();
            });
          });
        });
    }
  });
}

// Rename lane
export function renameLane(req, res) {
  if (!req.body.name) {
    res.status(415).end();
  } else {
    Lane.findOneAndUpdate(
      { id: req.params.laneId },
      { name: req.body.name },
      { new: true }
    ).exec((err, lane) => {
      if (err) {
        res.status(500).send(err);
      } else if (!lane) {
        res.status(404).end();
      } else {
        res.json(lane);
      }
    });
  }
}
// Move notes
export function moveNote(req, res) {
  const { lanes } = req.body;
  if (!req.body) {
    res.status(415).end();
  } else {
    lanes.forEach(lane => {
      Lane.findByIdAndUpdate(
        lane._id,
        { $set: { notes: lane.notes } },
        { new: true }
      ).exec(err => {
        if (err) {
          res.status(500).send(err);
        }
      });
    });
    res.json('ok');
  }
}
