import React, { useState } from 'react';
import { addItemToCollection } from '../itemService'; // Import the function

function AddItemForm() {
    const [name, setName] = useState(''); // State for item name
    const [description, setDescription] = useState(''); // State for item description
    const [price, setPrice] = useState(''); // State for item price
    const [imageURL, setImageURL] = useState(''); // State for item imageURL
    const [url, setUrl] = useState(''); // State for item URL
    const [message, setMessage] = useState(''); // State for success/error messages

    // Handle form submission to add a new item
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newItem = {
            name,
            description,
            price,
            imageURL,
            url
        };

        try {
            const savedItem = await addItemToCollection(newItem); // Make the POST request
            setMessage(`Item added successfully: ${savedItem.name}`);
            // Reset the form fields after successful submission
            setName('');
            setDescription('');
            setPrice('');
            setImageURL('');
            setUrl('');
        } catch (error) {
            setMessage('Failed to add item to collection');
        }
    };

    return (
        <div>
            <h2>Add New Item</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Description:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Price:
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Image URL:
                        <input
                            type="text"
                            value={imageURL}
                            onChange={(e) => setImageURL(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        URL:
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Add Item</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default AddItemForm;
