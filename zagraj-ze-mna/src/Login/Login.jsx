import styles from './Login.module.css'
import { FaUser, FaLock, FaLockOpen } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            setError('Please fill all fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:4001/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password  
                }),
            });

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.message || 'Błąd logowania');
            }

            const token = await response.text();
            localStorage.setItem('token', token);
        
            navigate('/');

        } catch (error) {
            setError(error.message);
        }

        
    };
    
    useEffect(() => {
        const registrationSuccess = localStorage.getItem('registrationSuccess');
    
        if (registrationSuccess === 'true') {
          localStorage.removeItem('registrationSuccess');
          window.alert('Please confirm your email address. Check your inbox for a confirmation email.');
        }
      }, []);
    
      useEffect(() => {
        const params = new URLSearchParams(location.search);
        const confirmed = params.get('confirmed');
        
        if (confirmed === 'true') {
          window.alert('Your email address has been confirmed. You can now log in.');
        }
      }, [location.search]);


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return(
        <div className={styles.parent}>
            <form className={styles.login} onSubmit={handleSubmit} >
            <div className={styles.formContainer}>
                <div className={styles.forms}>
                    <div className={styles.title}>WELCOME</div>

                    <div className={styles.inputbox}>
                        <input 
                        className={styles.inpBox}
                        type="text" 
                        placeholder="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} ></input>
                        <FaUser className={styles.icon}/>
                    </div>

                    <div className={styles.inputbox}>
                        <input 
                        className={styles.inpBox}
                        type={showPassword ? "text" : "password"} 
                        placeholder="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} ></input>

                        <p onClick={togglePasswordVisibility} className={styles.icon_lock}>
                        {showPassword ? <FaLockOpen/> : <FaLock/>}
                        
                        </p>
                    </div>
                    
                    <div className={styles.forgot}>
                        
                        <a href="/resetPassword">Forgot password?</a>
                    </div>
                    <div className={styles.error}>{error}</div>
                    <button className={styles.btnSub} type="submit">Log in</button>
                    
                    <p className={styles.taxtToSignup}>Sign up in <a href="/registration">here</a></p>
                </div>
                </div>
            </form>
        </div> 

    );
}

export default Login