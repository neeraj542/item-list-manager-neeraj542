import React, { useState } from 'react';

function ItemListManager() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
  
    const handleInputChange = (event) => {
      setNewItem(event.target.value);
    };
  
    const handleAddItem = () => {
      if (newItem.trim() !== '') {
        setItems([...items, newItem]);
        setNewItem('');
      }
    };

  return (
    <div className="container">
      <div className="center-container">
        <h1>Item List Manager</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter item"
            value={newItem}
            onChange={handleInputChange}
          />
          <button onClick={handleAddItem}>Add Item</button>
        </div>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default ItemListManager; 