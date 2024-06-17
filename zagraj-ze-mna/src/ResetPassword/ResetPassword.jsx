import { FaLock, FaLockOpen, FaUser } from "react-icons/fa";
import {useState} from 'react';
import styles from './ResetPassword.module.css'
import { expandLink } from "../fetches/expandLink";

function ResetPassword() {
    
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState('');
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const toggleRepeatPasswordVisibility = () => {
        setShowRepeatPassword(!showRepeatPassword);
    }

    
    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setPassword(password);
        
        if(password.length === 0){
            setError('');
            return;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#.?&])[A-Za-z\d@$!%*#.?&]{8,20}$/;
    
        if(password.length < 8 || password.length > 20 || !passwordRegex.test(password)){
            setError("Hasło od 8-20 (1 litera, 1 cyfra, 1 znak specjalny");
        } else if (repeatPassword.length > 0 && password !== repeatPassword){
            setError('Hasła nie są podobne');
        } else {
            setError('');
        }
    }
    

    const handleRepeatPasswordChange = (e) => {
        setRepeatPassword(e.target.value);
        if (e.target.value !== password) {
            setError('Hasła nie są takie same');
        } else {
            setError('');
        }
    }

    const handleEmail = (e) => {
        const email = e.target.value;
        setEmail(email);

        if (email.length === 0) {
            setError('');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Proszę wprować poprawny adres email');
            return;
        }else{
            setError('');
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!email.trim() || !password.trim() || !repeatPassword.trim()) {
            setError('Proszę wypełnij wszystkie pola');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Proszę wprować poprawny adres email');
            return;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#.?&])[A-Za-z\d@$!%*#.?&]{8,20}$/;
        if (!passwordRegex.test(password)) {
            setError('Hasło od 8-20 (1 litera, 1 cyfra, 1 znak specjalny"');
            return;
        }

    
        if (password !== repeatPassword) {
            setError('Hasła nie są takie same');
            return;
        }

        

        try{
            let url = expandLink('/api/auth/remember');
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),

            });

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.message || 'Błąd logowania');
            }else {
                const successData = await response.json();
                setSuccess(successData.message);
            }
        }catch(error){
            setError( error.message);
        }
    };


    return (
    
        <div className={styles.parent}>
                <form className={styles.login} onSubmit={handleSubmit} >
                    <div className={styles.formContainer}>
                        <div className={styles.title}>Zmień Hasło</div>

                        <div className={styles.inputbox}>
                        <input 
                        className={styles.inpBox}
                        type="text" 
                        placeholder="email" 
                        value={email} 
                        onChange={handleEmail} ></input>
                        <FaUser className={styles.icon}/>
                        </div>

                        <div className={styles.inputbox}>
                            <input 
                            className={styles.inpBox}
                            type={showPassword ? "text" : "password"} 
                            placeholder="nowe hasło" 
                            value={password} 
                            onChange={handlePasswordChange} ></input>

                            <p onClick={togglePasswordVisibility} className={styles.icon_lock}>
                            {showPassword ? <FaLockOpen/> : <FaLock/>}
                            
                            </p>
                        </div>
                        <div className={styles.inputbox}>
                            <input 
                            className={styles.inpBox}
                            type={showRepeatPassword ? "text" : "password"} 
                            placeholder="powtórz nowe hasło" 
                            value={repeatPassword} 
                            onChange={handleRepeatPasswordChange} ></input>

                            <p onClick={toggleRepeatPasswordVisibility} className={styles.icon_lock}>
                            {showRepeatPassword ? <FaLockOpen/> : <FaLock/>}
                            
                            </p>
                        </div>
                        <div className={styles.error}>{error}</div>
                        <div className={styles.error}>{success}</div>
                        <button className={styles.resetBtn} type="submit">Zatwierdź</button>
                        
                        <p className={styles.textToLogIn}>Zaloguj się <a className={styles.linkTRZY} href="/login">tutaj</a></p>
                    </div>
                </form>
            </div>
    )
}

export default ResetPassword