import { useState, useEffect } from "react";
import axios from "axios";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(""); // State for new task input

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/tasks/")
      .then(response => setTasks(response.data))
      .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  const markTaskAsCompleted = (taskId) => {
    axios.patch(`http://127.0.0.1:8000/api/tasks/${taskId}/`, { completed: true })
      .then(() => {
        setTasks(tasks.map(task =>
          task.id === taskId ? { ...task, completed: true } : task
        ));
      })
      .catch(error => console.error("Error updating task:", error));
  };

  const addTask = () => {
    if (newTask.trim() === "") return; // Prevent empty tasks

    axios.post("http://127.0.0.1:8000/api/tasks/", { title: newTask, completed: false })
      .then(response => {
        setTasks([...tasks, response.data]); // Add new task to the list
        setNewTask(""); // Clear input field
      })
      .catch(error => console.error("Error adding task:", error));
  };

  return (
    <div>
      <h2>To-Do List</h2>

      {/* Add Task Input & Button */}
      <div>
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="Enter new task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Display Task List */}
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} {task.completed ? "✅" : "❌"}
            {!task.completed && (
              <button onClick={() => markTaskAsCompleted(task.id)}>Complete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
