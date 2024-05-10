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
import { FaUser } from "react-icons/fa";
import { LuArrowBigLeftDash } from "react-icons/lu";
import { LuArrowBigRightDash } from "react-icons/lu";
import { RxThickArrowLeft } from "react-icons/rx";
import { RxThickArrowRight } from "react-icons/rx";

const UserPageLobbys = () =>{

    const gangImages = [gang, gang2];
    const [curentGangImage, setCGImage] = useState(gang);
    const [firstTime, setFT] = useState(true);
    

    //to check screen dimensions
    const { height, width } = useScreenSize();

    //variables
    var number = 0;

    //functions
    const addlobbys = () =>
    {
        let content = [];
        let additionalClass = '';

        for(let i=0; i<3; i++)
        {  
            
            content.push(
                <div key={i} className={'lobbyOne'}>
                    <div className='lobbyPicture flotLeftClassOrSth col-4 col-md-2'>
                        <img src={Ludek} alt='obraz przedstawiający lobby' className='img-fluid lobbyPictureImg'/>
                    </div>
                    <div className='lobbyInfoContainer flotLeftClassOrSth col-6 col-md-9'>
                        <div className='lobbyTitle'> Moje lobby </div>
                        <div className='lobbyDescription'> Nie chce grać, tak o se siedzę i używam tego jako listy zakupów. A dwa miejsca tutaj sobie wstawiłem w sumie nie wiem czemu o tak o
                        </div>
                    </div>
                    
                    <div className='addedPlayers flotLeftClassOrSth col-2 col-md-1'> 1/2<FaUser/> </div>
                    <div className='clearer'></div>
                </div>
            );
        }

        return content;
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
            setFT(false)
        }
            
    }

    return(
        <div className="myLobbys">
            
            {(width >= 992) && (<div className='walkingAnimationConteiner'  onLoad={firstTimeSettingInterval}>               
                <div className='moving_div_gang'>
                    <img src = {curentGangImage} alt = 'some walking guys i quess' className='wallking_gang img-fluid' id='pictureToChange'/>
                </div>
                <div className='hider hiderLeft'>
                    <div className='hiderNotTransparentLeft'></div>
                    <div className='hiderTransparentLeft'></div>
                </div>
                <div className='clearer'></div>
                <div className='hider hiderRight'>
                    <div className='hiderTransparentRight'></div>
                    <div className='hiderNotTransparentLeft'></div>
                </div>
                <div className='clearer'></div>
            </div>)}

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