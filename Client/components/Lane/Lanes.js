import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LaneContainer from './LaneContainer';

const Lanes = props => {
  return (
    <div className="lanes">
      {props.lanes.map(lane => (
        <LaneContainer className="lane" key={lane.id} lane={lane} />
      ))}
      <button
        className="AddLane"
        onClick={() => props.createLane({ name: 'New Lane' })}
      >
        Add Lane
      </button>
      <style jsx>{`
        .lanes {
          display: flex;
          overflow-x: auto;
        }
        .AddLane {
          margin: 10px;
          margin-top: 38px;
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
