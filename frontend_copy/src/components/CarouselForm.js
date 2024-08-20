import React, { useState } from 'react';

function CarouselForm({ handleSubmit }) {
    // State to keep track of the current step in the carousel
    const [step, setStep] = useState(0);
    
    // States to store form data
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');

    // Array of form steps, each containing a label and an input element
    const steps = [
        {
            label: 'What is your name?',   
            input: <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
        },
        {
            label: 'What is your age?',   
            input: <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={styles.input} />
        },
        {
            label: 'What is your address?',
            input: <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} style={styles.input} />
        }
    ];

    // Labels for the sidebar menu
    const sidebarLabels = [
        'Name',
        'Age',
        'Address'
    ];

    // Function to navigate to a specific step
    const goToStep = (stepIndex) => {
        if (stepIndex >= 0 && stepIndex < steps.length) {
            setStep(stepIndex);
        }
    };

    // Function to go to the next step
    const nextStep = () => {
        goToStep(step + 1);
    };

    // Function to go to the previous step
    const prevStep = () => {
        goToStep(step - 1);
    };

    // Check if the current step is the first one
    const isFirstStep = step === 0;
    // Check if the current step is the last one
    const isLastStep = step === steps.length - 1;

    // Function to handle form submission on the last step
    const handleFinalSubmit = (e) => {
        e.preventDefault();
        handleSubmit({ name, age, address });
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
                    {/* Input group with label and input field */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>{steps[step].label}</label>
                        {steps[step].input}
                    </div>

                    {/* Navigation buttons */}
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
        // width: '100%',
        // maxWidth: '600px',
        placeContent:'center'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        width: '100%', // Make form take full width of the container
        gap: '20px', // Add space between form elements
    },
    inputGroup: {
        marginBottom: '20px',
    },
    input: {
        fontSize:'30px'
    },
    label: {
        marginBottom: '8px',
        fontWeight: 'bold',
        fontSize:'50px',
        display:'block'
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
        fontSize:'30px'
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
        fontSize:'20px'
    },
    activeProgressButton: {
        backgroundColor: '#007bff',
        color: '#fff',
    },
};

export default CarouselForm;
