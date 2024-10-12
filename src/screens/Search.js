import React, { useState } from 'react';
import { searchItems } from '../itemService'; // Import the function

function SearchItems() {
    const [searchQuery, setSearchQuery] = useState(''); // State to store search query
    const [searchResults, setSearchResults] = useState([]); // State to store search results
    const [message, setMessage] = useState(''); // State for success/error messages

    // Handle form submission
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const results = await searchItems(searchQuery); // Make the API call
            setSearchResults(results); // Store the search results in state
            setMessage(`${results.length} items found`);
        } catch (error) {
            setMessage('Failed to search for items.');
        }
    };

    return (
        <div>
            <h2>Search for Items</h2>
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter search terms"
                    required
                />
                <button type="submit">Search</button>
            </form>

            {message && <p>{message}</p>}

            {/* Display the search results */}
            <ul>
                {searchResults.map((item, index) => (
                    <li key={index}>
                        <strong>{item.name}</strong>: {item.description} (Price: {item.price})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchItems;
