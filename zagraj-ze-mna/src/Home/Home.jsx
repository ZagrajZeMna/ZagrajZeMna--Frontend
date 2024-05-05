import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./Home.css";

function Home(){

    const navigate = useNavigate();

    const handleClick = () => {
        console.log(localStorage.getItem('token'));
        localStorage.removeItem('token');
        console.log(localStorage.getItem('token'));
        navigate('/login');
    };

    const [images, setImages] = useState([
   
    { name: 'Among us', image: 'https://via.placeholder.com/150' },
    { name: 'Counter Strike', image: 'https://via.placeholder.com/150' },
    { name: 'League of legends', image: 'https://via.placeholder.com/150' },
    { name: 'Minecraft', image: 'https://via.placeholder.com/150' },
    { name: 'Lethal Company', image: 'https://via.placeholder.com/150' },
    { name: 'Game 1', image: 'https://via.placeholder.com/150' },
    { name: 'Game 2', image: 'https://via.placeholder.com/150' },
    { name: 'Fortinajti', image: 'https://via.placeholder.com/150' },
    { name: 'Lebabagi', image: 'https://via.placeholder.com/150' },
    { name: 'Apex Legends', image: 'https://via.placeholder.com/150' },
    { name: 'DnD', image: 'https://via.placeholder.com/150' },
    { name: 'Game 3', image: 'https://via.placeholder.com/150' },
    { name: 'Game 1', image: 'https://via.placeholder.com/150' },
    { name: 'Game 2', image: 'https://via.placeholder.com/150' },
    { name: 'Game 3', image: 'https://via.placeholder.com/150' },
    { name: 'Among us', image: 'https://via.placeholder.com/150' },
    { name: 'Counter Strike', image: 'https://via.placeholder.com/150' },
    { name: 'League of legends', image: 'https://via.placeholder.com/150' },
    { name: 'Minecraft', image: 'https://via.placeholder.com/150' },
    { name: 'Lethal Company', image: 'https://via.placeholder.com/150' },
    { name: 'Game 1', image: 'https://via.placeholder.com/150' },
    { name: 'Game 2', image: 'https://via.placeholder.com/150' },
    { name: 'Fortinajti', image: 'https://via.placeholder.com/150' },
    { name: 'Lebabagi', image: 'https://via.placeholder.com/150' },
    { name: 'Apex Legends', image: 'https://via.placeholder.com/150' },
    { name: 'DnD', image: 'https://via.placeholder.com/150' },
    { name: 'Game 3', image: 'https://via.placeholder.com/150' },
    { name: 'Game 1', image: 'https://via.placeholder.com/150' },
    { name: 'Game 2', image: 'https://via.placeholder.com/150' },]
    );
      

    return(
        <div className='background'>
            <span className='tempheader'>TUTAJ WSTAWIC HEADER</span> {/*nie wstawiac tu headera xd powinien byc nad divem background, ten jest tylko zeby nie bylo pusto*/}
            <button onClick={handleClick} className='logout'>logout</button>
            
            <div className='game-tiles-container'>
            <span className='caption'>Giereczki</span>
                <div className="game-tiles-grid">
                    {images.map((game, index) => (
                        <Link to={`/category/${game.name}`} key={index} className="game-tile">
                            <img src={game.image} alt={game.name} />
                            <span className="game-name">{game.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
            
        </div>
    );
}

export default Home