import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditPDF({ fetchUsers }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8000/api/userinfo/${id}/`)
            .then(response => {
                const user = response.data;
                setName(user.name);
                setAge(user.age);
                setAddress(user.address);
            })
            .catch(error => console.error(error));
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8000/api/userinfo/${id}/`, {
            name,
            age,
            address
        })
        .then(response => {
            console.log(response.data);
            fetchUsers(); // Call the parent function to fetch updated user list
            navigate('/'); // Redirect to home
        })
        .catch(error => console.error(error));
    };

    return (
        <div className="EditPDF">
            <h2>Edit User Information</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Age:</label>
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div>
                    <label>Address:</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default EditPDF;
