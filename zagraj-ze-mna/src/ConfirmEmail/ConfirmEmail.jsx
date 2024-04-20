
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ConfirmEmail = () => {
    const { confirmationCode } = useParams();

    useEffect(() => {
        fetch(`http://localhost:4001/api/auth/confirm/${confirmationCode}`)
            .then(response => {
                if (response.ok) {
                    window.location.href = '/login';
                } else {
                    
                }
            })
            .catch(error => {
                console.error('Błąd potwierdzania adresu e-mail:', error);
            
            });
    }, [confirmationCode]);
  
    return (
      <div>
        <h1>Adres e-mail potwierdzony</h1>
        <p>Możesz teraz przejść do logowania</p>
      </div>
    );
  };
  
  export default ConfirmEmail;