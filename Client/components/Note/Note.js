import React from 'react';
import PropTypes from 'prop-types';

const Note = props => (
  <li className="note">
    {props.children}

    <style jsx>{`
      .note {
        background: #f5f5f7;
        margin: 10px;
        border-radius: 3px;
        list-style: none;
      }
    `}</style>
  </li>
);

Note.propTypes = {
  children: PropTypes.any,
};

export default Note;
