import React, { useState } from 'react';

function CarouselForm({ handleSubmit }) {
    const [step, setStep] = useState(0);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');

    const steps = [
        {
            label: 'What is your name?',   // Form question
            input: <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
        },
        {
            label: 'What is your age?',    // Form question
            input: <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={styles.input} />
        },
        {
            label: 'What is your address?',// Form question
            input: <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} style={styles.input} />
        }
    ];

    // Sidebar labels
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

    const handleFinalSubmit = (e) => {
        e.preventDefault();
        handleSubmit({ name, age, address });
    };

    return (
        <div style={styles.container}>
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
