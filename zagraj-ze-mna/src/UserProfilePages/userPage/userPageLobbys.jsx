//react
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//css
import './userPageLobbys.css';

//screen dimensions
import useScreenSize from '../../hooks/dimensions';

//images
import gang from '../../assets/gangA.png';  
import gang2 from '../../assets/gangB.png';  
import Ludek from '../../assets/testowy_ludek.png';

//icons
import { LuArrowBigLeftDash } from "react-icons/lu";
import { LuArrowBigRightDash } from "react-icons/lu";
import { RxThickArrowLeft } from "react-icons/rx";
import { RxThickArrowRight } from "react-icons/rx";

//fucntions
import singleLobby from "../../PageStructureElements/singleLobby/singleLobby"
import { postFetchJWT } from '../../fetches/postFetch';

const UserPageLobbys = () =>{

    const gangImages = [gang, gang2];
    const [curentGangImage, setCGImage] = useState(gang);
    const [firstTime, setFT] = useState(true);
    const [once, setOnce] = useState(false);
    

    //to check screen dimensions
    const { height, width } = useScreenSize();
    const [currentPage, setCurrentPage] = useState(0);
    const [maxPage, setMaxPage] = useState(0);
    const [lobbyList, setLobbyList] = useState(null);

    //variables
    var number = 0;
    var profileDivHeight = 100;

    function toTheRight(){

        let page = currentPage;
        if(page < maxPage){
            page++;
            setCurrentPage(page);
            getLobbys(page);
        }

    }

    function toTheLast()
    {
        setCurrentPage(maxPage);
        let page = maxPage;
        getLobbys(page);
    }

    function toTheFirst()
    {
        setCurrentPage(0);
        let page = 0;
        getLobbys(page);
    }

    function toTheLeft(){
            let page = currentPage;
            if(page > 0){
                page--;
                setCurrentPage(page);
                getLobbys(page);
            }
        }

    const getLobbys = async (page) => {
        let body = { 
            'page':`${page}`,
            'size': '3'};

        let url = '/api/profile/usersLobby';
        let respond = await postFetchJWT(url,body);
        console.log(respond.data);
        setLobbyList(respond.data);
        setMaxPage(respond.data.pages-1);
    }


    //functions
    const addlobbys = () =>
    {
        let content = [];
        let gameName = "";
        let additionalClass = '';
        let lobby_name = '';
        let number_to_dispay = 0;
        let players = 0;
        let required_players =0;
        let index_lobby = 0;
        let ownerAvatar = '';

        if(lobbyList!=null)
            number_to_dispay = lobbyList.Lobby.length;
        let description = '';

        for(let i=0; i<number_to_dispay; i++)
        {  
            index_lobby = lobbyList.Lobby[i].ID_LOBBY;
            lobby_name = lobbyList.Lobby[i].Name;
            required_players = lobbyList.Lobby[i].NeedUsers;
            description = lobbyList.Lobby[i].Description;
            players = lobbyList.Lobby[i].playerCount;
            gameName =  lobbyList.Lobby[i].gameName;
            ownerAvatar = lobbyList.Lobby[i].ownerAvatar;

            content.push(singleLobby(index_lobby, gameName ,ownerAvatar, lobby_name, description, players,required_players, false));
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

    function getLobbyFirsttime()
    {
        if(!once){
            setOnce(true);
            getLobbys(0);
            setCurrentPage(0);
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
                                <td  onClick={toTheFirst}> <div className='arrowLobby'><LuArrowBigLeftDash/></div></td> 
                                <td onClick={toTheLeft}> <div className='arrowLobby'><RxThickArrowLeft /></div></td> 
                                <td> <div className='smallPageNumber'>{currentPage+1}/{maxPage+1}</div></td>  
                                <td onClick={toTheRight}> <div className='arrowLobby'><RxThickArrowRight /></div></td>
                                <td  onClick={toTheLast}> <div className='arrowLobby'><LuArrowBigRightDash/></div></td>
                                    
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='clearer'></div>

            
            </div>
            

            <div className='lobbylist'  onLoad={getLobbyFirsttime()}>
                {addlobbys()}
            </div>

           

        </div>
    );
}

export default UserPageLobbys;