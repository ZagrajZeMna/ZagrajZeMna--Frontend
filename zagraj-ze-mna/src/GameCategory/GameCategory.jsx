// GameCategory.js
import React from 'react';
import { useParams} from 'react-router-dom';
import './GameCategory.css'; //


const GameCategory = () => {
  const { game } = useParams();
  
  // Sample data for demonstration
  const lobbies = [
    {
      id: 1,
      image: 'lobby1.jpg',
      name: 'Granie w konkuter z ziomalami',
      description: 'Zapraszam prawilniakuw',
      players: 10,
      max_players:10
    },
    {
      id: 2,
      image: 'lobby2.jpg',
      name: 'Co ja robie tuuuu',
      description: 'Co ty tutaj robiiiiisz',
      players: 5,
      max_players:10

    },
  ];

  return (
    <div className='background'>
      <span className='available-lobby-text'>DOSTĘPNE LOBBY 🔥</span> <br />
      <h2 className='category-text'>Kategoria: {game}</h2>
      <div className='search-bar'>
        <input type="text" /> <button>klikklik</button>
        <div className="lobby-container">
      </div>
      
        {lobbies.map(lobby => (
          <div key={lobby.id} className="lobby-tile">
            <img src={lobby.image} alt={lobby.name} className="lobby-image" />
            <div className="lobby-details">
              <h3>{lobby.name}</h3>
              <p>{lobby.description}</p>
              
            </div>
            <div className="player-count">
                <button>+</button>

                <span>Players: {lobby.players}/{lobby.max_players}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameCategory;
