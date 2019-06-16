import { connect } from 'react-redux';
import Notes from './Notes';
import * as noteActions from '../Note/NoteActions';
import { deleteNoteRequest } from '../Note/NoteActions';

const mapDispatchToProps = {
  ...noteActions,
  deleteNote: deleteNoteRequest,
};

export default connect(
  null,
  mapDispatchToProps
)(Notes);
