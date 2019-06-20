import { connect } from 'react-redux';
import { compose } from 'redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';
import Lane from './Lane';

// import actions
import * as laneActions from './LaneActions';
import {
  deleteLaneRequest,
  updateLaneRequest,
  moveBetweenLanes,
} from './LaneActions';
import { createNoteRequest } from '../Note/NoteActions';

const mapStateToProps = (state, ownProps) => ({
  laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId]),
});

const mapDispatchToProps = {
  ...laneActions,
  deleteLane: deleteLaneRequest,
  addNote: createNoteRequest,
  updateLane: updateLaneRequest,
  moveBetweenLanes,
};

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const { id: noteId, laneId: sourceLaneId } = sourceProps;

    if (!targetProps.lane.notes.includes(noteId)) {
      targetProps.moveBetweenLanes(targetProps.lane.id, noteId, sourceLaneId);
    }
  },
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  DropTarget(ItemTypes.NOTE, noteTarget, dragConnect => ({
    connectDropTarget: dragConnect.dropTarget(),
  }))
)(Lane);
