//react
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//css
import './userPageLobbys.css';

//screen dimensions
import useScreenSize from '../hooks/dimensions';

//images
import gang from '../assets/gangA.png';  
import gang2 from '../assets/gangB.png';  
import Ludek from '../assets/testowy_ludek.png';

//icons

import { LuArrowBigLeftDash } from "react-icons/lu";
import { LuArrowBigRightDash } from "react-icons/lu";
import { RxThickArrowLeft } from "react-icons/rx";
import { RxThickArrowRight } from "react-icons/rx";

//fucntions
import singleLobby from "../singleLobby/singleLobby"

const UserPageLobbys = () =>{

    const gangImages = [gang, gang2];
    const [curentGangImage, setCGImage] = useState(gang);
    const [firstTime, setFT] = useState(true);
    

    //to check screen dimensions
    const { height, width } = useScreenSize();

    //variables
    var number = 0;
    var profileDivHeight = 100;

    //functions
    const addlobbys = () =>
    {
        let content = [];
        let additionalClass = '';
        let description = 'W sumie to nie chce w nic grać o tak o se siedzę. Używam tego lobby jako listy zakupów tak naprawdę. A po co miejsce dla drugiej osoby? A w sumie to nie wiem'
        for(let i=0; i<3; i++)
        {  
            
            content.push(singleLobby(i, Ludek, 'Moje lobby', description, 1,2,false));
        }

        return content;
    }

    function setPDHeight(h)
    {
        profileDivHeight = h;
    }
    
    function changeImage()
    {
        number++;
        number = number%2
        setCGImage(gangImages[number]);
    }

    //this make picture change
    function firstTimeSettingInterval()
    {
        if(firstTime)
        {
            setInterval(changeImage, 500);
            setInterval(changeHeightInterval, 200);
            setFT(false)
        }
            
    }


    function checkHeight()
    {
        var h;
        if( document.getElementById('heightSource') !== "undefined" && document.getElementById('heightSource') !== null)
        {
            h = document.getElementById('heightSource').offsetHeight;
            setPDHeight(h)
            

            var helper = profileDivHeight + 'px';
            document.getElementById('heightTarget8').style.height = helper ;
            document.getElementById('heightTarget8').style.height = helper ;
            document.getElementById('heightTarget8').style.height = helper ;
            document.getElementById('heightTarget4').style.height = helper ;
            document.getElementById('heightTarget3').style.height = helper ;
            document.getElementById('heightTarget5').style.height = helper ;
            document.getElementById('heightTarget6').style.height = helper ;
            console.log("height checking");
            
        }
    }

    function changeHeightInterval()
    {
        if( document.getElementById('heightTarget3') !== "undefined" && document.getElementById('heightTarget3') !== null 
            && document.getElementById('heightSource') !== "undefined" && document.getElementById('heightSource') !== null )
        {
            if(document.getElementById('heightTarget3').offsetHeight != document.getElementById('heightSource').offsetHeight)
            {
                checkHeight();
            }
        }
    }

    return(
        <div className="myLobbys">
            
            {(width >= 992) && (<div className='walkingAnimationConteiner' onLoad={firstTimeSettingInterval}>               
                
                <div className='moving_div_gang' id="heightSource">
                    <img src = {curentGangImage} alt = 'some walking guys i quess' className='wallking_gang img-fluid' id='pictureToChange'/>
                </div>
                <div className='hider hiderLeft'>
                    <div className='hiderNotTransparentLeft' id='heightTarget3'></div>
                    <div className='hiderTransparentLeft' id='heightTarget4'></div>
                </div>
                <div className='clearer'></div>
                <div className='hider hiderRight'>
                    <div className='hiderTransparentRight' id='heightTarget5'></div>
                    <div className='hiderNotTransparentLeft' id='heightTarget6'></div>
                </div>
                
                <div className='clearer'></div>
                
            </div>)}
            <div className='positionerOfWalkingGang' id='heightTarget8'></div>
            <div className='mojeDruzyny'>
                 <div className='flotLeftClassOrSth mojeDruzynyTitle'><h1>MOJE DRUŻYNY: </h1></div>
                 <div className='pageArrowLobby'>
                    <table className='tableWithLobbyArrows flotLeftClassOrSth'>
                        <tbody>
                            <tr>
                                <td> <div className='arrowLobby'><LuArrowBigLeftDash /></div></td> 
                                <td> <div className='arrowLobby'><RxThickArrowLeft /></div></td> 
                                <td> <div className='smallPageNumber'>1/2</div></td>  
                                <td> <div className='arrowLobby'><RxThickArrowRight /></div></td>
                                <td> <div className='arrowLobby'><LuArrowBigRightDash/></div></td>
                                    
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='clearer'></div>

            
            </div>
            
            

            <div className='lobbylist'>
                {addlobbys()}
            </div>

           

        </div>
    );
}

export default UserPageLobbys;