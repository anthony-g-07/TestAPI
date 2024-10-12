import React, { useState, useEffect } from 'react';
import { getRandomLists } from '../itemService'; // Import the function

function RandomLists() {
    const [randomLists, setRandomLists] = useState([]); // State to store random lists
    const [userId] = useState('12345'); // Replace with the actual user ID
    const [message, setMessage] = useState(''); // State for success/error messages

    // Fetch random lists when the component is mounted
    useEffect(() => {
        const fetchRandomLists = async () => {
            try {
                const data = await getRandomLists(userId);
                setRandomLists(data); // Store the random lists in state
                setMessage(`Found ${data.length} random lists.`);
            } catch (error) {
                setMessage('Failed to fetch random lists.');
            }
        };

        fetchRandomLists(); // Call the function to fetch random lists
    }, [userId]);

    return (
        <div>
            <h2>Random Lists</h2>
            {message && <p>{message}</p>}

            {/* Display the random lists */}
            <ul>
                {randomLists.map((list, index) => (
                    <li key={index}>
                        <strong>{list.name}</strong> (List ID: {list.id})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RandomLists;
