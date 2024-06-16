import { useState } from 'react';
import './editPageBanner.css';
import './editPageUserGames.css'
import { postFetchJWT } from '../../fetches/postFetch';

//icons
import { LuArrowBigLeftDash } from "react-icons/lu";
import { LuArrowBigRightDash } from "react-icons/lu";
import { RxThickArrowLeft } from "react-icons/rx";
import { RxThickArrowRight } from "react-icons/rx";


const EditPageUserGames = () => {

    const [gameList, setGameList] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [maxPage, setMaxPage] = useState(0)
    const size = 8;
    const [firstTimeSetter, setFTS] = useState(true);

    async function getGames(page)
    {   
        //let page = currentPage;

        let body = {'page': `${page}`,
                    'size': `${size}`};
        
        let respond = await postFetchJWT('/api/profile/usersGames', body, true);
        setGameList(respond);
        //console.log("games: ", respond);
        
        let max = 0;
        if(respond.data == null)
            max = 1;
        else
        {
            max = respond.data.Pages;
        }
        setMaxPage(max);
    }

    function onlyOnceFunction()
    {
        if(firstTimeSetter){
            setFTS(false);
            getGames(0);
        }
    }

    async function deleteGame(id)
    {
        console.log(id);
        let body_s = {
            "ID_GAME": `${id}`
        };
        let url ='/api/profile/removeGameFromShelf';
        let respond = await postFetchJWT(url, body_s, true, false);

        if(!respond.isError){
            getGames(currentPage);
        }
    }

    function createGames()
    {
        let content = [];
        let size = gameList.data.Games.length;
        if(gameList.data == null)
            size = 0;
        let image = '';
        let name = '';
        let id = '';

        for(let i=0; i<size; i++){
            image = gameList.data.Games[i].image;
            name = gameList.data.Games[i].name;
            id = gameList.data.Games[i].ID_GAME;
            content.push(
                <div className='gameListOne toTheLeft col-10 offset-1 col-md-4 offset-md-0 col-lg-3' key={i} >
                    <div className='marginator toTheLeft'>
                    <div className='toTheLeft game_container_bigger'>
                        <div className='image_conteiner_game toTheLeft'>
                            <img src={image} className='img-fluid' alt={name}/>
                        </div>
                        <div className='informations_game toTheLeft'>
                            <p>{name}</p>
                            <button onClick={() => deleteGame(gameList.data.Games[i].ID_GAME)} className='button_remove'>
                                Usuń grę z półki
                            </button>
                        </div>
                    </div>
                    </div>
                    
                </div>
            );
        }
        return content;
    }

    function toTheFirst()
    {
        let page = 0;
        setCurrentPage(0);
        getGames(page);
    }

    function toTheRight()
    {
        let page = currentPage;
        if(page<maxPage-1)
        {   
            page+=1;
            setCurrentPage(page);
            getGames(page);
        }
    }

    function toTheLast()
    {
        let page = maxPage-1;
        setCurrentPage(page);
        getGames(page);
    }

    function toTheLeft()
    {
        let page = currentPage;
        if(page > 0)
        {
            page-=1;
            setCurrentPage(page);
            getGames(page);
        }
    }

    return(
        <div className="editPageGamesContainer" onLoad={onlyOnceFunction()}>
            <div className='gimmeSomeSpacePls'></div>
            {/* Banner */}
            <div className='paddingBanner col-12'>
                <div className='EditPageBanner'>
                    <h1>
                        <span className='colorLetterPurple'>M</span>oje <span className='colorLetterPurple'>G</span>ry
                    </h1>
                </div>
            </div>

            {/* Shelf Display */}
            <div className='pageArrowLobbySecond'>
                <table className='tableWithLobbyArrowsSecond'>
                    <tbody>
                        <tr>
                            <td  onClick={toTheFirst}> <div className='arrowLobby'><LuArrowBigLeftDash/></div></td> 
                            <td onClick={toTheLeft}> <div className='arrowLobby'><RxThickArrowLeft /></div></td> 
                            <td> <div className='smallPageNumber'>{currentPage+1}/{maxPage}</div></td>  
                            <td onClick={toTheRight}> <div className='arrowLobby'><RxThickArrowRight /></div></td>
                            <td  onClick={toTheLast}> <div className='arrowLobby'><LuArrowBigRightDash/></div></td>        
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='clearer'></div>
            <div className='with_space'>
                {gameList && gameList.data && (<span>{createGames()}</span>)}
                {gameList && (gameList.data == null) && (<p key={-2000} className='noGamesHlip'> Hmmm... 🤔. Wygląda na to, że półka jest pusta. Gry możesz dodać na stronie głównej, wystarczy wejść w daną grę i nacisnąć przycisk dodaj. 😎</p>)}
            </div>

            <div className='clearer'></div>
            
            

        </div>

       
    );
}

export default EditPageUserGames;