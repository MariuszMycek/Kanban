import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Edit extends Component {
  constructor(props) {
    super(props);
  }

  checkEnter = e => {
    if (e.key === 'Enter') {
      this.finishEdit(e);
    }
  };

  finishEdit = e => {
    const value = e.target.value;
    if (this.props.onUpdate) {
      this.props.onUpdate(value.trim());
    }
  };

  renderDelete = () => {
    return (
      <div className="deleteWrapper">
        <button className="delete" onClick={this.props.onDelete}>
          x
        </button>

        <style jsx>{`
          .deleteWrapper {
            position: relative;
            display: none;
          }

          .delete {
            position: absolute;
            right: 0;
            bottom: 0;
            height: 25px;
            width: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .delete:hover {
            background: #f73e44;
          }
        `}</style>
      </div>
    );
  };

  renderValue = () => {
    const { value, onDelete, onValueClick } = this.props;
    return (
      <div className="value-wrapper">
        <span className="value" onClick={onValueClick}>
          {value}
        </span>
        {onDelete ? this.renderDelete() : null}

        <style jsx>{`
          .value {
            display: block;
            padding: 5px;
            font-size: 14px;
          }

          :global(.value-wrapper:hover .deleteWrapper) {
            display: block;
          }
        `}</style>
      </div>
    );
  };

  renderEdit = () => {
    return (
      <div className="textareaWrapper">
        <textarea
          autoFocus
          defaultValue={this.props.value}
          onBlur={this.finishEdit}
          onKeyPress={this.checkEnter}
          className="textarea"
        />

        <style jsx>{`
          .textareaWrapper {
            display: flex;
            justify-content: center;
          }

          .textarea {
            width: 100%;
            height: 70px;
            padding: 5px;
            resize: vertical;
            border-radius: 3px;
            box-sizing: border-box;
          }

          :global(.laneName .textarea) {
            height: 32px;
            margin: 5px 10px 1px;
            resize: none;
            font-size: 14px;
            padding-top: 7px;
            padding-left: 10px;
          }

          .textarea:focus {
            border: none;
            outline: none;
          }
        `}</style>
      </div>
    );
  };

  render() {
    return (
      <div className={this.props.className}>
        {this.props.editing ? this.renderEdit() : this.renderValue()}
      </div>
    );
  }
}

Edit.propTypes = {
  value: PropTypes.string,
  onUpdate: PropTypes.func,
  onValueClick: PropTypes.func,
  onDelete: PropTypes.func,
  editing: PropTypes.bool,
};
