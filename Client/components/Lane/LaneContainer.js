import { connect } from 'react-redux';
import Lane from './Lane';

// import actions
import * as laneActions from './LaneActions';
import { deleteLaneRequest, updateLaneRequest } from './LaneActions';
import { createNoteRequest } from '../Note/NoteActions';

const mapStateToProps = (state, ownProps) => ({
  laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId]),
});

const mapDispatchToProps = {
  ...laneActions,
  deleteLane: deleteLaneRequest,
  addNote: createNoteRequest,
  updateLane: updateLaneRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lane);
