import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, Link } from 'react-router-dom';
import EditQuestions from './components/EditQuestions'; 
import CarouselForm from './components/CarouselForm'; 

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:8000/api/userinfo/')
            .then(response => setUsers(response.data))
            .catch(error => console.error(error));
    };

    const handleSubmit = (userData) => {
        axios.post('http://localhost:8000/api/userinfo/', userData)
        .then(response => {
            setUsers([...users, response.data]);
        })
        .catch(error => console.error(error));
    };

    const handleGeneratePDF = (id) => {
        window.open(`http://localhost:8000/pdf/${id}/`);
    };

    const handleUserUpdate = (updatedUser) => {
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    };

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={
                    <>
                        <CarouselForm handleSubmit={handleSubmit} /> {/* Use the CarouselForm here */}
                        
                        <h2>Users</h2>
                        <ul>
                            {users.map(user => (
                                <li key={user.id}>
                                    {user.name} - {user.age} - {user.address}
                                    <button onClick={() => handleGeneratePDF(user.id)}>Generate PDF</button>
                                    <Link to={`/edit/${user.id}`}>
                                        <button>Edit PDF</button>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </>
                } />
                <Route path="/edit/:id" element={<EditQuestions onUserUpdate={handleUserUpdate} />} />
            </Routes>
        </div>
    );
}

export default App;
