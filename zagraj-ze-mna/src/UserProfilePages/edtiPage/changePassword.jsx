import { useState } from 'react';
import './editPageBanner.css';
import './changePassword.css';
import { postFetchJWT } from '../../fetches/postFetch';

const ChangePassword = () =>{
    
    const [currentPassowrd, setCurrentPassword] = useState('');
    const [newPassword, setNP] = useState('');
    const [newPassordSecond, setNPS] = useState('');
    const [change, setChange] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setEM] = useState('');
    

    async function handlePasswordChange()
    {   
        setChange(false);
        if(newPassordSecond != newPassword){
            setIsError(true);
            setEM('Hasła nie są takie same! ');
            return;
        }

        let body = {
            "oldPassword": `${currentPassowrd}`,
            "newPassword": `${newPassword}`,
            "confirmPassword": `${newPassordSecond}`
        };

        let url ='/api/profile/changePassword';

        let data_respond = await postFetchJWT(url, body);
        if(data_respond.isError){
            setIsError(true);
            setEM(data_respond.errorMessage);
            return;
        }

        setUpdated(true);
    }

    return(    
        <div className='changePasswordContainer'>
            <div className='gimmeSomeSpacePls'></div>
            {/* Banner */}
            <div className='paddingBanner col-12'>
                <div className='EditPageBanner'>
                    <h1>
                        <span className='colorLetterPurple'>Z</span>mień <span className='colorLetterPurple'>H</span>asło
                    </h1>
                </div>
            </div>
            <div className='col-12 myFormClass'>
            <div className='leftSideOfForm toTheLeft widthBig col-10 offset-1 offset-md-0 col-md-6'>
                <div className="nickInput myInputClass">
                    <p>Obecne hasło: </p>  
                    <input 
                    type = "password" 
                    onChange={(e) => (setCurrentPassword(e.target.value), setChange(true), setUpdated(false), setIsError(false))}>
                    </input>
                </div>
                        
                <div className='countryInput myInputClass'>
                    <p>Nowe hasło:</p>
                    <input
                    type="password"
                    onChange={(e) => (setNP(e.target.value), setChange(true), setUpdated(false), setIsError(false))}>
                    </input>
                </div>

                <div className='cityInput myInputClass'>
                    <p>Powtórz hasło:</p>
                    <input
                    type="password"
                    onChange={(e) => (setNPS(e.target.value), setChange(true), setUpdated(false), setIsError(false))} >
                    </input>
                </div>
            </div>
            <div className="aboutInput colorsWooow rightSideOfForm widthBig toTheLeft col-10 offset-1 col-md-6 offset-md-0">
                <p className='passwordRules'>
                    <span className='biggerText colorPurple'> Zasady hasła 🤓: <br/> </span>
                    <span className='colorPurple'>1.</span> Hasło musi mieć przynajmniej 8 znaków <br/>
                    <span className='colorPurple'>2.</span>  Hasło musi mieć przynajmniej 1 duża literę <br/>
                    <span className='colorPurple'>3.</span>  Hasło musi mieć przynajmniej 1 cyfrę <br/>
                    <span className='colorPurple'>4.</span>  Hasło musi mieć prznajmniej 1 znak specjalny <br/>
                </p>
            </div>

            <div className='clearer'></div>

            <div className="SavingButton">
                    <button className=" saveButton" onClick={handlePasswordChange}> Zmień </button>
            </div>

            <div className='MessageFromForm'>
                {change && (<div className='RememberToSaveData'>
                    <p> Masz niezapisane zmiany! </p>
                </div>)}
                {isError && (<div className='errorMessage_form'>
                    <p>{errorMessage} 🫠</p>
                </div>)}
                {updated && (<div className='EverythinkCorrect'>
                    <p>Zapisano! 🫡</p>
                </div>)}
            </div>

            </div>

            
            
        </div>

        
    );
}

export default ChangePassword;
