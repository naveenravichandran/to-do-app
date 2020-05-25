import React, { Component } from 'react';
import { TODO_STATUS, ERROR_MSG } from '../common/constants';
import classNames from 'classnames';

export default class ToDoApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todoItem: props.todoItem,
      isEdit: false,
      error: ''
    };

  }
  change = (e) => {
    const value = e.target.value
    const todoItem = { ...this.state.todoItem, item: value.trim() }
    if (this.props.isValidToDo(todoItem)) {
      this.setState({
        todoItem
      });
    } else {
      this.setState({
        error: ERROR_MSG.ALREADY_EXISTS
      });
    }
  };

  onSaveToDo(onSave) {
    if (this.state.error) return;

    this.setState({
      isEdit: onSave,
      error: ''
    })
  };

  toggleStatus = (status) => (status == TODO_STATUS.IN_PROGRESS ? TODO_STATUS.COMPLETED : TODO_STATUS.IN_PROGRESS);

  updateStatus = () => this.props.updateToDo({ ...this.state.todoItem, status: this.toggleStatus(this.state.todoItem.status) });

  render() {
    let { onDeleteToDo } = this.props;
    let { error, isEdit, todoItem } = this.state;
    debugger;
    return (
      <div className="todo-item-container">
        <div>
          <input
            type="checkbox"
            className="todo-check"
            onChange={this.updateStatus}
            checked={todoItem.status === TODO_STATUS.COMPLETED}
          />
          <div className={classNames({ 'todo-item': true, completed: todoItem.status === TODO_STATUS.COMPLETED })}>
            {isEdit ? (
              <input
                type="text"
                className="todo-edit-input"
                onChange={this.change}
                value={todoItem.item}
              />
            ) : (
                <span className="todo-item-text">{todoItem.item}</span>
              )}
          </div>
          {isEdit ? (
            <label className="save-todo" onClick={() => this.onSaveToDo(false)}>
              Save
            </label>
          ) : (
              <label className="edit-todo" onClick={() => this.onSaveToDo(true)} >
                Edit
              </label>
            )}
          <label className="delete-todo" onClick={() => onDeleteToDo(todoItem.id)} >
            Delete
        </label>
        </div>
        {error && <div className="error">{error}</div>}
      </div>
    )
  }
}