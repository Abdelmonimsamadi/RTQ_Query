import React, { useState } from "react";
import { useCreateTodoMutation } from "./redux/api/todos/todoApi";
import "./newTodoForm.css";

function NewTodoForm() {
  const [createTodo] = useCreateTodoMutation();
  const [task, setTask] = useState("");

  const handleChange = (evt) => {
    setTask(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await createTodo(task);
    setTask("");
  };

  return (
    <form className="NewTodoForm" onSubmit={handleSubmit}>
      <label htmlFor="task">New todo</label>
      <input
        value={task}
        onChange={handleChange}
        id="task"
        type="text"
        name="task"
        placeholder="New Todo"
      />
      <button>Add Todo</button>
    </form>
  );
}

export default NewTodoForm;
