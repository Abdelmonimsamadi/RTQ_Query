import React from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import "./TodoList.css";
import { useGetTodosQuery } from "./redux/api/todos/todoApi";

function TodoList() {
  const { data: todos } = useGetTodosQuery();

  const todosList = todos?.map((todo) => <Todo key={todo.id} todo={todo} />);

  return (
    <div className="TodoList">
      <h1>
        Todo List <span>A simple React Todo List App</span>
      </h1>
      <ul>{todosList}</ul>
      <NewTodoForm />
    </div>
  );
}

export default TodoList;
