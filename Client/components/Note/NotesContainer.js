import { connect } from 'react-redux';
import Notes from './Notes';
import * as noteActions from '../Note/NoteActions';
import { deleteNoteRequest, updateNoteRequest } from '../Note/NoteActions';

const mapDispatchToProps = {
  ...noteActions,
  deleteNote: deleteNoteRequest,
  updateNote: updateNoteRequest,
};

export default connect(
  null,
  mapDispatchToProps
)(Notes);
