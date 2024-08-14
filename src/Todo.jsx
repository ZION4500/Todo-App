import { useState } from "react";

export default function Todo(){
    const [tasks, setTasks] = useState([]);
    const [taskValue, setTaskValue] = useState("");

    function HandleNewTask(event){
        setTaskValue(event.target.value.trim())
    }
    function AddTask(){
        taskValue.trim() === "" ? alert("Please enter a task") : setTasks([...tasks, taskValue])
        setTaskValue("")
    }
    return(
        <>
        <button onClick={AddTask}>New Task</button>
        <input type="text" name="task" value={taskValue} onChange={(e) => HandleNewTask(e)}/>
        <ul>
            {tasks.map((task,index) => <li key={index}>{task}</li>)}
        </ul>
        </>
    )
}