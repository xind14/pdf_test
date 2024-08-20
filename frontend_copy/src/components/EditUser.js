import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditUser({ onUserUpdate }) {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [editingField, setEditingField] = useState(null);
    const navigate = useNavigate();
    const [tempValue, setTempValue] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8000/api/userinfo/${id}/`)
            .then(response => setUser(response.data))
            .catch(error => console.error('Error fetching user:', error));
    }, [id]);

    const handleEdit = (field) => {
        setEditingField(field);
        setTempValue(user[field]);
    };

    const handleSave = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/userinfo/${id}/`, { ...user, [editingField]: tempValue })
            .then(response => {
                setUser(response.data);
                setEditingField(null);
                onUserUpdate(response.data); // Update the user in the parent component (App.js)
                navigate('/');
            })
            .catch(error => console.error('Error updating user:', error));
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="EditUser">
            <h2>Edit User Information</h2>
            <table>
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {['name', 'age', 'address'].map(field => (
                        <tr key={field}>
                            <td>{field.charAt(0).toUpperCase() + field.slice(1)}</td>
                            <td>
                                {editingField === field ? (
                                    <form onSubmit={handleSave}>
                                        <input
                                            type={field === 'age' ? 'number' : 'text'}
                                            value={tempValue}
                                            onChange={(e) => setTempValue(e.target.value)}
                                        />
                                    </form>
                                ) : (
                                    user[field]
                                )}
                            </td>
                            <td>
                                {editingField === field ? (
                                    <button onClick={handleSave}>Save</button>
                                ) : (
                                    <button onClick={() => handleEdit(field)}>Edit</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EditUser;
