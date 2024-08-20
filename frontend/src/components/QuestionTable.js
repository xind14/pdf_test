// src/components/QuestionTable.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function QuestionTable() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/questions/')
            .then(response => setQuestions(response.data))
            .catch(error => console.error('Error fetching questions:', error));
    }, []);

    return (
        <div className="QuestionTable">
            <h2>Questions and Answers</h2>
            <table>
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question) => (
                        <tr key={question.id}>
                            <td>{question.text}</td>
                            <td>{question.answer}</td>
                            <td>
                                <Link to={`/edit-question/${question.id}`}>
                                    <button>Edit</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default QuestionTable;
