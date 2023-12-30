import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RedirectPage.css';

export const RedirectPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const fetchRedirect = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}redirect/${name}`);
        if (!response.ok) {
          const errorResponse = await response.json();
          console.log(errorResponse);
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        window.location.href = data.redirect;
      } catch (error) {
        console.error('Fetch error:', error);
        setErrorMessage('Something went wrong! Please try again later.');
      }
    };

    if (name) {
      fetchRedirect();
    }
  }, [name]);

  return (
    <div className="redirect-page-container">
      {errorMessage ? (
        <div className="message">{errorMessage}</div>
      ) : (
        <div>
          <div className="spinner"></div>
          <div className="message">Redirecting...</div>
        </div>
      )}
    </div>
  );
};
