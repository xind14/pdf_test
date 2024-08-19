// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function App() {
//     const [name, setName] = useState('');
//     const [age, setAge] = useState('');
//     const [address, setAddress] = useState('');
//     const [users, setUsers] = useState([]);


//     useEffect(() => {
//         axios.get('http://localhost:8000/api/userinfo/')
//             .then(response => setUsers(response.data))
//             .catch(error => console.error(error));
//     }, []);

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         axios.post('http://localhost:8000/api/userinfo/', {
//             name,
//             age,
//             address
//         })
//         .then(response => {
//             console.log(response.data);
//             setUsers([...users, response.data]);
//             setName('');
//             setAge('');
//             setAddress('');
//         })
//         .catch(error => console.error(error));
//     };

//     const handleGeneratePDF = (id) => {
//         window.open(`http://localhost:8000/pdf/${id}/`);
//     };

//     return (
//         <div className="App">
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Name:</label>
//                     <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//                 </div>
//                 <div>
//                     <label>Age:</label>
//                     <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
//                 </div>
//                 <div>
//                     <label>Address:</label>
//                     <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
//                 </div>
//                 <button type="submit">Submit</button>
//             </form>

//             <h2>Users</h2>
//             <ul>
//                 {users.map(user => (
//                     <li key={user.id}>
//                         {user.name} - {user.age} - {user.address}
//                         <button onClick={() => handleGeneratePDF(user.id)}>Generate PDF</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EditPDF from './components/EditPDF';

function App() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:8000/api/userinfo/')
            .then(response => setUsers(response.data))
            .catch(error => console.error(error));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/userinfo/', {
            name,
            age,
            address
        })
        .then(response => {
            console.log(response.data);
            setUsers([...users, response.data]);
            setName('');
            setAge('');
            setAddress('');
        })
        .catch(error => console.error(error));
    };

    const handleGeneratePDF = (id) => {
        window.open(`http://localhost:8000/pdf/${id}/`);
    };

    return (
            <div className="App">
                <Routes>
                    <Route path="/" element={
                        <>
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
                                <button type="submit">Submit</button>
                            </form>

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
                    <Route path="/edit/:id" element={<EditPDF fetchUsers={fetchUsers} />} />
                </Routes>
            </div>
    );
}

export default App;
