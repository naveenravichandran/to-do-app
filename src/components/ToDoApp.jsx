import React, { Component } from 'react'
import { TODO_STATUS, ERROR_MSG } from '../common/constants'
import ToDoItem from './ToDoItem'

export default class ToDoApp extends Component {
  constructor() {
    super()
    this.state = {
      todo: '',
      error: '',
      entries: [],
    }
  }

  onToDoChange = (event) => {
    event.stopPropagation()
    this.setState({ todo: event.target.value })
  }

  updateToDo = (todo) => {
    const todoItemIndex = this.state.entries.findIndex((t) => t.id === todo.id)
    const entries = this.state.entries.slice(0)
    entries[todoItemIndex] = todo
    this.setState({ entries })
  }

  onDeleteToDo = (id) => {
    const todoItemIndex = this.state.entries.findIndex((t) => t.id === id)
    const entries = this.state.entries.slice(0)
    entries.splice(todoItemIndex, 1)
    this.setState({ entries })
  }

  addToDo = () => {
    const newToDoItem = { id: this.state.entries.length + 1, item: this.state.todo, status: TODO_STATUS.IN_PROGRESS }
    if (this.isValidToDo(newToDoItem)) {
      this.setState({ entries: this.state.entries.concat(newToDoItem), todo: '', error: '' })
    } else {
      this.setState({ error: ERROR_MSG.ALREADY_EXISTS })
    }
  }

  getCurrentTask = () => {
    return this.state.entries.filter((todo) => todo.status === TODO_STATUS.IN_PROGRESS)
  }

  getFinishedTask = () => {
    return this.state.entries.filter((todo) => todo.status === TODO_STATUS.COMPLETED)
  }

  isValidToDo = (todo) => {
    return (
      todo.item.length &&
      !this.state.entries.some((t) => t.item.toLowerCase() === todo.item.toLowerCase() && t.id != todo.id)
    )
  }

  render() {
    const ToDoList = props => {
      const { item, error } = props;
      if (!item.length) return <div className="no-items-text">{error}</div>;
      const ToDoListElement = item.map((todo, i) => (
        <ToDoItem
          todoItem={todo}
          key={i}
          updateToDo={this.updateToDo}
          onDeleteToDo={this.onDeleteToDo}
          isValidToDo={this.isValidToDo}
        />
      ));
      return <>{ToDoListElement}</>;
    }

    return (
      <div className="todo-container">
        <div className="header">ADD ITEM</div>
        <input type="text" className="todo-input" onChange={this.onToDoChange} value={this.state.todo} />
        <button className="add-btn" onClick={this.addToDo} disabled={!this.state.todo.length}>
          Add
        </button>
        {this.state.error && <div className="error">{this.state.error}</div>}
        <div className="header">TODO</div>
        <ToDoList item={this.getCurrentTask()} error={'No To Do items'} />
        <div className="header">COMPLETED</div>
        <ToDoList item={this.getFinishedTask()} error={'No completed Items'} />
      </div>
    )
  }
}
