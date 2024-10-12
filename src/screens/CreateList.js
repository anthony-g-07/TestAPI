import React, { useState } from 'react';
import { createList } from '../itemService';

const CreateListForm = () => {
    const [userId, setUserId] = useState('123456'); // Replace with actual user ID
    const [name, setName] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        try {
            const newList = await createList(userId, name, isPublic);
            setMessage(`List created successfully: ${newList.name}`);
        } catch (error) {
            setMessage('Failed to create list');
        }
    };

    return (
        <div>
            <h2>Create New List</h2>
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
                        Public:
                        <input 
                            type="checkbox" 
                            checked={isPublic} 
                            onChange={(e) => setIsPublic(e.target.checked)} 
                        />
                    </label>
                </div>
                <button type="submit">Create List</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateListForm;
