import React from 'react';
import PropTypes from 'prop-types';

import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';
import { compose } from 'redux';
import { moveWithinLaneRequest } from './NoteActions';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    const {
      connectDragSource,
      connectDropTarget,
      isDragging,
      editing,
      children,
    } = this.props;

    const dragSource = editing ? a => a : connectDragSource;

    return dragSource(
      connectDropTarget(
        <li className="note" style={{ opacity: isDragging ? 0 : 1 }}>
          {children}

          <style jsx>{`
            .note {
              background: #f5f5f7;
              margin: 10px;
              border-radius: 3px;
              list-style: none;
              cursor: pointer;
            }
          `}</style>
        </li>
      )
    );
  }
}

Note.propTypes = {
  children: PropTypes.any,
};

const sourceNoteProps = {
  noteId: null,
  laneId: null,
};
const targetNoteProps = {
  noteId: null,
  laneId: null,
};

const noteSource = {
  beginDrag(props) {
    sourceNoteProps.noteId = props.id;
    sourceNoteProps.laneId = props.laneId;

    targetNoteProps.noteId = props.id;
    targetNoteProps.laneId = props.laneId;
    return {
      id: props.id,
      laneId: props.laneId,
    };
  },
  isDragging(props, monitor) {
    sourceNoteProps.noteId = monitor.getItem().id;
    sourceNoteProps.laneId = monitor.getItem().laneId;

    targetNoteProps.laneId = props.laneId;
    return props.id === monitor.getItem().id;
  },
  endDrag(props, monitor) {
    props.moveWithinLaneRequest(
      sourceNoteProps.laneId,
      targetNoteProps.noteId,
      sourceNoteProps.noteId
    );
  },
};

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();

    if (targetProps.id !== sourceProps.id) {
      targetNoteProps.noteId = targetProps.id;

      targetProps.moveWithinLane(
        targetProps.laneId,
        targetProps.id,
        sourceProps.id
      );
    }
  },
};

export default compose(
  DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget(ItemTypes.NOTE, noteTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  }))
)(Note);
