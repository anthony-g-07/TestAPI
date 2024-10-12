import React, { useState, useEffect } from 'react';
import { addExistingItemToList, getAllListsForUser } from '../itemService'; // Import the necessary API functions
import { useParams, useNavigate } from 'react-router-dom'; // Get the itemId from the URL

function SelectListForItem() {
    const { itemId } = useParams(); // Get the itemId from the URL
    const [lists, setLists] = useState([]); // State to store the user's lists
    const [selectedListId, setSelectedListId] = useState(''); // State for the selected list ID
    const [message, setMessage] = useState(''); // State for success/error messages
    const navigate = useNavigate(); // Hook to navigate back after action
    const [userId, setUserId] = useState('12345'); // State for success/error messages

    // Fetch all lists for the user when the component mounts
    useEffect(() => {
        const fetchLists = async () => {
            try {
                const data = await getAllListsForUser(userId); // Call your API to fetch the lists
                setLists(data); // Store the fetched lists in state
            } catch (error) {
                setMessage('Failed to fetch lists');
            }
        };

        fetchLists();
    }, []);

    // Handle the submission to add the item to the selected list
    const handleAddToList = async (e) => {
        e.preventDefault();
        try {
            await addExistingItemToList(selectedListId, itemId); // Add the item to the selected list
            setMessage('Item added to the list successfully.');
            navigate('/items'); // Optionally, navigate back to the items page after adding
        } catch (error) {
            setMessage('Failed to add item to the list.');
        }
    };

    return (
        <div>
            <h3>Select a List to Add Item {itemId}</h3>
            {message && <p>{message}</p>}
            <form onSubmit={handleAddToList}>
                <label>
                    Select List:
                    <select
                        value={selectedListId}
                        onChange={(e) => setSelectedListId(e.target.value)}
                        required
                    >
                        <option value="">Select a list</option>
                        {lists.map((list) => (
                            <option key={list.id} value={list.id}>
                                {list.name}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit">Add Item to List</button>
            </form>
        </div>
    );
}

export default SelectListForItem;
