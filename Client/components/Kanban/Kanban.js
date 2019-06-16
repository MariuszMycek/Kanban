import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Lanes from '../Lane/Lanes';

// Import actions
import { createLaneRequest } from '../Lane/LaneActions';

const Kanban = props => {
  return (
    <div>
      <button
        className="AddLane"
        onClick={() => props.createLane({ name: 'New Lane' })}
      >
        Add Lane
      </button>
      <Lanes lanes={props.lanes} />
    </div>
  );
};

Kanban.propTypes = {
  lanes: PropTypes.array,
  createLane: PropTypes.func,
};

const mapStateToProps = state => ({
  lanes: Object.values(state.lanes),
});

const mapDispatchToProps = {
  createLane: createLaneRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Kanban);
