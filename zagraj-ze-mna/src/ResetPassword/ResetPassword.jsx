import { FaLock, FaLockOpen, FaUser } from "react-icons/fa";
import {useState} from 'react';
import styles from './ResetPassword.module.css'

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
        setPassword(e.target.value);
        if (e.target.value !== repeatPassword) {
            setError('Passwords do not match.');
        } else {
            setError('');
        }
    }

    const handleRepeatPasswordChange = (e) => {
        setRepeatPassword(e.target.value);
        if (e.target.value !== password) {
            setError('Passwords do not match.');
        } else {
            setError('');
        }
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }else{
            setError('');
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#.?&])[A-Za-z\d@$!%*#.?&]{8,20}$/;
        if (!passwordRegex.test(password)) {
            setError('Password should be 8-20 characters and include at least 1 letter, 1 number, and 1 special character.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (password !== repeatPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (!email.trim() || !password.trim() || !repeatPassword.trim()) {
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
                        onChange={handleEmail} ></input>
                        <FaUser className={styles.icon}/>
                        </div>

                        <div className={styles.inputbox}>
                            <input 
                            className={styles.inpBox}
                            type={showPassword ? "text" : "password"} 
                            placeholder="new password" 
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
                            placeholder="repeat new password" 
                            value={repeatPassword} 
                            onChange={handleRepeatPasswordChange} ></input>

                            <p onClick={toggleRepeatPasswordVisibility} className={styles.icon_lock}>
                            {showRepeatPassword ? <FaLockOpen/> : <FaLock/>}
                            
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