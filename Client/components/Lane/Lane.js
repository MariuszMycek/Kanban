import React from 'react';
import PropTypes from 'prop-types';

import Edit from '../Edit';
import NotesContainer from '../Note/NotesContainer';

class Lane extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      connectDropTarget,
      lane,
      laneNotes,
      updateLane,
      addNote,
      deleteLane,
      editLane,
    } = this.props;
    const laneId = lane.id;

    return connectDropTarget(
      <div className="lane">
        <div className="laneHeader">
          <Edit
            className="laneName"
            editing={lane.editing}
            value={lane.name}
            onValueClick={() => editLane(laneId)}
            onUpdate={name => {
              updateLane({ ...lane, name, editing: false });
            }}
          />
        </div>
        <NotesContainer notes={laneNotes} laneId={laneId} />
        <div className="laneButtons">
          <button onClick={() => addNote({ task: 'New Note' }, laneId)}>
            Add Note
          </button>
          <button className="deleteButton" onClick={() => deleteLane(laneId)}>
            Remove Lane
          </button>
        </div>

        <style jsx>{`
          .lane {
            height: calc(100vh - 110px);
            min-width: 300px;
            width: 300px;
            margin: 0 10px;
            background: #dfe1e6;
            border-radius: 4px;
            margin-bottom: 5px;
          }

          .lane:first-child {
            margin-left: 0;
          }

          :global(.laneName span.value) {
            font-size: 24px;
            font-weight: bold;
            padding-left: 10px;
            cursor: pointer;
            max-height: 28px;
            overflow: auto;
          }

          .laneButtons {
            padding: 10px 0;
            display: flex;
            justify-content: space-between;
          }
          .laneButtons button {
            margin: 0 15px;
          }

          .deleteButton:hover {
            background: #f73e44;
          }
        `}</style>
      </div>
    );
  }
}

Lane.propTypes = {
  lane: PropTypes.object,
  laneNotes: PropTypes.array,
  addNote: PropTypes.func,
  updateLane: PropTypes.func,
  deleteLane: PropTypes.func,
  deleteNote: PropTypes.func,
};

export default Lane;
