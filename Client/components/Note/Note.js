import React from 'react';
import PropTypes from 'prop-types';

// Import Style
// import styles from './Note.css';

const Note = props => (
  <li className="Note">
    {props.children}
    <style jsx>{`
      .Note {
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
