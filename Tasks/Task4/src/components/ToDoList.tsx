import React, { useState } from "react";

interface task {
  id: number;
  title: string;
  completed: boolean;
}

const ToDoList: React.FC = () => {
  const [tasks, setTasks] = useState<task[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  //this will cancel tasks that are done for me
  const handleClick = (id: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };
  const handleSumbit = () => {
    if (inputValue.trim() === ''){return}
    const newTask: task = {
      id: tasks.length + 1,
      title: inputValue,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  return (
    <>
      <div className="todo-list-container">
        <h1>ToDo List</h1>
        <div className="input-field">
          <input
            value={inputValue}
            type="text"
            className="input"
            placeholder="Enter a Task"
            required
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button className ='btn' onClick={handleSumbit}>Add</button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              onClick={() => {
                handleClick(task.id);
              }}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ToDoList;
