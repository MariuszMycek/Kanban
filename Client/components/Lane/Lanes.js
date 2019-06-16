import React from 'react';
import PropTypes from 'prop-types';
import Lane from './LaneContainer';

const Lanes = props => {
  return (
    <div className="lanes">
      {props.lanes.map(lane => (
        <Lane className="lane" key={lane.id} lane={lane} />
      ))}
    </div>
  );
};

Lanes.propTypes = {
  lanes: PropTypes.array,
};

export default Lanes;
