import React from 'react';
import PropTypes from 'prop-types';

import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';
import { compose } from 'redux';

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

let notesDataForServerUpdate = [];

const noteSource = {
  beginDrag(props) {
    notesDataForServerUpdate = [...props.lanes];
    return {
      id: props.id,
      laneId: props.laneId,
    };
  },
  isDragging(props, monitor) {
    notesDataForServerUpdate = [...props.lanes];
    return props.id === monitor.getItem().id;
  },
  endDrag(props, monitor) {
    props.moveNoteRequest(notesDataForServerUpdate);
  },
};

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();

    if (targetProps.id !== sourceProps.id) {
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
