import { useState } from "react";
import "./css/todo.css"


export default function Todo() {
    const [tasks, setTasks] = useState([]);
    const [taskValue, setTaskValue] = useState("");
    const [editedTask, setEditedTask] = useState("")
    const [editState, setEditState] = useState(true);

    function HandleNewTask(event) {
        setTaskValue(event.target.value.trim())
    }
    function AddTask() {
        taskValue.trim() === "" ? alert("Please enter a task") : setTasks([...tasks, taskValue])
        setTaskValue("")
    }
    function DeleteTask(index) {
        setTasks(tasks.filter((_, i) => i !== index))
    }
    function EditTask(event) {
        setEditState(!editState)
    }
    function SaveTask(index) {
        setTasks(tasks.map((task, index) => index === index ? editedTask : task))
        setEditedTask("")
        setEditState(true)
    }

    return (
        <div className="todo">
            <div className="newTask">
                <button onClick={AddTask}>New Task</button>
                <input type="text" name="task" value={taskValue} onChange={(e) => HandleNewTask(e)} onKeyDown={(e) => e.key === "Enter" ? AddTask() : null} />
            </div>
            <ul>
                {
                    tasks.map((task, index) => (
                        <div className="task" key={index}>
                            <li>
                                <textarea
                                    readOnly={editState}
                                    onChange={(e) => setEditedTask(e.target.value)}
                                    value={editState ? task : editedTask}
                                />
                            </li>
                            <button onClick={() => DeleteTask(index)}>Delete</button>
                            <button onClick={EditTask}>Edit</button>
                            {
                                 !editState && <button onClick={() => SaveTask(index)}>Save</button>
                            }
                        </div>
                    ))
                }
            </ul>
        </div>
    )

}