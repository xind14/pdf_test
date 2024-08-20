import React, { useState } from 'react';

function CarouselForm({ handleSubmit }) {
    const [step, setStep] = useState(0);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');

    const steps = [
        {
            label: 'Name',
            input: <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        },
        {
            label: 'Age',
            input: <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        },
        {
            label: 'Address',
            input: <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        }
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
            <div style={styles.formWrapper}>
                <form onSubmit={isLastStep ? handleFinalSubmit : (e) => e.preventDefault()} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>{steps[step].label}:</label>
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
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        padding: '20px',
    },
    formWrapper: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputGroup: {
        marginBottom: '20px',
    },
    label: {
        marginBottom: '8px',
        fontWeight: 'bold',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
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
