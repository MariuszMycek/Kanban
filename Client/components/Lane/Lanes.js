import React from 'react';
import PropTypes from 'prop-types';
import LaneContainer from './LaneContainer';

const Lanes = props => {
  return (
    <div className="lanes">
      {props.lanes.map(lane => (
        <LaneContainer className="lane" key={lane.id} lane={lane} />
      ))}
      <button
        className="addLane"
        onClick={() => props.createLane({ name: 'New Lane' })}
      >
        Add Lane
      </button>

      <style jsx>{`
        .lanes {
          display: flex;
          overflow-y: hidden;
          overflow-x: auto;
        }

        .addLane {
          margin: 10px;
          margin-top: 0px;
          width: 300px;
          min-width: 300px;
          height: 40px;
        }
      `}</style>
    </div>
  );
};

Lanes.propTypes = {
  lanes: PropTypes.array,
};

export default Lanes;
