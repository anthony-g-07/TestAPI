import React, { useState, useEffect } from 'react';
import { getAllItems } from '../itemService'; // Import the function
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function ItemList() {
    const [items, setItems] = useState([]); // State to store the list of items
    const [message, setMessage] = useState(''); // State to store any success/error messages
    const navigate = useNavigate(); // Hook for navigation

    // Fetch all items when the component is mounted
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await getAllItems();
                setItems(data); // Update the state with the list of items
            } catch (error) {
                setMessage('Failed to fetch items');
            }
        };

        fetchItems(); // Call the function to fetch items
    }, []);

    // Navigate to the ItemManager component when the "Edit" button is clicked
    const handleEditClick = (itemId) => {
        navigate(`/edit-item/${itemId}`); // Use useNavigate to change route
    };

    // Navigate to SelectListForItem component to select a list to add the item
    const handleAddToListClick = (itemId) => {
        navigate(`/select-list/${itemId}`); // Use useNavigate to navigate with the itemId
    };

    return (
        <div>
            <h2>All Items</h2>
            {message && <p>{message}</p>}
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <strong>{item.name}</strong>: {item.description}
                        <button onClick={() => handleEditClick(item.id)}>Edit</button> {/* Edit Button */}
                        <button onClick={() => handleAddToListClick(item.id)}>Add to List</button> {/* Add to List Button */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ItemList;
