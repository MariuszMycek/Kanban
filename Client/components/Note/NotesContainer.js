import { connect } from 'react-redux';
import Notes from './Notes';
import * as noteActions from '../Note/NoteActions';
import {
  deleteNoteRequest,
  updateNoteRequest,
  moveWithinLaneRequest,
  moveWithinLane,
} from '../Note/NoteActions';

const mapDispatchToProps = {
  ...noteActions,
  deleteNote: deleteNoteRequest,
  updateNote: updateNoteRequest,
  moveWithinLaneRequest,
  moveWithinLane,
};

export default connect(
  null,
  mapDispatchToProps
)(Notes);
