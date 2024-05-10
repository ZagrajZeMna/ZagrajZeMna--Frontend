import React, { useState, useEffect } from 'react';
import { useParams  } from 'react-router-dom';
import './GameCategory.css'; //



const GameCategory = () => {
  const [error, setError] = useState(null);

  const [lobbies, setLobbies] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [size, setSize] = useState('');
  const [maxPages, setMaxPages] = useState(0);
  //using params (from url)
  const { game } = useParams();

  const [name, setName] = useState('');
  const [sorting, setSorting] = useState('');
  const [language, setLanguage] = useState('');
  useEffect(() => {
    fetchLobbies();
  }, [game,currentPage]); // Update lobbies when game or name changes

  const fetchLobbies = () => {
    fetch(`http://localhost:4001/api/lobby/show?page=${currentPage}&size=${5}&game=${game}&name=${name}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Internal Server Error');
        }
        setError(null);
        return res.json();
      })
      .then(data => {
        setLobbies(data.Lobby);
        setMaxPages(data.Pages);
        console.log("obecna strona: "+ currentPage);
        console.log("max strona: " +data.Pages);
      })
      .catch(error => {
        setError(error.message);
      });
  };
  const handleInputChange = event => {
    setName(event.target.value); // Update name state on input change
  };
  const handleSearch = () => {
    // Fetch data with updated name state
    fetchLobbies();
  };
  //sample data
    //{
    //   id: 1,
    //   image: 'lobby1.jpg',
    //   name: 'Granie w konkuter z ziomalami',
    //   description: 'Zapraszam prawilniakuw',
    //   players: 10,
    //   max_players:10
    // },
    // {
    //   id: 2,
    //   image: 'lobby2.jpg',
    //   name: 'Co ja robie tuuuu',
    //   description: 'Co ty tutaj robiiiiisz',
    //   players: 5,
    //   max_players:10

    // },
  return (
    <div className='background2'>
      <h2 className='category-text'>Kategoria: {game}</h2>
      <span className='available-lobby-text'>DOSTĘPNE LOBBY: </span> <br />
      <div className='search-bar'>
          <input type='text' value={name} onChange={handleInputChange}/> 
          <button onClick={handleSearch}>Szukaj</button>
      </div>
      {error ? (
        <div className='error-message'>{console.log(error)}Brak dostępnych lobby 😥</div>
      ) : lobbies.length === 0 ? (
        <div className='error-message'>Brak dostępnych lobby 😥</div>
      ) : ( 
       
          <div className='lobby-container'>
            {lobbies.map(lobby => (
              <div key={lobby.ID_LOBBY} className='lobby-tile'>
                <img src={'https://i.ibb.co/7bs0bb6/chad.png'} alt={lobby.Name} className='lobby-image' />
                <div className='lobby-details'>
                  <h3>{lobby.Name}</h3>
                  <p>{lobby.Description}</p>
                </div>
                <div className='player-count'>
                  <button>Dołącz</button>
                  <span>Players: {lobby.playerCount}/{lobby.NeedUsers}</span>
                </div>
              </div>
            ))}
          </div>
        
      )}
      <div className='lobby-pagination-container'>
              <button onClick={() => { if (currentPage> 0){setCurrentPage(currentPage-1)}; }}>🔙</button>
              <button onClick={() => { if (currentPage+1 < maxPages){setCurrentPage(currentPage+1)}; }}>🔜</button>
              <span>Strona {currentPage+1} z {maxPages}</span>
      </div>
    </div>
  );
};

export default GameCategory;  
