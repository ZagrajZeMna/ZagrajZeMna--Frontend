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
        placeholder:"nazwa użytkownika",
        errorMessage:"nazwa powinna zawierać od 5 do 16 znaków"
    },
    {
        id:2,
        name:"email",
        type:"text",
        placeholder:"email",
        errorMessage:"Wprowadź poprawny email"
    },
    {
        id:3,
        name:"password",
        type: showPassword ? "text" : "password",        
        placeholder:"hasło",
        errorMessage:"Hasło powinno zawierać od 8 do 20 znaków w tym 1 litere, 1 cyfre  i 1 znak specjalny"
      },
    {
        id:4,
        name:"confirmPassword",
        type: showConfirmPassword ? "text" : "password",
        placeholder:"powtórz hasło",
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
      setErrors({ general: 'Proszę wypełnij wszystkie pola' });
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
      setErrors({ ...errors, username: 'Nazwa powinna zawierać od 5 do 16 znaków' });
      return;
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
    if (!validEmail) {
      setErrors({ ...errors, email: 'Niepoprawny adres email' });
      return;
    }

    const validPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#.?&])[A-Za-z\d@$!%*#.?&]{8,20}$/.test(values.password);
    if (!validPassword) {
      setErrors({ ...errors, password: 'Hasło powinno zawierać od 8 do 20 znaków w tym 1 litere, 1 cyfre  i 1 znak specjalny' });
      return;
    }

    if (values.password !== values.confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Hasła nie są takie same" });
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
        registrationSuccess: "Zostałeś zarejestrowany! Sprawdź email w celu potwierdzenia konta"
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
                errorMessage = "Nazwa powinna zawierać od 5 do 16 znaków";
            }
        } else if (name === "email" && value.length > 0) {
            if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){
              errorMessage = "Niepoprawny adres email";
            }
        } else if (name === "password" && value.length > 0) {
            if(value.length < 8 || value.length > 20 || !letterRegex.test(value) || !digitRegex.test(value) || !specialCharRegex.test(value)){
              errorMessage = "Hasło powinno zawierać od 8 do 20 znaków w tym 1 litere, 1 cyfre  i 1 znak specjalny";
            }
        } else if (name === "confirmPassword" && value.length > 0) {
            if(value!==values.password){
              errorMessage = "Hasła nie są takie same";
            }
        }
        setErrors({ ...errors, [name]: errorMessage });
  }

    return (
      <div className={styles.registration}>
        <form onSubmit={handleSubmit}className={styles.registrationForm}>
          <div className={styles.forms}></div>
            <div className={styles.registerTitle}>Rejestracja</div>
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
            
                <button type="submit" className={styles.btn}>Zarejestruj się</button>
            </div>
            <div>
                <p className={styles.textToLogin}>Zaloguj się <a href='/login'>tutaj</a></p>
            </div>
        </form>
      </div>
    )
}
  
export default Registration