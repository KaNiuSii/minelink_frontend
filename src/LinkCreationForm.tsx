import React, { useState } from 'react';
import './LinkCreationForm.css';

interface LinkCreationFormProps {
    onFormSubmit: (data: { name: string }) => void;
    onError: (error: string) => void;
}

export const LinkCreationForm: React.FC<LinkCreationFormProps> = ({ onFormSubmit, onError }) => {
    const [redirectUrl, setRedirectUrl] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const url = `${process.env.REACT_APP_API_BASE_URL}create`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, redirect: redirectUrl })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData.message || 'An error occurred');
                onError(errorData.message || 'An error occurred');
                return;
            }

            const data = await response.json();
            console.log('Link created:', data);
            onFormSubmit(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            onError('An unexpected error occurred');
        }
    };
  
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={redirectUrl}
        onChange={(e) => setRedirectUrl(e.target.value)}
        placeholder="Redirect URL"
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name (optional)"
      />
      <button type="submit">Create Link</button>
    </form>
  );
};
