import React from 'react'
import { useState } from 'react';

function Home() {
    const [newListitem, setNewListitem] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const ClickBtn = (itemId) => {
    setNewListitem((prevListItems) =>
      prevListItems.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newItemText = event.target.newItems.value;
    const newItem = { id: Date.now(), text: newItemText };
    setNewListitem((prevListItems) => [...prevListItems, newItem]);
    event.target.reset();
  };

  // Update current date and time every second
  setInterval(() => {
    setCurrentDateTime(new Date());
  }, 1000);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">TO DO LIST</h3>
              <p className="text-center">{currentDateTime.toLocaleString()}</p>
            </div>
            <div className="card-body">
              {newListitem.map((item) => (
                <div className="form-check" key={item.id}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onClick={() => ClickBtn(item.id)}
                    defaultChecked={item.completed}
                  />
                  <label
                    className="form-check-label"
                    style={{ textDecoration: item.completed ? "line-through" : "none" }}
                  >
                    {item.text}
                  </label>
                  <br />
                </div>
              ))}
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add new item"
                    name="newItems"
                    autoComplete="off"
                  />
                  <button className="btn btn-outline-primary" type="submit">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home