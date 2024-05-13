import React, { useState, useEffect } from 'react';
import { useParams  } from 'react-router-dom';
import './GameCategory.css'; //
import LobbyForm from '../LobbyForm/LobbyForm';
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";


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

  // Function to handle Enter key press
  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='background2'>
      <h2 className='category-text'>Kategoria: {game}</h2>
      <span className='available-lobby-text'>DOSTĘPNE LOBBY: </span> <br />
      <div className='search-bar'>
        <input type='text' value={name} onChange={handleInputChange} onKeyPress={handleKeyPress}/> 
        <button onClick={handleSearch}>Szukaj</button>
      </div>
      <LobbyForm></LobbyForm>
  
      {error ? (
        <div className='error-message'>{console.log(error)}Brak dostępnych lobby 😥</div>
      ) : lobbies.length === 0 ? (
        <div className='error-message'>Brak dostępnych lobby 😥</div>
      ) : ( 
        <div className='lobby-wrapper'>
          <div className='lobby-container'>
            {lobbies.map(lobby => (
              <div key={lobby.ID_LOBBY} className='lobby-tile' onClick={()=>window.alert("WORK IN PROGRESS - LOBBY INTERIOR")} >
                <img src={'https://i.ibb.co/7bs0bb6/chad.png'} alt={lobby.Name} className='lobby-image' />
                <div className='lobby-details'>
                  <h3>{lobby.Name}</h3>
                  <p>{lobby.Description}</p>
                </div>
                <div className='player-count'>
                  <span>Players: {lobby.playerCount}/{lobby.NeedUsers}</span>
                </div>
              </div>
            ))}
          </div>
  
          <div className='lobby-pagination-wrapper'>
            <div className='lobby-pagination-container'>
              <button onClick={() => { if (currentPage > 0){setCurrentPage(currentPage - 1)}; }}><MdNavigateBefore /></button>
              <button onClick={() => { if (currentPage + 1 < maxPages){setCurrentPage(currentPage + 1)}; }}><MdNavigateNext /></button>
              <span>Strona {currentPage + 1} z {maxPages}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
  
  
};

export default GameCategory;  
