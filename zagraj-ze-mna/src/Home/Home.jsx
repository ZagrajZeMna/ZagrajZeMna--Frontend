import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import LoadingChad from '../LoadingChad/LoadingChad';
import "./Home.css";
import Footer from '../footer/footer';
import { expandLink } from '../fetches/expandLink';

function Home(){
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [maxPages, setMaxPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        fetchGames(); //UNCOMMENT THIS IF THERE ARE GAMES WITH PICTURES IN THE DATABASE, OTHERWISE LEAVE COMMENTED
    },[currentPage])
    const fetchGames = () => {
        setIsLoading(true);
        fetch(expandLink(`/api/mainGame/getGamePagination?page=${currentPage}`))
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
          setIsLoading(false);
      };
    
    const handleClick = () => {
        console.log(localStorage.getItem('token'));
        localStorage.removeItem('token');
        console.log(localStorage.getItem('token'));
        navigate('/login');
    };

    
    const [games, setGames] = useState([]
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
            {isLoading ? <LoadingChad></LoadingChad>:<div className="game-tiles-grid">
                    {games.map((game, index) => (
                        <Link to={`/category/${game.name}`} key={index} className="game-tile">
                            <img src={game.image} alt={game.name} />
                            <span className="game-name">{game.name}</span>
                        </Link>
                    ))}
                </div>}      
          
                
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