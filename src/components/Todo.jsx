
import { useState } from "react";
import "./css/todo.css";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [taskValue, setTaskValue] = useState("");
  const [editedTasks, setEditedTasks] = useState([]);

  function handleNewTask(event) {
    setTaskValue(event.target.value.trim());
  }

  function addTask() {
    if (taskValue.trim() === "") {
      alert("Please enter a task");
    } else {
      setTasks([...tasks, taskValue]);
      setTaskValue("");
      setEditedTasks([...editedTasks, ""]);
    }
  }

  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
    setEditedTasks(editedTasks.filter((_, i) => i !== index));
  }

  function editTask(index) {
    const newEditedTasks = [...editedTasks];
    newEditedTasks[index] = tasks[index];
    setEditedTasks(newEditedTasks);
  }

  function saveTask(index) {
    const newTasks = [...tasks];
    newTasks[index] = editedTasks[index];
    setTasks(newTasks);
    setEditedTasks(editedTasks.map((task, i) => (i === index ? "" : task)));
  }

  return (
    <div className="todo">
      <div className="title">Todo</div>
      <div className="newTask">
        <input
          type="text"
          name="task"
          value={taskValue}
          onChange={handleNewTask}
          onKeyDown={(e) => e.key === "Enter" ? addTask() : null}
        />
      </div>
      <ul>
        {tasks.map((task, index) => (
          <div className="task" key={index}>
            <li>
              <textarea
                readOnly={editedTasks[index] === ""}
                onChange={(e) => {
                  const newEditedTasks = [...editedTasks];
                  newEditedTasks[index] = e.target.value;
                  setEditedTasks(newEditedTasks);
                }}
                value={editedTasks[index] || task}
                onKeyDown={(e) => e.key === "Enter" && saveTask(index)}
              />
            </li>
            <button onClick={() => deleteTask(index)}>Delete</button>
            <button onClick={() => editTask(index)}>Edit</button>
            {editedTasks[index] !== "" && (
              <button onClick={() => saveTask(index)}>Save</button>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}