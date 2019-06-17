import React from 'react';
import PropTypes from 'prop-types';

import Edit from '../Edit';
import NotesContainer from '../Note/NotesContainer';

const Lane = props => {
  const { lane, laneNotes, updateLane, addNote, deleteLane, editLane } = props;
  const laneId = lane.id;

  return (
    <div className="Lane">
      <div className="LaneHeader">
        <div className="LaneAddNote" />
        <Edit
          className="LaneName"
          editing={lane.editing}
          value={lane.name}
          onValueClick={() => editLane(laneId)}
          onUpdate={name => updateLane({ ...lane, name, editing: false })}
        />
      </div>
      <NotesContainer notes={laneNotes} laneId={laneId} />

      <div className="LaneButtons">
        <button onClick={() => addNote({ task: 'New Note' }, laneId)}>
          Add Note
        </button>
        <button className="deleteButton" onClick={() => deleteLane(laneId)}>
          Remove Lane
        </button>
      </div>
      <style jsx>{`
        .Lane {
          height: calc(100vh - 105px);
          min-width: 300px;
          width: 300px;
          margin: 0 10px;
        }
        .Lane:first-child{
          margin-left: 0;
        }
        :global(.LaneName span.value) {
          font-size: 24px;
          font-weight: bold;
        }
        .LaneButtons {
          padding: 10px 0;
          display: flex;
          justify-content: space-between;
        }
        .deleteButton:hover {
          background: #f73e44;
        }
      `}</style>
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
