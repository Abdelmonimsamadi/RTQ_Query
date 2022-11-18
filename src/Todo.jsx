import React, { useState } from "react";
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "./redux/api/todos/todoApi";
import "./Todo.css";

function Todo({ todo }) {
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(todo.task);

  const handleClick = () => {
    deleteTodo(todo.id);
  };

  const toggleFrom = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (evt) => {
    setTask(evt.target.value);
  };

  const handleUpdate = (evt) => {
    evt.preventDefault();
    updateTodo({ ...todo, task });
    toggleFrom();
  };

  const toggleCompleted = () => {
    updateTodo({ id: todo.id, completed: !todo.completed });
  };

  let result;
  if (isEditing) {
    result = (
      <div className="Todo">
        <form className="Todo-edit-form" onSubmit={handleUpdate}>
          <input onChange={handleChange} value={task} type="text" />
          <button>Save</button>
        </form>
      </div>
    );
  } else {
    result = (
      <div className="Todo">
        <li
          id={todo.id}
          onClick={toggleCompleted}
          className={todo.completed ? "Todo-task completed" : "Todo-task"}
        >
          {todo.task}
        </li>
        <div className="Todo-buttons">
          <button onClick={toggleFrom}>
            <i className="fas fa-pen" />
          </button>
          <button onClick={handleClick}>
            <i id={todo.id} className="fas fa-trash" />
          </button>
        </div>
      </div>
    );
  }
  return result;
}

export default Todo;
