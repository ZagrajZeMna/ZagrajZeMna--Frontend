import { FaLock, FaLockOpen, FaUser } from "react-icons/fa";
import {useState} from 'react';
import styles from './ResetPassword.module.css'

function ResetPassword() {
    
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState('');


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            setError('Please fill all fields.');
            return;
        }

        try{
            const response = await fetch('http://localhost:4001/api/auth/remember', {
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
                        <div className={styles.title}>Restart Password</div>

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
                            placeholder="new password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} ></input>

                            <p onClick={togglePasswordVisibility} className={styles.icon_lock}>
                            {showPassword ? <FaLockOpen/> : <FaLock/>}
                            
                            </p>
                        </div>
                        <div className={styles.error}>{error}</div>
                        <div className={styles.error}>{success}</div>
                        <button className={styles.resetBtn} type="submit">Confirm</button>
                        
                        <p className={styles.textToLogIn}>Log in <a href="/login">here</a></p>
                    </div>
                </form>
            </div>
    )
}

export default ResetPassword