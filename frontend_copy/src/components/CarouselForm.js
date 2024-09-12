import React, { useState } from 'react';
import axios from 'axios';

function CarouselForm({ handleSubmit }) {
    const [step, setStep] = useState(0);

    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [suffix, setSuffix] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');

    const steps = [
        {
            label: 'What is your name?',
            input: (
                <div style={styles.nameInputContainer}>
                    <div style={styles.inlineInputGroup}>
                        <label>First Name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inlineInputGroup}>
                        <label>Middle Name</label>
                        <input
                            type="text"
                            value={middleName}
                            onChange={(e) => setMiddleName(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inlineInputGroup}>
                        <label>Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inlineInputGroup}>
                        <label>Suffix (optional)</label>
                        <input
                            type="text"
                            value={suffix}
                            onChange={(e) => setSuffix(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                </div>
            )
        },
        {
            label: 'What is your age?',
            input: (
                <div style={styles.inputGroup}>
                    <label>Age</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        style={styles.input}
                    />
                </div>
            )
        },
        {
            label: 'What is your address?',
            input: (
                <div style={styles.inputGroup}>
                    <label>Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        style={styles.input}
                    />
                </div>
            )
        }
    ];

    const sidebarLabels = [
        'Name',
        'Age',
        'Address'
    ];

    const goToStep = (stepIndex) => {
        if (stepIndex >= 0 && stepIndex < steps.length) {
            setStep(stepIndex);
        }
    };

    const nextStep = () => {
        goToStep(step + 1);
    };

    const prevStep = () => {
        goToStep(step - 1);
    };

    const isFirstStep = step === 0;
    const isLastStep = step === steps.length - 1;

    const handleFinalSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/userinfo/', {
                first_name: firstName,
                middle_name: middleName,
                last_name: lastName,
                suffix: suffix,
                age: age,
                address: address
            });
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error submitting data:', error.response ? error.response.data : error.message);
        }
    };
    
    

    return (
        <div style={styles.container}>
            {/* Sidebar with step labels */}
            <div style={styles.sidebar}>
                <h3>Questions</h3>
                <ul style={styles.menuList}>
                    {sidebarLabels.map((label, index) => (
                        <li
                            key={index}
                            style={{
                                ...styles.menuItem,
                                ...(index === step ? styles.activeMenuItem : {})
                            }}
                            onClick={() => goToStep(index)}
                        >
                            {label}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main form area */}
            <div style={styles.formWrapper}>
                <form onSubmit={isLastStep ? handleFinalSubmit : (e) => e.preventDefault()} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>{steps[step].label}</label>
                        {steps[step].input}
                    </div>

                    <div style={styles.buttonGroup}>
                        <button type="button" onClick={prevStep} disabled={isFirstStep} style={styles.button}>Prev</button>
                        {isLastStep ? (
                            <button type="submit" style={styles.button}>Submit</button>
                        ) : (
                            <button type="button" onClick={nextStep} style={styles.button}>Next</button>
                        )}
                    </div>
                </form>

                {/* Progress bar showing current step */}
                <div style={styles.progressBar}>
                    {steps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToStep(index)}
                            style={{
                                ...styles.progressButton,
                                ...(index === step ? styles.activeProgressButton : {})
                            }}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        padding: '20px',
    },
    sidebar: {
        width: '200px',
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        marginRight: '20px',
    },
    menuList: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    },
    menuItem: {
        padding: '10px',
        cursor: 'pointer',
    },
    activeMenuItem: {
        backgroundColor: '#007bff',
        color: '#fff',
        borderRadius: '4px',
    },
    formWrapper: {
        flex: 1,
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: '20px',
        textAlign: 'center',
    },
    nameInputContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '10px',
    },
    inlineInputGroup: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        minWidth: '100px',
    },
    inputGroup: {
        marginBottom: '20px',
    },
    input: {
        fontSize: '16px',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
        boxSizing: 'border-box',
    },
    label: {
        marginBottom: '8px',
        fontWeight: 'bold',
        fontSize: '24px',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-evenly',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    progressBar: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },
    progressButton: {
        margin: '0 5px',
        padding: '5px 10px',
        backgroundColor: '#e0e0e0',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
    },
    activeProgressButton: {
        backgroundColor: '#007bff',
        color: '#fff',
    },
};

export default CarouselForm;
