import React, { useState, useEffect } from 'react';
import { getAllListsForUser, getListById, updateListByParams, deleteList, removeItemFromList } from '../itemService'; // import removeItemFromList

function GetList() {
    const [lists, setLists] = useState([]); // State for all lists
    const [userId, setUserId] = useState('12345'); // Replace with actual user ID
    const [selectedList, setSelectedList] = useState(null); // State for the selected list details
    const [selectedItems, setSelectedItems] = useState([]); // State for the items of the selected list
    const [updatedName, setUpdatedName] = useState(''); // State for updated list name
    const [updatedPublic, setUpdatedPublic] = useState(null); // State for updated public status
    const [message, setMessage] = useState(''); // State for success/error messages

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const data = await getAllListsForUser(userId);
                setLists(data);
            } catch (error) {
                console.error("Failed to fetch lists", error);
            }
        };

        fetchLists();
    }, [userId]);

    // Fetch details and items for a specific list when clicked
    const handleListClick = async (listId) => {
        try {
            const listDetails = await getListById(listId); // Fetch list details
            setSelectedList(listDetails); // Store the list details in state
            setUpdatedName(listDetails.name); // Prepopulate the form with list name
            setUpdatedPublic(listDetails.public); // Prepopulate the form with public status
            setSelectedItems(listDetails.items); // Store the items of the list
        } catch (error) {
            console.error("Failed to fetch list by ID", error);
        }
    };

    // Handle form submission to update list
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedList = await updateListByParams(selectedList.id, updatedName, updatedPublic);
            setMessage(`List updated successfully: ${updatedList.name}`);
            setSelectedList(updatedList); // Update the selected list with the new details
        } catch (error) {
            setMessage('Failed to update list');
        }
    };

    // Handle delete list function
    const handleDeleteList = async (listId) => {
        try {
            await deleteList(listId); // Delete the list by ID
            setLists(lists.filter((list) => list.id !== listId)); // Remove the deleted list from state
            setMessage('List deleted successfully');
            setSelectedList(null); // Clear the selected list if it was deleted
        } catch (error) {
            setMessage('Failed to delete the list');
        }
    };

    // Handle removing an item from the list
    const handleRemoveItem = async (listId, itemId) => {
        try {
            await removeItemFromList(listId, itemId); // Make the API call
            setSelectedItems(selectedItems.filter((item) => item.id !== itemId)); // Remove the item from state
            setMessage('Item removed successfully.');
        } catch (error) {
            setMessage('Failed to remove item from list.');
        }
    };

    return (
        <div>
            <h2>User's Lists</h2>
            <ul>
                {lists.map((list) => (
                    <li key={list.id}>
                        <span onClick={() => handleListClick(list.id)} style={{ cursor: 'pointer' }}>
                            {list.name} (Click for details)
                        </span>
                        <button onClick={() => handleDeleteList(list.id)} style={{ marginLeft: '10px' }}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            {selectedList && (
                <div>
                    <h3>Selected List Details</h3>
                    <p>ID: {selectedList.id}</p>
                    <p>Name: {selectedList.name}</p>
                    <p>Public: {selectedList.public ? 'Yes' : 'No'}</p>

                    <form onSubmit={handleUpdateSubmit}>
                        <div>
                            <label>
                                Update Name:
                                <input
                                    type="text"
                                    value={updatedName}
                                    onChange={(e) => setUpdatedName(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Update Public:
                                <input
                                    type="checkbox"
                                    checked={updatedPublic === true}
                                    onChange={(e) => setUpdatedPublic(e.target.checked)}
                                />
                            </label>
                        </div>
                        <button type="submit">Update List</button>
                    </form>

                    {message && <p>{message}</p>}

                    {/* Display the items of the selected list */}
                    <h3>List Items</h3>
                    {selectedItems.length > 0 ? (
                        <ul>
                            {selectedItems.map((item, index) => (
                                <li key={index}>
                                    <strong>{item.name}</strong>: {item.description} (Price: {item.price})
                                    <button
                                        onClick={() => handleRemoveItem(selectedList.id, item.id)}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No items in this list.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default GetList;
