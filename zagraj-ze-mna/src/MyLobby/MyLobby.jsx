import styles from './MyLobby.module.css'
import React, { useState, useEffect } from 'react';
import singleLobby from '../PageStructureElements/singleLobby/singleLobby';
import Ludek from '../assets/testowy_ludek.png';
import Footer from '../PageStructureElements/footer/footer';
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { expandLink } from "../fetches/expandLink";
import LoadingChad from '../LoadingChad/LoadingChad';
import useGetToken from '../fetches/useFetch';

function MyLobby() {
    const [error, setError] = useState(null);
    const [lobbies, setLobbies] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({ Lobby: [], pages: 0 });
    const lastLobbies = useGetToken('/api/profile/lastLobbies');


   const fetchLobbies = async (page = 0) =>{
    try {
            setIsLoading(true);
            const token = localStorage.getItem("token");
            const tokenWithoutQuotes = token.replace(/"/g, '');
            let url = expandLink('/api/profile/usersLobby');
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${tokenWithoutQuotes}`
                },
                body: JSON.stringify({
                    page,
                    size: 5  
                }),
            });

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.message || 'Błąd wczytania danych');
            };

            const fetchdata = await response.json();
            setData(fetchdata);
            setLobbies(fetchdata);
            setTotalPages( fetchdata.pages);
            setCurrentPage(page);
            
            
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
  };

  useEffect(() => {
    fetchLobbies();
}, []);

    const renderLobbies = () => {
        if (!data.Lobby.length) return null;
        return data.Lobby.map((lobby, index) => {
            return singleLobby(lobby.ID_LOBBY, lobby.gameName, lobby.ownerAvatar, lobby.Name, lobby.Description, lobby.playerCount, lobby.NeedUsers, true); // Ustawienie last argumentu na false, ponieważ nie ma plusa w odpowiedzi
        });
    };

    const handleNextPage = () => {
        if(currentPage<totalPages-1){
            fetchLobbies(currentPage +1)
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            fetchLobbies(currentPage - 1);
        }
    };

    function renderLastLobies(){
        
        let size = lastLobbies.data.Lobby.length;
        console.log(lastLobbies);
        let content = [];
        for(let i=0; i<size; i++){
            let oneLobby = lastLobbies.data.Lobby[i];
            let push_data = singleLobby(oneLobby.ID_LOBBY, oneLobby.game_name, oneLobby.ownerAvatar, oneLobby.Name, oneLobby.Description, oneLobby.playerCount, oneLobby.NeedUsers, true );
            content.push(
                push_data
            );
        }
        
        if(size == 0){
            content.push(
                <p className={styles.ZeroLobbies} key={-1202}>
                  Wygląda na to, że nie wysłało żadnej wiadomóoci w Twoich lobby 🤔. Chcesz z kimś pogadać? Wejdź do lobby i wysyłaj wiadomości!
                </p>
            );
        }

        return content;
    }
    


  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
        {isLoading ? <LoadingChad/> : (error ? (
        <div className={styles.serverDownContainer}>
          <span>Pora dotknąć trawy</span>
          <img src="https://i.ibb.co/0FnRKhw/grass.jpg" />
        </div>) : (
        <div className={styles.lobbies}>
            
            <h1 className={styles.title}>Moje Drużyny</h1>
            <div className={styles.myLobbies}>
                <h2 className={styles.lobbySmallTitle}>Ostatnio aktywne: </h2>
            </div>
           {lastLobbies.data && (<span>{renderLastLobies()}</span>) }
            
            
           <div className={styles.GimmeSomeSpacePls}></div>

            <div className={styles.myLobbies}>
                <h2 className={styles.lobbySmallTitle}>Wszystkie: </h2>
            </div>

            
            
            {renderLobbies()}
            <div className={styles.paginationContainer}>

                <MdNavigateBefore className={styles.icon} onClick={handlePreviousPage}/>

                <div className={styles.numberOfPages}>
                            {currentPage + 1}/{totalPages}
                </div>

                <MdNavigateNext className={styles.icon} onClick={handleNextPage}/>
                    
            </div>
        </div>
        )) }
       </div>
        <Footer/>
    </div>
  );
}

export default MyLobby;
