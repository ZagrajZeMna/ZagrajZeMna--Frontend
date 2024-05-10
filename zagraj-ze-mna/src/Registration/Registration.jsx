import styles from './Registration.module.css'
import React, { useState } from 'react';


import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaLockOpen } from "react-icons/fa";


function Registration() {

  const [values, setValues] = useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:""
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    registrationSuccess: ""
});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const inputs = [
    {
        id:1,
        name:"username",
        type:"text",
        placeholder:"username",
        errorMessage:"Uername should be 5-16 characters"
    },
    {
        id:2,
        name:"email",
        type:"text",
        placeholder:"email",
        errorMessage:"It should be a valid eamil address"
    },
    {
        id:3,
        name:"password",
        type: showPassword ? "text" : "password",        
        placeholder:"password",
        errorMessage:"Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character"
      },
    {
        id:4,
        name:"confirmPassword",
        type: showConfirmPassword ? "text" : "password",
        placeholder:"confirm password",
        errorMessage:"Passwords don't match"
    }
  ];

  const togglePasswordVisibility = (fieldName) => {
    if (fieldName === "password") {
      setShowPassword(!showPassword);
    } else if (fieldName === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const allFieldsFilled = Object.values(values).every(value => value.trim() !== '');

    if (!allFieldsFilled) {
      setErrors({ general: 'Please fill in all fields.' });
      return;
    }

    setErrors({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
      registrationSuccess: ""
    });
    
    let updatedErrors = {};


    const validUsername = /^[a-zA-Z0-9]{5,16}$/.test(values.username);
    if (!validUsername) {
      setErrors({ ...errors, username: 'Username should be 5-16 characters' });
      return;
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
    if (!validEmail) {
      setErrors({ ...errors, email: 'Incorrect email address' });
      return;
    }

    const validPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#.?&])[A-Za-z\d@$!%*#.?&]{8,20}$/.test(values.password);
    if (!validPassword) {
      setErrors({ ...errors, password: '8-20 char(1 number, 1 letter and 1 special char)' });
      return;
    }

    if (values.password !== values.confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Passwords don't match" });
      return;
    }


    if (Object.keys(updatedErrors).length > 0) {
      setErrors({ ...errors, ...updatedErrors });
      return;
    }

    setErrors({});

    try{
      const response = await fetch('http://localhost:4001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password
        })
      });
      if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || 'Błąd Rejestracji');
      }

      setErrors({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        general: "",
        registrationSuccess: "Registration successful! Please check your email to confirm your registration."
      });
      setValues({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      });

    }catch(error){
      setErrors({ ...errors, general: error.message });
    }
  };


  const onChange = (e) =>{
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
   
    
    const letterRegex = /[a-zA-Z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    let errorMessage = "";
        if (name === "username" && value.length > 0) {
            if (value.length < 5 || value.length > 16) {
                errorMessage = "Username should be 5-16 characters";
            }
        } else if (name === "email" && value.length > 0) {
            if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){
              errorMessage = "incorrect email address";
            }
        } else if (name === "password" && value.length > 0) {
            if(value.length < 8 || value.length > 20 || !letterRegex.test(value) || !digitRegex.test(value) || !specialCharRegex.test(value)){
              errorMessage = "8-20 char(1 number, 1 letter and 1 special char)";
            }
        } else if (name === "confirmPassword" && value.length > 0) {
            if(value!==values.password){
              errorMessage = "passwords don't match";
            }
        }
        setErrors({ ...errors, [name]: errorMessage });
  }

    return (
      <div className={styles.registration}>
        <form onSubmit={handleSubmit}className={styles.registrationForm}>
          <div className={styles.forms}></div>
            <div className={styles.registerTitle}>REGISTRATION</div>
            <div className={styles.indata}>
                {
                  inputs.map((input) => (
                    <div key={input.id} className={styles.inputWrapper}>
                      <div className={styles.inputContainer} >
                      <input 
                          className={styles.inputy} 
                          key={input.id}
                          type={input.type} 
                          name={input.name}
                          placeholder={input.placeholder}
                          value={values[input.name]} 
                          onChange={onChange}/>
                    
                    {(input.id === 3 || input.id === 4) && (
                    <span className={styles.icona} onClick={() => togglePasswordVisibility(input.name)}>
                        {input.name === "password" ? (showPassword ? <FaLockOpen/> : <FaLock/>) : (showConfirmPassword ? <FaLockOpen/> : <FaLock/>)}
                    </span>)}
                    </div>
                    {errors[input.name] && <span className={styles.errorsy}>{errors[input.name]}</span>}

                  </div>
                ))}
            </div>
              {errors.general && <div className={styles.error}>{errors.general}</div>}
              {errors.registrationSuccess && <div className={styles.registrationSuccess}>{errors.registrationSuccess}</div>}
            <div>
            
                <button type="submit" className={styles.btn}>Sign up</button>
            </div>
            <div>
                <p className={styles.textToLogin}>Click <a href='/login'>here</a> to log in</p>
            </div>
        </form>
      </div>
    )
}
  
export default Registration