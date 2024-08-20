import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditQuestions({ onUserUpdate }) {
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
        <div style={styles.container}>
            <h2 style={styles.heading}>Edit Questions</h2>
            <table style={styles.table}>
                <thead>
                    <tr style={styles.headerRow}>
                        <th style={styles.headerCell}>Question</th>
                        <th style={styles.headerCell}>Answer</th>
                        <th style={styles.headerCell}>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {['name', 'age', 'address'].map(field => (
                        <tr key={field} style={styles.row}>
                            <td style={styles.cell}>{field.charAt(0).toUpperCase() + field.slice(1)}</td>
                            <td style={styles.cell}>
                                {editingField === field ? (
                                    <form onSubmit={handleSave} style={styles.form}>
                                        <input
                                            type={field === 'age' ? 'number' : 'text'}
                                            value={tempValue}
                                            onChange={(e) => setTempValue(e.target.value)}
                                            style={styles.input}
                                        />
                                    </form>
                                ) : (
                                    user[field]
                                )}
                            </td>
                            <td style={styles.cell}>
                                {editingField === field ? (
                                    <button onClick={handleSave} style={styles.button}>Save</button>
                                ) : (
                                    <button onClick={() => handleEdit(field)} style={styles.button}>Edit</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
    },
    heading: {
        marginBottom: '20px',
        textAlign: 'center',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    headerRow: {
        backgroundColor: '#f4f4f4',
    },
    headerCell: {
        padding: '10px',
        borderBottom: '2px solid #ddd',
        textAlign: 'left',
    },
    row: {
        borderBottom: '1px solid #ddd',
    },
    cell: {
        padding: '10px',
    },
    form: {
        margin: 0,
    },
    input: {
        padding: '5px',
        width: '100%',
    },
    button: {
        padding: '5px 10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default EditQuestions;
