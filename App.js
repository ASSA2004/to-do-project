import React, { useState } from 'react';
import './App.css';

function App() {
  // State for managing todos and input field
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Add a new todo
  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  // Toggle todo completion status
  const toggleComplete = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Delete a todo
  const deleteTodo = (id) => {
    const filteredTodos = todos.filter(todo => todo.id !== id);
    setTodos(filteredTodos);
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div className="add-todo">
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleInputChange} 
          placeholder="Add a new task..."
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <div className="todo-list">
        {todos.length === 0 ? (
          <p className="empty-message">No tasks yet! Add one above.</p>
        ) : (
          todos.map(todo => (
            <div 
              key={todo.id} 
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <div className="todo-text" onClick={() => toggleComplete(todo.id)}>
                <span className="check">{todo.completed ? '✓' : '○'}</span>
                <span className="text">{todo.text}</span>
              </div>
              <button 
                className="delete-btn" 
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;