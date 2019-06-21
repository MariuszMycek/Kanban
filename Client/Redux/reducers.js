/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import lanes from '../components/Lane/LaneReducer';
import notes from '../components/Note/NoteReducer';
import errors from '../util/errorReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  lanes,
  notes,
  errors,
});
