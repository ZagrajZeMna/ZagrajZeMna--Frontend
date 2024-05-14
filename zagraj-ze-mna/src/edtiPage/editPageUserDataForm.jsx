/*
    editPageUserDataForm:
    - return form for updating user info exept avatar
    - sends all changes to the back
*/

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EditPageUserDataForm = () =>{

    //data from fetch
    //user data = all actual profile info
    const [dataFromGet, setDataFromGet] = useState(null);
    //languages = all languages that are in database
    const [allLanguages, setALanguages] = useState(null);

    //errors with fetching
    const [error, setError] = useState(null);
    const [errorLang, setErrorLang] = useState(null);
    const [errorPost, setErrorPost] = useState(null);

    //erros message to display
    const [displayErrorMessage, setDEM] = useState('');

    //if there is no errors this is set to true and message
    //that data was properly updated is shown
    const [dataUpdated, setDU] = useState(false);
    
    //used for storing user data 
    //and displaying it in form inputs
    const [myNick, setMyNick] = useState('')
    const [aboutMe, setAboutMe] = useState('')
    const [myCountry, setMyCountry] = useState('')
    const [myCity, setMyCity] = useState('')
    const [choosenLang, setchLang] = useState(1)
    const [myContact, setMyContact] = useState('')

    //used for checking if user was changing certain data
    //when submit send only necessery changes not all changes
    const [nickChange, setNickChange] = useState(false)
    const [aboutChange, setAboutChange] = useState(false)
    const [countryChange, setCountryChange] = useState(false)
    const [cityChange, setCityChange] = useState(false)
    const [langChange, setLangChange] = useState(false)
    const [contactChange, setContactChange] = useState(false)

    //if some data was changed this is set to true
    //then "you don't save your changes" text is shown
    //if user submit changes then it is sets to false again
    const [wasChanged, setChange] = useState(false);

    //if true display info that data was changed
    const [dataActualized, setActualized] = useState(false);


    //handles submit
    const handleSubmit = async(e) =>{
        e.preventDefault();

        //username needs to be something
        if(nickChange && !myNick.trim())
        {
            setNickChange(false);
            setDEM('Nie możesz ustawić pustego nicku');
        }

        //if nick was sets to the previous version we sets
        //that there is no need to update nick
        //without this error shows that username must be unique
        if(dataFromGet != null)
            if(nickChange && myNick == dataFromGet.username);
                setNickChange(false);


        //BELOW
        //below are few ifs that checks if we are not sending empty data to back
        //backend prevents this so if user wants to sets empty bio or something
        //we change empty to space 
        if(aboutChange && !aboutMe.trim())
        {
            setAboutMe(" ");
        }

        if(contactChange && !myContact.trim())
        {
            setMyContact(" ");
        }

        if(cityChange && !myCity.trim())
        {
        
            setMyCity(" ");
        }

        if(countryChange && !myCountry.trim())
        {
        
            setMyCountry(" ");
        }


        //ifs below prepare variables for connection with back
        //and call fetch function
        if(wasChanged){
            if(nickChange)
            {
                let body = { "username": `${myNick}` };
                let url = 'http://localhost:4001/api/profile/postUsername'
                fetchPostBody(e,url,body);
                setNickChange(false);
            }
            if(aboutChange)
            {
                let body = { "about": `${aboutMe}` };
                let url = 'http://localhost:4001/api/profile/updateAbout'
                fetchPostBody(e,url,body);
                setAboutChange(false);
            }
            if(langChange)
            {
                let body = { "languageId": `${choosenLang}` };
                let url = 'http://localhost:4001/api/profile/setUserLanguage'
                fetchPostBody(e,url,body);
                setLangChange(false);
            }
            if(cityChange)
            {
                let body = { "city": `${myCity}` };
                let url = 'http://localhost:4001/api/profile/updateCity'
                fetchPostBody(e,url,body);
                setCityChange(false);
            }
            if(countryChange)
            {
                let body = { "country": `${myCountry}` };
                let url = 'http://localhost:4001/api/profile/updateCountry'
                fetchPostBody(e,url,body);
                setCountryChange(false);
            }
            if(contactChange)
            {
                let body = { "contact": `${myContact}` };
                let url = 'http://localhost:4001/api/profile/updateContact'
                fetchPostBody(e,url,body);
                setContactChange(false);
            }

            
            setChange(false);
            console.log(errorPost);

            if(errorPost != null)
            {
                if(errorPost == "This username is already taken.")
                {
                    setDEM('Nazwa użytkownika jest już zajęta! Wybiesz inną!');
                    console.log(displayErrorMessage);
                }
            }
            else
                setDU(true);

            
        }
        
        
        
    }
    /* FETCH FOR UPDATING USER DATA
    - as parameters it takes:
    - e
    - url - witch is url to back like http://localhost:4001/api/profile/updateContact
    - body - witch is something like body = {"data_name": "data"}
    */
    const fetchPostBody = async(e, url, body) =>{
        try {
            
            //clearing previous errors
            setErrorPost(null);

            //taking token
            const token = localStorage.getItem('token');
                
            //if token not exist = we are log out
            //TODO: add checking if token is expired
            if(!token)
            {   
                //setting error that we are log out
                setErrorPost('Twoja sesja wygasła');
                return;
            }
            //deleting Quotes from token
            const tokenWithoutQuotes = token.replace(/"/g, '');

            //connection with backend
            //headers are importatant, we set there conections-type
            //and sends token to back (backend needs token to check if we are log in or log out)
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization' : `Bearer ${tokenWithoutQuotes}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    body
                ),
            });
            
            //checking backend respond
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.message || 'Błąd logowania');
            }
            

            //below is text respond of backend it is something like:
            //country properly updated, I am not using it
            //const text = await response.text();

            //error catching
        } catch (error2) {
            setErrorPost(error2.message);
        }
    }


    //function that is used for adding all languages to select box
    //returns just select box options
    //this function need to be called betwenn <select>{this function}</select> 
    const add_options_to_select = () =>
    {
        //return value
        let content = []

        //checks if languages was download from backedn
        if(allLanguages != null && errorLang == null)
        {
            //adds all languages
            for(let i=0; i<allLanguages.length; i++)
            {
                let name = allLanguages[i].LANGUAGE;
                let id = allLanguages[i].ID_LANGUAGE;
                
                //if finds current user language sets it to selected
                if(choosenLang == id)
                {
                    content.push(
                        <option key={id} value={id} defaultValue={name}>
                            {name}
                        </option>);
                }
                //adds others languages
                else
                {
                    content.push(
                        <option key={id} value={id}>
                            {name}
                        </option>);
                }
            }
        }

        //returning options for select box
        return content;
    }

    //fetching user data from backend
    /*  USER DATA:
        - user's nick
        - user's bio
        - user's contact data
        - user's languge
        - user's city
        - user's country
     */
    useEffect(()=>{
        const getData = async () => {
            try{

                const token = localStorage.getItem('token');
                
                //if token not exist = we are log out
                if(!token){
                    setError('Please log in');
                    return;
                }
                const tokenWithoutQuotes = token.replace(/"/g, '');

                //fetching user data
                const response = await fetch('http://localhost:4001/api/profile/getUserDetails',{
                    method:'GET',
                    headers: {
                        'Authorization' : `Bearer ${tokenWithoutQuotes}`
                    }
                    });

                    //if response is bad
                    if(!response.ok){
                        throw new Error('can not reach Your data');
                    }

                    //parsing to json
                    const dataFromGet = await response.json();
                    
                    //setting data
                    setDataFromGet(dataFromGet);
                    setError(null);
                    console.log("Dane: ", dataFromGet);
                    if(dataFromGet)
                    {
                        if(dataFromGet.username != null)
                            setMyNick(dataFromGet.username);
                        
                        if(dataFromGet.about != null)
                            setAboutMe(dataFromGet.about);
                        
                        if(dataFromGet.ID_LANGUAGE != null)
                            setchLang(dataFromGet.ID_LANGUAGE)
                        
                        if(dataFromGet.country != null)
                            setMyCountry(dataFromGet.country)
                        
                        if(dataFromGet.city != null)
                            setMyCity(dataFromGet.city)
                        
                        if(dataFromGet.contact != null)
                            setMyContact(dataFromGet.contact)
                    }
                    
                }catch (error){
                //setting error if occurs
                setError(error.message);
            }
        };
        
        getData();
    }, []);

    //fetching data from backend
    //gets all languages from database
    useEffect(()=>{
        const getLanguages = async () => {
            try{

                const token = localStorage.getItem('token');
                
                //if token not exist = we are log out
                if(!token){
                    setErrorLang('Please log in');
                    return;
                }
                const tokenWithoutQuotes = token.replace(/"/g, '');

                //fetching user data
                const response = await fetch('http://localhost:4001/api/profile/getAllLanguages',{
                    method:'GET',
                    headers: {
                        'Authorization' : `Bearer ${tokenWithoutQuotes}`
                    }
                    });

                    //if response is bad
                    if(!response.ok){
                        throw new Error('can not reach Your data');
                    }

                    //parsing to json
                    const allLanguages = await response.json();
                    
                    //setting data
                    setALanguages(allLanguages);
                    setErrorLang(null);
                    console.log("Dane: ", allLanguages);
                    console.log("Długość: ", allLanguages.length)
                }catch (error){
                //setting error if occurs
                setErrorLang(error.message);
            }
        };
        
        getLanguages();
    }, []);


    //return HTML structure
    return(
        <div className="userFormContainer">
            <form className="myFormClass" onSubmit={handleSubmit}>
                <div className="nickInput">
                    <p>Mój nick: </p>  
                    <input 
                    type = "text" 
                    value={myNick}
                    onChange={(e) => (setMyNick(e.target.value), setChange(true), setNickChange(true), setDU(false))} 
                    >
                    </input>
                </div>
                
                <div className='countryInput'>
                    <p>Kraj:</p>
                    <input
                    type="text"
                    value={myCountry}
                    onChange={(e) => (setMyCountry(e.target.value), setChange(true), setCountryChange(true), setDU(false))} 
                    >
                    </input>
                </div>

                <div className='cityInput'>
                    <p>Miasto:</p>
                    <input
                    type="text"
                    value={myCity}
                    onChange={(e) => (setMyCity(e.target.value), setChange(true), setCityChange(true), setDU(false))} 
                    >
                    </input>
                </div>

                <div className='contactInput'>
                    <p>Dane kontakowowe:</p>
                    
                    <input
                    type="text"
                    value={myContact}
                    onChange={(e) => (setMyContact(e.target.value), setChange(true), setContactChange(true), setDU(false))} 
                    >
                    </input>
                    <p><i>UWAGA! <br/> Twoje dane kontakowe są widoczne tylko dla użytkowników, z którymi dzielisz lobby.
                        Jeżeli nie chcesz nie musisz dzielić się swoimi danymi kontatkowymi. Przykładowe dane kontakowe
                        to mail albo konto na discordzie</i></p>
                </div>

                <div className='selectLanguage'>
                    <p>Język: </p>
                    <select id='lang' onChange={(e) => (setchLang(e.target.value), setLangChange(true), setChange(true), setDU(false))}>
                        {add_options_to_select()}
                    </select>
                </div>

                <div className="aboutInput">
                    <p>Opis postaci: </p>  
                    <textarea  
                    value={aboutMe}
                    onChange={(e) => (setAboutMe(e.target.value), setChange(true), setAboutChange(true), setDU(false))} 
                    >
                    </textarea>
                </div>
                
                {wasChanged && (<div>
                    <p> Masz niezapisane zmiany</p>
                </div>)}
                {errorPost && (<div>
                    <p>{displayErrorMessage}</p>
                </div>)}
                <button className=" saveButton" type="submit"> Zapisz </button>
            </form>
        </div>
    );    
}

export default EditPageUserDataForm;