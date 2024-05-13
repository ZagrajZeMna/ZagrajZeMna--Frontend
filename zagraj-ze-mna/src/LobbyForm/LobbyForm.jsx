import styles from './LobbyForm.module.css'
import React, { useState, useRef, useEffect } from 'react';
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
  const [dataFromGet, setDataFromGet] = useState(null);

  

  useEffect(()=>{
    const getData = async () => {
      try{
        const response = await fetch(`http://localhost:4001/api/lobby/data`);
        if(!response.ok){
          throw new Error('Nie udało się poprać danych');
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
        id:1,
        name:"gameName",
        options: dataFromGet ? dataFromGet.Games.map(game => game.name) : [],
        displayValue: "nazwę gry"
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
        options: dataFromGet ? dataFromGet.Languages.map(language => language.LANGUAGE) : [],
        displayValue: "Język"
    },
    {
      id:5,
      name:"NeedUsers",
      options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      displayValue: "liczbę graczy potrzebnych w lobby "
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allFieldsFilled = Object.values(values).every(value => value.trim() !== '');

    if (!allFieldsFilled) {
      setError('Please fill in all fields.' );
      return;
    }


    try{
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in!');
        return;
      }
      const tokenWithoutQuotes = token.replace(/"/g, '');
      const response = await fetch('http://localhost:4001/api/lobby/add', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${tokenWithoutQuotes}`
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
      setTimeout(() => {
        setError(null);
      }, 5000);

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
      <div className={styles.scrollContainer}>
      <div className={styles.mainFormContainer}>
        <IoAddCircleOutline onClick={toggleFormVisibility} className={`${styles.iconPlus} ${formVisible ? styles.rotate : ''}`}/>
        <div className={styles.registerTitle}>STWÓRZ LOBBY</div>
          <form onSubmit={handleSubmit}
            className={`${styles.registrationForm} ${formVisible ? styles.visible : ''}`}>
              
              
                <div className={styles.inputContainer} >
                  {
                    inputs.map((input) => (
                      <div key={input.id}>
                        
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
                </div>
               
              
              <div className={styles.btnContainer}>
                  <button type="submit" className={styles.btn}>Make Lobby</button>
                  <div>
                    {error && <div className={styles.error}>{error}</div>}    
                  </div>
              </div>
              
          </form>
        </div>
        </div>
    )
}
  
export default LobbyForm