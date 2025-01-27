import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ItemListManager() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [accessToken, setAccessToken] = useState(null);
    const [lambdaResponse, setLambdaResponse] = useState(null);

    useEffect(() => {
        // Check if there's an auth code in the URL
        const params = new URLSearchParams(window.location.search);
        const authCode = params.get('code');

        if (authCode) {
            console.log("Auth Code Retrieved from URL:", authCode);

            // Step 1: Exchange auth code for short-lived token
            axios
                .get(`${import.meta.env.VITE_BACKEND_URL}/api/exchange-token`, {
                    params: { code: authCode },
                })
                .then((response) => {
                    console.log("Short-Lived Token Response:", response.data);

                    const shortLivedToken = response.data.access_token;

                    // Step 2: Exchange short-lived token for long-lived token and Lambda response
                    return axios.get(
                        `${import.meta.env.VITE_BACKEND_URL}/api/exchange-long-lived-token`,
                        {
                            params: { access_token: shortLivedToken },
                        }
                    );
                })
                .then((response) => {
                    console.log("Long-Lived Token Response:", response.data);

                    // Save the long-lived token and Lambda response
                    setAccessToken(response.data.longLivedToken.access_token);
                    setLambdaResponse(response.data.lambdaResponse);

                    // Optionally clear the URL after processing
                    window.history.replaceState({}, document.title, window.location.pathname);
                })
                .catch((error) => {
                    console.error("Failed to get token:", error.response?.data || error.message);
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
            {accessToken && (
                <div className="response-box">
                    <p>
                        <b>Access Token:</b> {accessToken}
                    </p>
                    {lambdaResponse && (
                        <p>
                            <b>Lambda Response:</b> {JSON.stringify(lambdaResponse)}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default ItemListManager;
