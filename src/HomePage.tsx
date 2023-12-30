import React, { useState } from 'react';
import { LinkCreationForm } from './LinkCreationForm';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const [submissionResult, setSubmissionResult] = useState<{ name: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = (data: { name: string }) => {
    setSubmissionResult(data);
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setSubmissionResult(null);
  };

  return (
    <div className="home-page-container">
      <div className="form-container">
      <h1>Mine 🌍 Link</h1>
      <LinkCreationForm onFormSubmit={handleFormSubmit} onError={handleError} />
      <div className="message-container">
        {submissionResult && <div className="success-message">Now go to localhost:3000/{submissionResult.name}</div>}
        {error && <div className="error-message">Something went wrong! URL empty or NAME taken !</div>}
      </div>
      </div>
    </div>
  );
};
