import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, Link } from 'react-router-dom';
import EditQuestions from './components/EditQuestions'; 
import CarouselForm from './components/CarouselForm'; 

function App() {
    // State to hold the list of users
    const [users, setUsers] = useState([]);

    // Fetch users from the API when the component mounts
    useEffect(() => {
        fetchUsers();
    }, []);

    // Function to fetch the list of users from the API
    const fetchUsers = () => {
        axios.get('http://localhost:8000/api/userinfo/')
            .then(response => setUsers(response.data))
            .catch(error => console.error(error));
    };

    // Function to handle form submission from CarouselForm
    const handleSubmit = (userData) => {
        axios.post('http://localhost:8000/api/userinfo/', userData)
            .then(response => {
                // Add the newly created user to the state
                setUsers([...users, response.data]);
            })
            .catch(error => console.error(error));
    };

    // Function to handle PDF generation
    const handleGeneratePDF = (id) => {
        // Open a new window with the PDF for the specified user ID
        window.open(`http://localhost:8000/pdf/${id}/`);
    };

    // Function to handle user updates from EditQuestions
    const handleUserUpdate = (updatedUser) => {
        // Update the state with the edited user data
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    };

    return (
        <div className="App">
            {/* Define routes for the application */}
            <Routes>
                <Route path="/" element={
                    <>
                        {/* Render CarouselForm component and pass handleSubmit as a prop */}
                        <CarouselForm handleSubmit={handleSubmit} /> 
                        
                        <h2>Users</h2>
                        <ul>
                            {/* Render list of users */}
                            {users.map(user => (
                                <li key={user.id}>
                                    {user.first_name} {user.middle_name} {user.last_name} {user.suffix} - {user.age} - {user.address}
                                    {/* Button to generate PDF for the user */}
                                    <button onClick={() => handleGeneratePDF(user.id)}>Generate PDF</button>
                                    {/* Link to edit the user information */}
                                    <Link to={`/edit/${user.id}`}>
                                        <button>Edit PDF</button>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </>
                } />
                {/* Route for editing user information */}
                <Route path="/edit/:id" element={<EditQuestions onUserUpdate={handleUserUpdate} />} />
            </Routes>
        </div>
    );
}

export default App;
