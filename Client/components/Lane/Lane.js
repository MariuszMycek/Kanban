import React from 'react';
import PropTypes from 'prop-types';

import Edit from '../Edit';
import NotesContainer from '../Note/NotesContainer';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// Import Style
// import styles from './Lane.css';

const Lane = props => {
  const {
    lane,
    laneNotes,
    updateLane,
    addNote,
    deleteLane,
    editLane,
    deleteNote,
  } = props;
  const laneId = lane.id;
  return (
    <div className="Lane">
      <div className="LaneHeader">
        <div className="LaneAddNote">
          <button onClick={() => addNote({ task: 'New Note' }, laneId)}>
            Add Note
          </button>
        </div>
        <Edit
          className="LaneName"
          editing={lane.editing}
          value={lane.name}
          onValueClick={() => editLane(laneId)}
          onUpdate={name => updateLane({ ...lane, name, editing: false })}
        />
        <div className="LaneDelete">
          <button
            onClick={() => {
              deleteLane(laneId);
              // laneNotes.forEach(note => deleteNote(note.id, null));
            }}
          >
            Remove Lane
          </button>
        </div>
      </div>
      <NotesContainer notes={laneNotes} laneId={laneId} />
    </div>
  );
};

Lane.propTypes = {
  lane: PropTypes.object,
  laneNotes: PropTypes.array,
  addNote: PropTypes.func,
  updateLane: PropTypes.func,
  deleteLane: PropTypes.func,
  deleteNote: PropTypes.func,
};

export default Lane;
