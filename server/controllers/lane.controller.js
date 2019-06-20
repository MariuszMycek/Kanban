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

// Move note within lane
export function moveWithin(req, res) {
  const { targetId, sourceId, laneId } = req.body;

  if (!laneId || !targetId || !sourceId) {
    res.status(403).end();
  } else {
    Lane.findOne({ id: laneId })
      .exec((err, lane) => {
        if (err || !lane) {
          res.status(500).send(err);
        } else {
          const newNotes = () => {
            const sourceIndex = lane.notes.findIndex(
              note => note.id === sourceId
            );
            const targetIndex = lane.notes.findIndex(
              note => note.id === targetId
            );
            const arrayCopy = [...lane.notes];

            arrayCopy.splice(
              targetIndex,
              0,
              arrayCopy.splice(sourceIndex, 1)[0]
            );
            return arrayCopy;
          };

          lane.notes = newNotes();
        }
      })
      .then(lane =>
        lane.save((err, newLane) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(204).end();
          }
        })
      );
  }
}
