import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Lanes from '../Lane/Lanes';

// Import actions
import { createLaneRequest } from '../Lane/LaneActions';

const Kanban = props => {
  return (
    <div>
      <div className="lanesContainer">
        <Lanes lanes={props.lanes} createLane={props.createLane} />
      </div>

      <style jsx>{`
        :global(button) {
          background: #7ed39a;
          cursor: pointer;
          border: none;
          border-radius: 3px;
          outline: none;
          color: #fafcfb;
          padding: 5px;
        }

        :global(button:hover) {
          background: #328549;
        }

        :global(::-webkit-scrollbar-track) {
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
          background-color: #f5f5f5;
          border-radius: 3px;
        }

        :global(::-webkit-scrollbar) {
          width: 10px;
          height: 15px;
          background-color: #f5f5f5;
          border-radius: 3px;
        }

        :global(::-webkit-scrollbar-thumb) {
          border-radius: 3px;
          background-color: #3fa259;
        }

        .lanesContainer {
          padding: 10px;
          max-width: 100vw;
        }
      `}</style>
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
