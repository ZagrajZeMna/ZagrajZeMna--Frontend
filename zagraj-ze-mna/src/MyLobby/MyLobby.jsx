import styles from './MyLobby.module.css'
import React, { useState, useEffect } from 'react';
import singleLobby from '../singleLobby/singleLobby';
import Ludek from '../assets/testowy_ludek.png';
import Footer from '../footer/footer';
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { expandLink } from "../fetches/expandLink";
import LoadingChad from '../LoadingChad/LoadingChad';

function MyLobby() {
    const [error, setError] = useState(null);
    const [lobbies, setLobbies] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({ Lobby: [], pages: 0 });

   const fetchLobbies = async (page = 0) =>{
    try {
            setIsLoading(true);
            const token = localStorage.getItem("token");
            const tokenWithoutQuotes = token.replace(/"/g, '');
            const response = await fetch('https://zagrajzemna-backend.onrender.com/api/profile/usersLobby', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${tokenWithoutQuotes}`
                },
                body: JSON.stringify({
                    page,
                    size: 4  
                }),
            });

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.message || 'Błąd wczytania danych');
            };

            const fetchdata = await response.json();
            setData(fetchdata);
            setLobbies(fetchdata.Lobby);
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

            return singleLobby(index, Ludek /*lobby.ownerAvatar*/, lobby.Name, lobby.Description, lobby.playerCount, lobby.NeedUsers, false); // Ustawienie last argumentu na false, ponieważ nie ma plusa w odpowiedzi
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

    


  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
        {isLoading ? <LoadingChad/> : (error ? (
        <div className={styles.serverDownContainer}>
          <span>Pora dotknąć trawy</span>
          <img src="https://i.ibb.co/0FnRKhw/grass.jpg" />
        </div>) : (
        <div className={styles.lobbies}>
            <h1 className={styles.title}>Moje Lobby</h1>
                
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
