import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ItemListManager() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        // Check if there's an auth code in the URL
        const params = new URLSearchParams(window.location.search);
        const authCode = params.get('code');

        if (authCode) {
            // Exchange the auth code for an access token
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/exchange-token`, {
                params: {
                    code: authCode
                }
            })
            .then(response => {
                // Assuming response.data contains the access token
                setAccessToken(response.data.access_token);
                console.log('Access Token:', response.data.access_token);
                // Optionally, clear the URL after processing
                window.history.replaceState({}, document.title, window.location.pathname);
            })
            .catch(error => {
                console.error('Failed to exchange token:', error);
            });
        }
    }, []);

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
            {accessToken && <p>Access Token: {accessToken}</p>}
        </div>
    );
}

export default ItemListManager;