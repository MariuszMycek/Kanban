import { connect } from 'react-redux';
import Lane from './Lane';

// import actions
import * as laneActions from './LaneActions';
import { createNoteRequest } from '../Note/NoteActions';

const mapStateToProps = (state, ownProps) => {
  return {
    laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId]),
  };
};

const mapDispatchToProps = {
  ...laneActions,
  addNote: createNoteRequest,
  // deleteNote,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lane);
