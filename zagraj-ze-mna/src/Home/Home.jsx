import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import "./Home.css";
import Footer from '../footer/footer';

function Home(){
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [maxPages, setMaxPages] = useState(0);
    const navigate = useNavigate();
    useEffect(()=>{
        fetchGames(); //UNCOMMENT THIS IF THERE ARE GAMES WITH PICTURES IN THE DATABASE, OTHERWISE LEAVE COMMENTED
    },[currentPage])
    const fetchGames = () => {
        fetch(`http://localhost:4001/api/mainGame/getGamePagination?page=${currentPage}`)
          .then(res => {
            if (!res.ok) {
              throw new Error('Internal Server Error');
            }
            setError(null);
            return res.json();
          })
          .then(data => {
            setGames(data.Game);
            setMaxPages(data.Pages);

            console.log(data);
            
          })
          .catch(error => {
            setError(error.message);
          });
      };
    
    const handleClick = () => {
        console.log(localStorage.getItem('token'));
        localStorage.removeItem('token');
        console.log(localStorage.getItem('token'));
        navigate('/login');
    };

    
    const [games, setGames] = useState([
    
    { name: 'VALORANT', image: 'https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg' },
    { name: 'Counter Strike', image: 'https://static-cdn.jtvnw.net/ttv-boxart/32399-285x380.jpg' },
    { name: 'League of Legends', image: 'https://static-cdn.jtvnw.net/ttv-boxart/21779-285x380.jpg' },
    { name: 'Minecraft', image: 'https://static-cdn.jtvnw.net/ttv-boxart/27471_IGDB-285x380.jpg' },
    { name: 'Lethal Company', image: 'https://static-cdn.jtvnw.net/ttv-boxart/2085980140_IGDB-285x380.jpg' },
    { name: 'League of Legends', image: 'https://static-cdn.jtvnw.net/ttv-boxart/21779-285x380.jpg' },
    { name: 'GTA 5', image: 'https://static-cdn.jtvnw.net/ttv-boxart/32982_IGDB-285x380.jpg' },
    { name: 'Fortnite', image: 'https://static-cdn.jtvnw.net/ttv-boxart/33214-285x380.jpg' },
    { name: 'World of Tanks', image: 'https://static-cdn.jtvnw.net/ttv-boxart/27546-285x380.jpg' },
    { name: 'Apex Legends', image: 'https://static-cdn.jtvnw.net/ttv-boxart/511224-285x380.jpg' },
    { name: 'DnD', image: 'https://static-cdn.jtvnw.net/ttv-boxart/512923_IGDB-285x380.jpg' },
    { name: 'VALORANT', image: 'https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg' },
    { name: 'Among us', image: 'https://static-cdn.jtvnw.net/ttv-boxart/510218_IGDB-285x380.jpg' },
    { name: 'Minecraft', image: 'https://static-cdn.jtvnw.net/ttv-boxart/27471_IGDB-285x380.jpg' },
    { name: 'VALORANT', image: 'https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg' },
    { name: 'Among us', image: 'https://static-cdn.jtvnw.net/ttv-boxart/510218_IGDB-285x380.jpg' },
    { name: 'Counter Strike', image: 'https://static-cdn.jtvnw.net/ttv-boxart/32399-285x380.jpg' },
    { name: 'League of Legends', image: 'https://static-cdn.jtvnw.net/ttv-boxart/21779-285x380.jpg' },
    { name: 'Minecraft', image: 'https://static-cdn.jtvnw.net/ttv-boxart/27471_IGDB-285x380.jpg' },
    { name: 'Lethal Company', image: 'https://static-cdn.jtvnw.net/ttv-boxart/2085980140_IGDB-285x380.jpg' },
    { name: 'Counter Strike', image: 'https://static-cdn.jtvnw.net/ttv-boxart/32399-285x380.jpg' },
    { name: 'Battlefield 1', image: 'https://static-cdn.jtvnw.net/ttv-boxart/488500_IGDB-285x380.jpg' },
    { name: 'Fortnite', image: 'https://static-cdn.jtvnw.net/ttv-boxart/33214-285x380.jpg' },
    { name: 'World of Tanks', image: 'https://static-cdn.jtvnw.net/ttv-boxart/27546-285x380.jpg' },
    { name: 'Apex Legends', image: 'https://static-cdn.jtvnw.net/ttv-boxart/511224-285x380.jpg' },
    { name: 'DnD', image: 'https://static-cdn.jtvnw.net/ttv-boxart/512923_IGDB-285x380.jpg' },
    { name: 'Game 3', image: 'https://via.placeholder.com/285x380' },
    { name: 'Game 1', image: 'https://via.placeholder.com/285x380' },
    { name: 'Game 2', image: 'https://via.placeholder.com/285x380' },]
    );
      

    return(
        <div className='background'>
           
            
            <div className='game-tiles-container'>
            <span className='caption'>Giereczki</span>
            <div className='category-button-container'>
            <button className="category-button" >
                    <span className='category-button-text'>Gry komputerowe</span>
            </button>
            <button className="category-button" >
                    <span className='category-button-text'>Gry planszowe</span>
            </button>
            <button className="category-button" >
                    <span className='category-button-text'>Inne</span>
            </button>
            
            </div>
            <div className='sorting-buttons'>
                <button className='sorting-button'>Kategorie</button>
            </div>                
                <div className="game-tiles-grid">
                    {games.map((game, index) => (
                        <Link to={`/category/${game.name}`} key={index} className="game-tile">
                            <img src={game.image} alt={game.name} />
                            <span className="game-name">{game.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
            <div className='lobby-pagination-wrapper'>
            <div className='lobby-pagination-container'>
              <button onClick={() => { if (currentPage > 0){setCurrentPage(currentPage - 1)}; }}><MdNavigateBefore /></button>
              <button onClick={() => { if (currentPage + 1 < maxPages){setCurrentPage(currentPage + 1)}; }}><MdNavigateNext /></button>
              <span>Strona {currentPage + 1} z {maxPages}</span>
            </div>
          </div>
            
            <Footer></Footer>
        </div>
        
    );
}

export default Home