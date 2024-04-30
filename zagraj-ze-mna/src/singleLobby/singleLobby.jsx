
/*

ABOUT FUNCTION
- lobby picture - image on the left side of lobby (probably this will be avatar of owner of the lobby)
- lobbyName - name of the lobby display on top of the lobby
- lobbyDesc - description of the lobby display below lobby name
- currentPlayers - number of players in lobby
- requiredPlayers - number of players that lobby can accept
- with Plus - this add button that is used to send request to enter the lobby - this should be false or true

function returs lobby strucute inside of content

TO DO <--- IMPORTANT
add plus button for sending requet to enter the lobby. The place for this is prepared below in span
*/

import { FaUser } from "react-icons/fa";
import './singleLobby.css';

function singleLobby(id, lobbyPicture, lobbyName, lobbyDesc, currentPlayers, requiredPlayers, withPlus)
{
    let content = [];
    
    
    content.push(
        <div key={id} className='lobbyOne'>
            <div className='lobbyPicture flotLeftClassOrSth col-4 col-md-2'>
                <img src={lobbyPicture} alt='obraz przedstawiający lobby' className='img-fluid lobbyPictureImg'/>
            </div>
            <div className='lobbyInfoContainer flotLeftClassOrSth col-6 col-md-9'>
                <div className='lobbyTitle'> {lobbyName} </div>
                <div className='lobbyDescription'> 
                    {lobbyDesc}
                </div>
            </div>
            
            <div className='addedPlayers flotLeftClassOrSth col-2 col-md-1'>
                
                 {currentPlayers}/{requiredPlayers}<FaUser/> </div>
                 {withPlus && (<span >BĘDZIE TU PRZYCISK</span>)/* <==== TUTAJ TRZEBA TEN PRZYCISK DODAĆ*/}
            <div className='clearer'></div>
        </div>
    );

    return content
}

export default singleLobby;
