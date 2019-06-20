// Import Actions
import {
  CREATE_LANE,
  UPDATE_LANE,
  DELETE_LANE,
  EDIT_LANE,
  CREATE_LANES,
  DELETE_NOTE_FROM_LANE,
  MOVE_BETWEEN_LANES,
} from './LaneActions';
import { CREATE_NOTE, MOVE_WITHIN_LANE } from '../Note/NoteActions';

import omit from 'lodash/omit';

function moveNotes(array, sourceNoteId, targetNoteId) {
  const sourceIndex = array.indexOf(sourceNoteId);
  const targetIndex = array.indexOf(targetNoteId);
  const arrayCopy = [...array];

  arrayCopy.splice(targetIndex, 0, arrayCopy.splice(sourceIndex, 1)[0]);
  return arrayCopy;
}

// Initial State
const initialState = {};

export default function lanes(state = initialState, action) {
  switch (action.type) {
    case CREATE_LANE:
    case UPDATE_LANE:
      return { ...state, [action.lane.id]: action.lane };

    case EDIT_LANE: {
      const lane = { ...state[action.laneId], editing: true };
      return { ...state, [action.laneId]: lane };
    }

    case CREATE_LANES:
      return { ...action.lanes };

    case DELETE_NOTE_FROM_LANE: {
      const newLane = { ...state[action.laneId] };
      newLane.notes = newLane.notes.filter(noteId => noteId !== action.noteId);
      return { ...state, [action.laneId]: newLane };
    }

    case CREATE_NOTE: {
      const newLane = { ...state[action.laneId] };
      newLane.notes = newLane.notes.concat(action.note.id);

      return { ...state, [action.laneId]: newLane };
    }

    case DELETE_LANE: {
      return omit(state, action.laneId);
    }

    case MOVE_WITHIN_LANE: {
      const newLane = { ...state[action.laneId] };
      newLane.notes = moveNotes(
        newLane.notes,
        action.sourceId,
        action.targetId
      );
      return { ...state, [action.laneId]: newLane };
    }

    case MOVE_BETWEEN_LANES: {
      const targetLane = { ...state[action.targetLaneId] };
      targetLane.notes = [...targetLane.notes, action.noteId];

      const lanes = { ...state };
      Object.keys(lanes).forEach(lane => {
        const newNotes = lanes[lane].notes.filter(
          noteId => noteId !== action.noteId
        );
        lanes[lane].notes = newNotes;
      });
      return {
        ...state,
        ...lanes,
        [action.targetLaneId]: targetLane,
      };
    }

    default:
      return state;
  }
}
