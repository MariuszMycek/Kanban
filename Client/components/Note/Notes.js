import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note';
import Edit from '../Edit';

const Notes = props => {
  const {
    notes,
    laneId,
    editNote,
    updateNote,
    deleteNote,
    moveWithinLaneRequest,
    moveWithinLane,
    lanes,
    moveNoteRequest,
  } = props;

  return (
    <ul className="notes">
      {notes.map(note => (
        <Note
          id={note.id}
          key={note.id}
          editing={note.editing}
          className="note"
          moveWithinLane={moveWithinLane}
          moveWithinLaneRequest={moveWithinLaneRequest}
          laneId={laneId}
          dbId={note._id}
          lanes={lanes}
          moveNoteRequest={moveNoteRequest}
        >
          <Edit
            editing={note.editing}
            value={note.task}
            onValueClick={() => editNote(note.id)}
            onUpdate={task => updateNote({ ...note, task, editing: false })}
            onDelete={() => deleteNote(note.id, laneId)}
          />
        </Note>
      ))}

      <style jsx>{`
        .notes {
          height: calc(100% - 83px);
          overflow-y: auto;
          padding: 0;
          margin: 0;
        }

        @media (max-width: 768px) {
          .notes {
            height: calc(100% - 85px);
          }
        }
      `}</style>
    </ul>
  );
};

Notes.propTypes = {
  deleteNote: PropTypes.func,
  updateNote: PropTypes.func,
  laneId: PropTypes.string,
  editNote: PropTypes.func,
  notes: PropTypes.array,
};

export default Notes;
