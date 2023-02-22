import "./home.css";
import React, { useState, useEffect } from "react";

function Homepage() {
  const [tasks, setTasks] = useState(() => {
    const temp =  localStorage.getItem('todos');
    return JSON.parse(temp) || []
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    const input = e.target.elements.task;
    const newTask = { id: Date().valueOf(), name: input.value, completed: false };
    setTasks([...tasks, newTask]);
    input.value = "";
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const [filter, setFilter] = useState('all');
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(tasks));
  }, [tasks]);

  let filteredTasks;
  if (filter === 'all') {
    filteredTasks = tasks;
  } else if (filter === 'active') {
    filteredTasks = tasks.filter((task) => !task.completed);
  } else if (filter === 'completed') {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  const clearAll = () =>  {
    setTasks([]);
  }

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
            <form onSubmit={handleAddTask}>
            <input type="text" name="task" placeholder="Add a new task..." />
            <button type="submit">Add</button>
            </form>
        <hr/>
        <div className="filter">
            <button onClick={() => setFilter('all')}>All</button>
            <button onClick={() => setFilter('active')}>Active</button>
            <button onClick={() => setFilter('completed')}>completed</button>
        </div>
        <hr/>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(task.id)}
            />
                <label
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.name}
                </label>
                <button onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </button>
          </li>
            ))}
      </ul>
      <button className="clear" onClick={(clearAll)}>CLEAR ALL</button>
    </div>
  );
}

export default Homepage;
