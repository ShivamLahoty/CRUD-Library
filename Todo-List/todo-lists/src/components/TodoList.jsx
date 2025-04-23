import React, { useState } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

const initialTasks = [
  { id: crypto.randomUUID(), text: 'Drink some coffee' },
  { id: crypto.randomUUID(), text: 'Create a TODO app' },
  { id: crypto.randomUUID(), text: 'Drink some more coffee' }
];

function TodoList() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskText, setNewTaskText] = useState('');

  function handleInputChange(event) {
    setNewTaskText(event.target.value);
  }

  function addTask(event) {
    event.preventDefault();
    if (newTaskText.trim() !== '') {
      setTasks(t => [...t, { id: crypto.randomUUID(), text: newTaskText }]);
      setNewTaskText('');
    }
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updated = [...tasks];
      [updated[index], updated[index - 1]] = [updated[index - 1], updated[index]];
      setTasks(updated);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updated = [...tasks];
      [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
      setTasks(updated);
    }
  }

  return (
    <article className="todo-list" aria-label="task list manager">
      <header>
        <h1>TODO</h1>
        <form className="todo-input" onSubmit={addTask} aria-controls="todo-list">
          <input
            type="text"
            required
            placeholder="Enter a task"
            value={newTaskText}
            aria-label="Task text"
            onChange={handleInputChange}
          />
          <button className="add-button" aria-label="Add task">Add</button>
        </form>
      </header>
      <ol id="todo-list" aria-live="polite">
        {tasks.map((task, index) => (
          <TodoItem
            key={task.id}
            task={task.text}
            deleteTaskCallback={() => deleteTask(task.id)}
            moveTaskUpCallback={() => moveTaskUp(index)}
            moveTaskDownCallback={() => moveTaskDown(index)}
          />
        ))}
      </ol>
    </article>
  );
}

export default TodoList;
