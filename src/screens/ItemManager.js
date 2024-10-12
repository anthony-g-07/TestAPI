// ItemManager.js
import React, { useState, useEffect } from 'react';
import { getItemById, updateItemByParams, deleteItem } from '../itemService'; // Import the service functions
import { useParams } from 'react-router-dom'; // Import useParams to get the itemId from the route

function ItemManager() {
    const { itemId } = useParams(); // Get itemId from the URL parameters
    const [item, setItem] = useState(null); // State to store item details
    const [updatedName, setUpdatedName] = useState(''); // State for updated name
    const [updatedDescription, setUpdatedDescription] = useState(''); // State for updated description
    const [updatedPrice, setUpdatedPrice] = useState(''); // State for updated price
    const [updatedUrl, setUpdatedUrl] = useState(''); // State for updated URL
    const [updatedImageUrl, setUpdatedImageUrl] = useState(''); // State for updated image URL
    const [message, setMessage] = useState(''); // State for success/error messages

    // Fetch the item details when the component mounts or when the itemId changes
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const data = await getItemById(itemId);
                setItem(data); // Set the item in the state
                setUpdatedName(data.name); // Set the initial value for the name
                setUpdatedDescription(data.description); // Set the initial value for the description
                setUpdatedPrice(data.price); // Set the initial value for the price
                setUpdatedUrl(data.url); // Set the initial value for the URL
                setUpdatedImageUrl(data.imageURL); // Set the initial value for the image URL
            } catch (error) {
                setMessage('Failed to fetch item details');
            }
        };

        if (itemId) {
            fetchItem();
        }
    }, [itemId]);

    // Handle form submission to update the item
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const updatedData = {
            name: updatedName,
            description: updatedDescription,
            price: updatedPrice,
            url: updatedUrl,
            imageUrl: updatedImageUrl,
        };

        try {
            const updatedItem = await updateItemByParams(itemId, updatedData);
            setMessage(`Item updated successfully: ${updatedItem.name}`);
            setItem(updatedItem); // Update the item in the state
        } catch (error) {
            setMessage('Failed to update item');
        }
    };

    // Handle delete item
    const handleDelete = async () => {
        try {
            await deleteItem(itemId);
            setMessage('Item deleted successfully');
            setItem(null); // Clear the item from the state
        } catch (error) {
            setMessage('Failed to delete item');
        }
    };

    return (
        <div>
            <h2>Manage Item</h2>
            {message && <p>{message}</p>}

            {item ? (
                <div>
                    <h3>Item Details</h3>
                    <p><strong>Name:</strong> {item.name}</p>
                    <p><strong>Description:</strong> {item.description}</p>
                    <p><strong>Price:</strong> ${item.price}</p>
                    <p><strong>URL:</strong> {item.url}</p>
                    <p><strong>Image URL:</strong> {item.imageURL}</p>

                    {/* Update Item Form */}
                    <form onSubmit={handleUpdateSubmit}>
                        <div>
                            <label>Update Name:</label>
                            <input
                                type="text"
                                value={updatedName}
                                onChange={(e) => setUpdatedName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Update Description:</label>
                            <textarea
                                value={updatedDescription}
                                onChange={(e) => setUpdatedDescription(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Update Price:</label>
                            <input
                                type="number"
                                value={updatedPrice}
                                onChange={(e) => setUpdatedPrice(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Update URL:</label>
                            <input
                                type="text"
                                value={updatedUrl}
                                onChange={(e) => setUpdatedUrl(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Update Image URL:</label>
                            <input
                                type="text"
                                value={updatedImageUrl}
                                onChange={(e) => setUpdatedImageUrl(e.target.value)}
                            />
                        </div>
                        <button type="submit">Update Item</button>
                    </form>

                    {/* Delete Item */}
                    <button onClick={handleDelete}>Delete Item</button>
                </div>
            ) : (
                <p>No item selected or item was deleted</p>
            )}
        </div>
    );
}

export default ItemManager;
