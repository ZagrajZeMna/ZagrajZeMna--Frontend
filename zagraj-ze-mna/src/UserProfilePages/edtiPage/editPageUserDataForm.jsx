/*
    editPageUserDataForm:
    - return form for updating user info exept avatar
    - sends all changes to the back
*/

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {postFetchJWT} from '../../fetches/postFetch'
import useGetToken from '../../fetches/useFetch';

import './editPageUserDataForm.css';
import './editPageBanner.css'

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const EditPageUserDataForm = () =>{

    //data from fetch
    //user data = all actual profile info
    //const [dataFromGet, setDataFromGet] = useState(null);
    //languages = all languages that are in database
    const [allLanguages, setALanguages] = useState(null);

    //errors with fetching
    const [error, setError] = useState(null);
    const [errorLang, setErrorLang] = useState(null);
    const [errorPost, setErrorPost] = useState(null);
    const [dataLoad, setDataLoad] = useState(false);

    //erros message to display
    const [displayErrorMessage, setDEM] = useState('');

    //if there is no errors this is set to true and message
    //that data was properly updated is shown
    const [dataUpdated, setDU] = useState(false);

    const [firstTime ,setFT] = useState(true);
    
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

    const [langLoaded, setLangLoaded] = useState(false);
    
    //getting data needed for this page
    const {isPending, isError, errorMessage, data} = useGetToken('/api/profile/getUserDetails');
    const DataRespond = useGetToken('/api/profile/getAllLanguages');
    const MyData = useGetToken('/api/profile/getUserById/?id=2');
    //console.log('data:' ,MyData);
    

    //handles submit
    const handleSubmit = async (e) =>{
        e.preventDefault();
        let is_error = null;
        let errorMessage = null;
        let respond= {};
        //username needs to be something
        if(nickChange && !myNick.trim())
        {
            setNickChange(false);
            setDEM('Nie możesz ustawić pustego nicku');
        }

        //if nick was sets to the previous version we sets
        //that there is no need to update nick
        //without this error shows that username must be unique
        if(data != null)
            if(nickChange && myNick == data.username);
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
                let url = '/api/profile/postUsername'
                respond = await postFetchJWT(url,body);
                is_error = respond.isError;
                errorMessage = respond.errorMessage;
                setNickChange(false);
            }
            if(aboutChange)
            {
                let body = { "about": `${aboutMe}` };
                let url = '/api/profile/updateAbout'
                respond = await postFetchJWT(url,body);
                is_error = respond.isError;
                errorMessage = respond.errorMessage;
                setAboutChange(false);
            }
            if(langChange)
            {
                let body = { "languageId": `${choosenLang}` };
                let url = '/api/profile/setUserLanguage'
                respond = await postFetchJWT(url,body);
                is_error = respond.isError;
                errorMessage = respond.errorMessage;
                setLangChange(false);
            }
            if(cityChange)
            {
                let body = { "city": `${myCity}` };
                let url = '/api/profile/updateCity';
                respond = await postFetchJWT(url,body);
                is_error = respond.isError;
                errorMessage = respond.errorMessage;
                setCityChange(false);
            }
            if(countryChange)
            {
                let body = { "country": `${myCountry}` };
                let url = '/api/profile/updateCountry'
                respond = await postFetchJWT(url,body);
                is_error = respond.isError;
                errorMessage = respond.errorMessage;
                setCountryChange(false);
            }
            if(contactChange)
            {
                let body = { "contact": `${myContact}` };
                let url = '/api/profile/updateContact'
                respond = await postFetchJWT(url,body);
                is_error = respond.isError;
                errorMessage = respond.errorMessage;
                setContactChange(false);
            }

            
            setChange(false);
            setDU(false);

            if(is_error)
            {
                setErrorPost(true);
                if(errorMessage == "This username is already taken.")
                {
                    setDEM('Nazwa użytkownika jest już zajęta! Wybiesz inną!');
                    //console.log(displayErrorMessage);
                }
                else if(errorMessage == 'Forbiden request! Please log in!')
                {
                    setDEM('Sesja wygasła, proszę się zalogować.')
                    //console.log(displayErrorMessage);
                }
            }
            else
                setDU(true);

            
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

    function setData()
    {


        if(data != null && !dataLoad){
            setDataLoad(true);
            if(data.username != null)
                setMyNick(data.username);
                    
            if(data.about != null)
                setAboutMe(data.about);
                    
            if(data.ID_LANGUAGE != null)
                setchLang(data.ID_LANGUAGE)
                    
            if(data.country != null)
                setMyCountry(data.country)
                    
            if(data.city != null)
                setMyCity(data.city)
                    
            if(data.contact != null)
                setMyContact(data.contact)
        }
        
    }

    function setDataLang()
    {
        if(DataRespond.data != null && !langLoaded){
            setLangLoaded(true);
            setALanguages(DataRespond.data);
        }
    }

//*/
    //return HTML structure
    return(
        <div className="userFormContainer col-12">
           {!isError && (<div className='dataGetter' onLoad={setData()}></div>)}
           {!DataRespond.isError && (<div className='dataGetter' onLoad={setDataLang()}></div>)}

            <form className="myFormClass col-12" onSubmit={handleSubmit}>

                <div className='EditPageBanner'>
                    <h1>
                        <span className='colorLetterPurple'>E</span>dytuj <span className='colorLetterPurple'>P</span>rofil
                    </h1>
                </div>

                <div className='formContainerSmall'>
                <div className='leftSideOfForm toTheLeft widthBig col-10 offset-1 offset-md-0 col-md-6'>
                    <div className="nickInput myInputClass">
                        <p>Mój nick: </p>  
                        <input 
                        type = "text" 
                        value={myNick}
                        onChange={(e) => (setMyNick(e.target.value), setChange(true), setNickChange(true), setDU(false))} 
                        >
                        </input>
                    </div>
                    
                    <div className='countryInput myInputClass'>
                        <p>Kraj:</p>
                        <input
                        type="text"
                        value={myCountry}
                        onChange={(e) => (setMyCountry(e.target.value), setChange(true), setCountryChange(true), setDU(false))} 
                        >
                        </input>
                    </div>

                    <div className='cityInput myInputClass'>
                        <p>Miasto:</p>
                        <input
                        type="text"
                        value={myCity}
                        onChange={(e) => (setMyCity(e.target.value), setChange(true), setCityChange(true), setDU(false))} 
                        >
                        </input>
                    </div>

                    <div className='contactInput myInputClass'>
                        <p>Dane kontakowowe:</p>
                        
                        <input
                        type="text"
                        value={myContact}
                        onChange={(e) => (setMyContact(e.target.value), setChange(true), setContactChange(true), setDU(false))} 
                        >
                        </input>
                        <p><i>UWAGA! </i><br/>
                            Jeżeli nie chcesz nie musisz dzielić się swoimi danymi kontatkowymi. Przykładowe dane kontakowe
                            to mail albo konto na discordzie</p>
                    </div>

                    <div className='selectLanguage myInputClass'>
                        <p>Język: </p>
                        <select id='lang' onChange={(e) => (setchLang(e.target.value), setLangChange(true), setChange(true), setDU(false))}>
                            {add_options_to_select()}
                        </select>
                    </div>
                </div>
                

                <div className="aboutInput rightSideOfForm widthBig toTheLeft col-10 offset-1 col-md-6 offset-md-0">
                    <p>Opis postaci: </p>  
                    <textarea  
                    value={aboutMe}
                    onChange={(e) => (setAboutMe(e.target.value), setChange(true), setAboutChange(true), setDU(false))} 
                    >
                    </textarea>
                </div>
                
                <div className='clearer'></div>
                <div className='MessageFromForm'>
                    {wasChanged && (<div className='RememberToSaveData'>
                    <p> Masz niezapisane zmiany!</p>
                    </div>)}
                    {errorPost && (<div className='errorMessage_form'>
                        <p>{displayErrorMessage}</p>
                    </div>)}
                    {dataUpdated && (<div className='EverythinkCorrect'>
                        <p>Zaktualizowano!</p>
                    </div>)}
                </div>
                <div className="SavingButton">
                    <button className=" saveButton" type="submit"> Zapisz </button>
                </div>
                
                </div>
            </form>

            
            
        </div>
    );    
}

export default EditPageUserDataForm;