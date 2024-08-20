import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditPDF({ fetchUsers }) {
    // Extract the user ID from the URL parameters
    const { id } = useParams();
    // Hook to navigate programmatically
    const navigate = useNavigate();
    // State variables to hold user data
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        // Fetch user data when the component mounts or when the user ID changes
        axios.get(`http://localhost:8000/api/userinfo/${id}/`)
            .then(response => {
                const user = response.data;
                // Set state with fetched user data
                setName(user.name);
                setAge(user.age);
                setAddress(user.address);
            })
            .catch(error => console.error('Error fetching user data:', error));
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Send updated user data to the server
        axios.put(`http://localhost:8000/api/userinfo/${id}/`, {
            name,
            age,
            address
        })
        .then(response => {
            console.log('Update successful:', response.data);
            // Call the parent function to fetch the updated user list
            fetchUsers();
            // Redirect to the home page
            navigate('/');
        })
        .catch(error => console.error('Error updating user data:', error));
    };

    return (
        <div className="EditPDF">
            <h2>Edit User Information</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Age:</label>
                    <input 
                        type="number" 
                        value={age} 
                        onChange={(e) => setAge(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input 
                        type="text" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default EditPDF;
