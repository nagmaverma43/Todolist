import './App.css';
import { useState } from 'react';

function App() {

  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(null); // Track the item being edited
  const [editInput, setEditInput] = useState(""); // Track the new value for editing

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleTask = () => {
    if (input.trim()) {
      setList(prevList => [...prevList, input]); // Add new input to the list
      setInput(""); // Clear input field
    }
  };

  const handleDelete = (index) => {
    setList(prevList => prevList.filter((_, i) => i !== index)); // Remove task
  };

  const handleEdit = (index) => {
    setIsEditing(index); // Set the task to be edited
    setEditInput(list[index]); // Set the current value to the edit input
  };

  const saveEdit = (index) => {
    const updatedList = [...list];
    updatedList[index] = editInput; // Update the task with new value
    setList(updatedList);
    setIsEditing(null); // Exit edit mode
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div className="container">
        <div className="input-box">
          <input type="text" value={input} onChange={handleInput} />
          <button onClick={handleTask}>Add Task</button>
        </div>
        <div className="list">
          <ul>
            {list.map((item, i) => (
              <li key={i} className="task-item">
                {isEditing === i ? (
                  // Show input box during editing
                  <>
                    <input
                      type="text"
                      value={editInput}
                      onChange={(e) => setEditInput(e.target.value)}
                    />
                    <button onClick={() => saveEdit(i)}>Save</button>
                  </>
                ) : (
                  <>
                    {item}
                    <span className="edit-sign" onClick={() => handleEdit(i)}>🖉</span> {/* Edit icon */}
                    <span className="delete-sign" onClick={() => handleDelete(i)}>x</span> {/* Delete icon */}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

