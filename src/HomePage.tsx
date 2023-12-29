import React, { useState } from 'react';
import { LinkCreationForm } from './LinkCreationForm';

export const HomePage: React.FC = () => {
    const [submissionResult, setSubmissionResult] = useState<{ name: string } | null>(null);
    const [error, setError] = useState<string | null>(null); // State for storing the error message

    const handleFormSubmit = (data: { name: string }) => {
        setSubmissionResult(data);
        setError(null); // Clear any previous errors on successful submission
    };

    const handleError = (errorMessage: string) => {
        setError(errorMessage); // Set the error message received from the form
    };

    return (
        <div>
            <h1>Create a New Link</h1>
            <LinkCreationForm onFormSubmit={handleFormSubmit} onError={handleError} />
            {submissionResult && <div>Now go to localhost:3000/{submissionResult.name}</div>}
            {error && <div className="error-message">Something went wrong! {error}</div>} {/* Display the error message */}
        </div>
    );
};
