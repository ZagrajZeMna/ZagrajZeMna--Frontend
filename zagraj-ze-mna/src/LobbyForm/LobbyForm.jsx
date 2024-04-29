import styles from './LobbyForm.module.css'
import React, { useState } from 'react';
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function LobbyForm() {

  const [values, setValues] = useState({
    gameName:"",
    Name:"",
    Description:"",
    language:"",
    NeedUsers:""  
  });

  const [error, setError] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  const inputs = [
    {
        id:1,
        name:"gameName",
        options: ["CS2", "LOL", "Valorant"],
        displayValue: "Nazwa gry"
    },
    {
        id:2,
        name:"Name",
        type:"text",
        placeholder:"Tytuł lobby",
    },
    {
        id:3,
        name:"Description",
        type: "text",        
        placeholder:"Opis"
      },
    {
        id:4,
        name:"language",
        options: ["Polski", "Angielski", "Niemiecki"],
        displayValue: "Language"
    },
    {
      id:5,
      name:"NeedUsers",
      options: ["1", "2", "3", "4", "5"],
      displayValue: "Numer of Needed Players "
    }
  ];



  const handleSubmit = async (e) => {
    e.preventDefault();

    const allFieldsFilled = Object.values(values).every(value => value.trim() !== '');

    if (!allFieldsFilled) {
      setError({ general: 'Please fill in all fields.' });
      return;
    }

    try{
      const token = localStorage.getItem('token').replace(/"/g, '');
      const response = await fetch('http://localhost:4001/api/lobby/add', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          gameName: values.gameName,
          Name: values.Name,
          Description: values.Description,
          language: values.language,
          NeedUsers: values.NeedUsers
        })
      });
      if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || 'Błąd tworzenia formularza');
      }

      setValues({
        gameName:"",
        Name:"",
        Description:"",
        language:"",
        NeedUsers:"" 
      });
      setError("Lobby zostało utworzone pomyślnie");

    }catch(error){
      setError(error.message );
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };


    return (
      <div className={styles.mainFormContainer}>
        <IoAddCircleOutline onClick={toggleFormVisibility} className={`${styles.iconPlus} ${formVisible ? styles.rotate : ''}`}/>
        
          <form onSubmit={handleSubmit}
        className={`${styles.registrationForm} ${formVisible ? styles.visible : ''}`}>
            <div className={styles.forms}></div>
              <div className={styles.registerTitle}>Formularz</div>
              <div className={styles.indata}>
                  {
                    inputs.map((input) => (
                      <div key={input.id} className={styles.inputWrapper}>
                        <div className={styles.inputContainer} >
                        {input.type === 'text' ? ( 
                          <input
                            className={styles.inputy} 
                            type={input.type} 
                            name={input.name}
                            placeholder={input.placeholder}
                            value={values[input.name]} 
                            onChange={handleChange}/>
                            ) : (
                              <select
                                className={styles.inputy}
                                name={input.name}
                                value={values[input.name]}
                                onChange={handleChange}
                              >
                                <option value="">Select {input.displayValue}</option>
                                  {input.options.map(option => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                              </select>
                            )}
                      </div>
                    </div>
                  ))}
                </div>
              <div>
                {error && <div className={styles.error}>{error}</div>}    
              </div>
              <div>
                  <button type="submit" className={styles.btn}>Make Lobby</button>
              </div>
          </form>
        </div>
    )
}
  
export default LobbyForm