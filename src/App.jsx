import React from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import "./TodoList.css";
import { useGetTodosQuery } from "./redux/api/todos/todoApi";

function TodoList() {
  const { data: todos, loading, error } = useGetTodosQuery();
  console.log(todos, loading, error);
  let todosList;
  if (loading)
    todosList = <h2>Please wait a second heroku server is starting ...</h2>;
  if (error) todosList = <h2>{JSON.stringify(error)}</h2>;
  if (todos)
    todosList = todos?.map((todo) => <Todo key={todo.id} todo={todo} />);

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
