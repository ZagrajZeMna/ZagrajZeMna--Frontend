import styles from './LobbyForm.module.css'
import React, { useState, useEffect } from 'react';
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function LobbyForm({ gameNameProp,lopata,setLopata}) {
  const [values, setValues] = useState({
    Name:"",
    Description:"",
    language:"Polski",
    NeedUsers: 5 // Default value for NeedUsers
  });
  const [error, setError] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [dataFromGet, setDataFromGet] = useState(null);

  useEffect(()=>{
    const getData = async () => {
      try{
        const response = await fetch(`https://zagrajzemna-backend.onrender.com/api/lobby/data`);
        if(!response.ok){
          throw new Error('Nie udało się pobrać danych');
        }
        const dataFromGet = await response.json();
        setDataFromGet(dataFromGet);
        console.log(dataFromGet);
      }catch (error){
        setError(error.message);
      }
    };

    getData();
  }, []);

 
  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
    setError(null);
  };

  const inputs = [
    {
        id:2,
        name:"Name",
        type:"text",
        placeholder:"Tytuł lobby",
        maxLength: 20
    },
    {
        id:3,
        name:"Description",
        type: "text",        
        placeholder:"Opis",
        maxLength: 75
      },
    {
        id:4,
        name:"language",
        options: dataFromGet ? dataFromGet.Languages.map(language => language.LANGUAGE) : [],
        displayValue: "Język"
    },
    
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allFieldsFilled = Object.values(values).every(value => {
      // Check if the value is not an empty string or undefined
      return value !== "" && value !== undefined;
    });

    // Check if NeedUsers is a valid number
    const isNeedUsersValid = !isNaN(values.NeedUsers);

    if (!allFieldsFilled || !isNeedUsersValid) {
      setError('Uzupełnij wszystkie pola.');
      return;
    }


    try{
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in!');
        return;
      }
      const tokenWithoutQuotes = token.replace(/"/g, '');
      const response = await fetch('https://zagrajzemna-backend.onrender.com/api/lobby/add', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${tokenWithoutQuotes}`
        },
        body: JSON.stringify({
          gameName: gameNameProp, // Use gameName from prop
          Name: values.Name,
          Description: values.Description,
          language: values.language,
          NeedUsers: values.NeedUsers // Include NeedUsers value in the request body
        })
      });
      if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || 'Błąd tworzenia formularza');
      }

      setValues({
        Name:"",
        Description:"",
        language:"Polski",
        NeedUsers: 5 // Reset NeedUsers value after submission
      });

      setError("Lobby zostało utworzone pomyślnie");
      setTimeout(() => {
        setError(null);
      }, 5000);

    }catch(error){
      setError(error.message );
    }
    setLopata(!lopata);

  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSliderChange = (e) => {
    // Update NeedUsers value when slider changes
    setValues({
      ...values,
      NeedUsers: parseInt(e.target.value)
    });
    
  };

  return (
    <div className={styles.scrollContainer}>
      <div className={styles.mainFormContainer}>
        <IoAddCircleOutline onClick={toggleFormVisibility} className={`${styles.iconPlus} ${formVisible ? styles.rotate : ''}`}/>
        <div className={styles.registerTitle}>STWÓRZ LOBBY</div>
        <form onSubmit={handleSubmit} className={`${styles.registrationForm} ${formVisible ? styles.visible : ''}`}>
          <div className={styles.inputContainer}>
            {inputs.map((input) => (
              <div key={input.id}>
                {input.type === 'text' ? ( 
                  <input
                    className={styles.inputy} 
                    type={input.type} 
                    name={input.name}
                    placeholder={input.placeholder}
                    value={values[input.name]} 
                    maxLength={input.maxLength}
                    onChange={handleChange}
                  />
                ) : (
                  <select
                    className={styles.inputy}
                    name={input.name}
                    value={values[input.name]}
                    onChange={handleChange}
                  >
                    <option value="">Wybierz {input.displayValue}</option>
                    {input.options.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
            <div className={styles.slider}>
              <input
                type="range"
                value={values.NeedUsers}
                min="1"
                max="10"
                className={styles.slider}
                onChange={handleSliderChange} // Call handleSliderChange function on slider change
              />
              <span>Liczba graczy: {values.NeedUsers}</span>
            </div>
          </div>
          <div className={styles.btnContainer}>
            <button type="submit" className={styles.btn} >Dodaj Lobby</button>
            <div>{error && <div className={styles.error}>{error}</div>}</div>
          </div>
        </form>
      </div>
    </div>
    
  );
}

export default LobbyForm;
