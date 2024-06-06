import styles from './Login.module.css'
import { FaUser, FaLock, FaLockOpen } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            setError('Please fill all fields.');
            return;
        }
        try {
            await login(email, password);
          } catch (error) {
            setError(error.message);
          }
        // try {
        //     const response = await fetch('http://localhost:4001/api/auth/signin', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type' : 'application/json',
        //         },
        //         body: JSON.stringify({
        //             email: email,
        //             password: password  
        //         }),
        //     });

        //     if(!response.ok){
        //         const errorData = await response.json();
        //         throw new Error(errorData.message || 'Błąd logowania');
        //     }
        
        //     const token = await response.text();
        //     localStorage.setItem('token', token);
        //     const headers = {
        //         'Content-Type' : 'application/json',
        //         'Authorization': `Bearer ${token}`
        //     };
        //     const responseWithHeaders = await fetch('http://localhost:4001/api/auth/signin', {
        //         method: 'POST',
        //         headers: headers,
        //         body: JSON.stringify({
        //             email: email,
        //             password: password  
        //         }),
        //     });


        //     navigate('/');
            
        // } catch (error) {
        //     setError(error.message);
        // }

        
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return(
        <div className={styles.parent}>

            <form className={styles.login} onSubmit={handleSubmit} >
            <div className={styles.formContainer}>
                <div className={styles.forms}>
                    <div className={styles.title}>LOGOWANIE</div>

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
                        placeholder="haslo" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} ></input>

                        <p onClick={togglePasswordVisibility} className={styles.icon_lock}>
                        {showPassword ? <FaLockOpen/> : <FaLock/>}
                        
                        </p>
                    </div>
                    
                    <div className={styles.forgot}>
                        
                        <a href="/resetPassword">Zresetuj hasło</a>
                    </div>
                    <div className={styles.error}>{error}</div>
                    <button className={styles.btnSub} type="submit">Zaloguj się</button>
                    
                    <p className={styles.taxtToSignup}>Zarejestruj się <a href="/registration">tutaj</a></p>
                </div>
                </div>
            </form>
        </div>


    );
}

export default Login