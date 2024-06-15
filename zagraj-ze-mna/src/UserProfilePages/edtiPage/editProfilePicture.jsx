import './editPageBanner.css';
import './editProfilePicture.css';


import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Ludek from '../../assets/testowy_ludek.png';
import { useState } from 'react';
import {postFetchJWT} from '../../fetches/postFetch';
import useGetToken from '../../fetches/useFetch';
import useScreenSize from '../../hooks/dimensions';


const EditPageUserPicture = () => {

    const [cropper, setCropper] = useState(null);
    const [imageWidth, setImageWidth] = useState('200px');
    const [imageHeight, setImageHeight] = useState('200px');
    const [avatarURL, setNewAvatarUrl] = useState('');
    const [sizeWasChecked, setChecked] = useState(false);
    const [onlyOnce, setOnlyOnce] = useState(false);
    const [notSaveYet, setNotSaved] = useState(false);
    const [savedProperly, setSaved] = useState(false);
    const [displayError, setDError] = useState(false);
    const [myErrorMessage, setErrorMessage] = useState('');
    const [waitAMoment, setWAM] = useState(false);

    const DataRespond = useGetToken('/api/profile/getUserDetails');

    const { height, width } = useScreenSize();
    const [prevousWidth, setPW] = useState(0);

    const getCropData = async () => {
        if (cropper) {
          const file = await fetch(cropper.getCroppedCanvas().toDataURL())
            .then((res) => res.blob())
            .then((blob) => {
              return new File([blob], "newAvatar.png", { type: "image/png" });
            });
        if(file){
            const dataForm = new FormData();
            dataForm.append('avatar', file);

            setNotSaved(false);
            setWAM(true);

            let respond = await postFetchJWT('/api/profile/postAvatarFile', dataForm, false);
            let myError = respond.isError;
            let myErrorMessageHere = respond.errorMessage;
            setDError(myError);
            setErrorMessage(myErrorMessageHere);
            
            console.log(myErrorMessage);

            if(!myError){
                setSaved(true);
                setWAM(false);
            }
                

            
        }
          
        }
      };

    const getNewAvatarUrl = (e) => {
        
        var file = e.target.files[0];
        setNewAvatarUrl(URL.createObjectURL(file));
        setChecked(false);
        setNotSaved(true);
        setSaved(false);
        
            
    };
    
    function firstAvatarSetter()
    {   
        if(!onlyOnce){
            setNewAvatarUrl(DataRespond.data.avatar);
            setOnlyOnce(true);
            setPW(width);
        }
        
    }

    function setCropperSizeAction()
    {
        if(document.getElementById("checkingSize") != null){
            let height_my = document.getElementById("checkingSize").height;
            let width_my = document.getElementById("checkingSize").width;
                        

            if(width_my < 200)
                width_my = 200;

            if(height_my < 200)
                height_my = 200;

            let width_s = width_my+'px';
            let height_s=height_my+'px';

            setImageWidth(width_s);
            setImageHeight(height_s);

            setChecked(true);
        }
        

        
    }

    function setSizeOfCropper()
    {
        if(!sizeWasChecked && onlyOnce){
                
            setTimeout(function(){
                setCropperSizeAction();
            }, 300);

            
            
        }
    }

    function resizeChecker(){
        if(width != prevousWidth && sizeWasChecked)
        {
            setPW(width);
            setChecked(false);
        }
    }

    return(
        <div className='editProfilePictureContainer'>
            <div className='paddingBanner col-12'>
                <div className='EditPageBanner'>
                    <h1>
                        <span className='colorLetterPurple'>Z</span>djęcie <span className='colorLetterPurple'>P</span>rofilowe
                    </h1>
                </div>
            </div>

            <div className='cropeerImageContainer toTheLeft col-12 offset-md-1 col-md-5'>
                

                <div className='ImageArea backgroundHere' onLoad={resizeChecker()}>

                    {DataRespond.data && !onlyOnce && (<div onLoad={firstAvatarSetter()}></div>)}
                    {DataRespond.data && onlyOnce && !sizeWasChecked && (<>
                        <img src={avatarURL} className='img-fluid' id='checkingSize' alt="zdjęcie twojego avatara jest tutaj"/>
                        <span onLoad={setSizeOfCropper()}></span>
                    </>)}

                    {DataRespond.data && onlyOnce && sizeWasChecked && (<Cropper
                        src={avatarURL}
                        style={{ height: imageHeight, width: imageWidth}}
                        initialAspectRatio={1 / 1}
                        aspectRatio={1 / 1}
                        minCropBoxHeight={100}
                        minCropBoxWidth={100}
                        scalable={false}
                        zoomable={false}
                        rotatable={false}
                        movable={false}
                        guides={false}
                        checkOrientation={false}
                        onInitialized={(instance) => {
                        setCropper(instance);
                        }}
                    />)}
                </div>
                
            </div>
            
            <div className=' toTheLeft col-12 col-md-5'>
                <div className='ImageArea' >

                    <p>Wybierz swoje zdjęcie profilowe. (Maksymalny rozmiar zdjęcia to 5MB ) </p>

                   

                    <input type="file" accept="image/png, image/jpeg, image/jpg" id="fileInputID" className='MyButtonClassSecond' onChange={getNewAvatarUrl}/>
                    <br/>
                    <button onClick={getCropData} className='MyButtonClass'>Zapisz</button>

                    {displayError && (<p className='errorMessage_form biggerFont'>Ups! Coś poszło nie tak!</p>)}
                    {notSaveYet && (<p className='RememberToSaveData biggerFont'>Masz niezapisane zmiany</p>)}
                    {savedProperly && (<p className='EverythinkCorrect biggerFont'>Zapisano</p>)}
                    {waitAMoment && (<p className='RememberToSaveData biggerFont'>Zapisuje...</p>)}

                   
                
                </div>
            </div>

            <div className='clearer'></div>
            <div className='litteSpaceOrSth'></div>
            
        </div>
    );
}

export default EditPageUserPicture;