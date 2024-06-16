
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
import { FaJoint } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

//CSS
import './singleLobby.css';

function singleLobby(id, gameName ,lobbyPicture, lobbyName, lobbyDesc, currentPlayers, requiredPlayers, withPlus)
{
    let content = [];
    
    
    content.push(
        <Link to={`/category/${gameName}/${lobbyName}/${id}`} key={id}>
        <div className='lobbyOne'>
            <div className='lobbyPicture flotLeftClassOrSth col-4 col-md-2'>
                <img src={lobbyPicture} alt='obraz przedstawiający lobby' className='img-fluid lobbyPictureImg'/>
            </div>
            <div className='lobbyInfoContainer flotLeftClassOrSth col-6 col-md-9'>
                {/*<div className='gameName'> {gameName}</div>*/}
                <div className='lobbyTitle'> {lobbyName} - {gameName} </div>
                <div className='lobbyDescription'> 
                    {lobbyDesc}
                </div>
            </div>
            
            <div className='addedPlayers flotLeftClassOrSth col-2 col-md-1'>
                
            
                 {withPlus && (<span className="player-button" >
                    <button >
                        <FaCirclePlus />
                    </button>
                    </span>)}
                    <span className="player-button">
                        {currentPlayers}/{requiredPlayers}<FaUser />
                    </span>
                     </div>
            <div className='clearer'></div>
            
        </div>
        </Link>
    );

    return content
}

export default singleLobby;
