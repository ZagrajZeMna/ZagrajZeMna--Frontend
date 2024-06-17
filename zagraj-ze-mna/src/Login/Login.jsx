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
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength={100} ></input>
                        <FaUser className={styles.icon}/>
                    </div>

                    <div className={styles.inputbox}>
                        <input 
                        className={styles.inpBox}
                        type={showPassword ? "text" : "password"} 
                        placeholder="haslo" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        maxLength={20}></input>

                        <p onClick={togglePasswordVisibility} className={styles.icon_lock}>
                        {showPassword ? <FaLockOpen/> : <FaLock/>}
                        
                        </p>
                    </div>
                    
                    <div className={styles.forgot}>
                        
                        <a className={styles.linkDwaZero} href="/resetPassword">Zresetuj hasło</a>
                    </div>
                    <div className={styles.error}>{error}</div>
                    <button className={styles.btnSub} type="submit">Zaloguj się</button>
                    
                    <p className={styles.taxtToSignup}>Zarejestruj się <a className={styles.linkDwaZero} href="/registration">tutaj</a></p>
                </div>
                </div>
            </form>
        </div>


    );
}

export default Login