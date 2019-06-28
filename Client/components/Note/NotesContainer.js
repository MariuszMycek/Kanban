import { connect } from 'react-redux';
import Notes from './Notes';
import * as noteActions from '../Note/NoteActions';
import {
  deleteNoteRequest,
  updateNoteRequest,
  moveNoteRequest,
  moveWithinLane,
} from '../Note/NoteActions';

// Selector
const lanesWithObjectIdNotes = state => {
  const newLanes = Object.values(state.lanes).map(lane => {
    const newLane = { ...lane };
    const newNotes = lane.notes.map(note => {
      const newNote = state.notes[note]._id;
      return newNote;
    });
    newLane.notes = newNotes;
    return newLane;
  });
  return newLanes;
};

const mapStateToProps = state => ({
  lanes: lanesWithObjectIdNotes(state),
});

const mapDispatchToProps = {
  ...noteActions,
  deleteNote: deleteNoteRequest,
  updateNote: updateNoteRequest,
  moveNoteRequest,
  moveWithinLane,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);
