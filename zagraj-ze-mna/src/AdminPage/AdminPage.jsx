import React, { useEffect, useState } from 'react';
import './AdminPage.css';
import PlayerCard from './PlayerCard';
import Modal from './Modal';

const AdminPage = () => {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [newGame, setNewGame] = useState({ name: '', shortname: '', description: '', image: '' });
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('Proszę się zalogować');
          setIsLoggedIn(false); 
          return;
        }

        setIsLoggedIn(true);
        
        const tokenWithoutQuotes = token.replace(/"/g, '');
        let endpoint;
        if (activeTab === 'all') {
          endpoint = 'getUser';
        } else if (activeTab === 'notBanned') {
          endpoint = 'getNotBannedUser';
        } else if (activeTab === 'banned') {
          endpoint = 'getBannedUser';
        } else if (activeTab === 'addNewGame') {
          setPlayers([]);
          return;
        }

        const response = await fetch(`http://localhost:4001/api/admin/${endpoint}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${tokenWithoutQuotes}`
          }
        });

        if (!response.ok) {
          throw new Error('Nie można pobrać danych');
        }

        const data = await response.json();
        setPlayers(data);
        setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
        setError(null);
      } catch (error) {
        setError(error.message);
        setPlayers([]);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleBanUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4001/api/admin/banUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.replace(/"/g, '')}`
        },
        body: JSON.stringify({ id })
      });

      if (!response.ok) {
        throw new Error('Nie udało się zbanować użytkownika');
      }

      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.ID_USER === id ? { ...player, isBanned: true } : player
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUnbanUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4001/api/admin/unbanUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.replace(/"/g, '')}`
        },
        body: JSON.stringify({ id })
      });

      if (!response.ok) {
        throw new Error('Nie udało się odbanować użytkownika');
      }

      setPlayers((prevPlayers) => prevPlayers.map((player) =>
        player.ID_USER === id ? { ...player, isBanned: false } : player
      )
    );
  } catch (error) {
    setError(error.message);
  }
};

const handleTabClick = (tab) => {
  setActiveTab(tab);
  setCurrentPage(1);
};

const handlePageChange = (change) => {
  const newPage = currentPage + change;
  if (newPage < 1) {
    setCurrentPage(1);
  } else if (newPage > totalPages) {
    setCurrentPage(totalPages);
  } else {
    setCurrentPage(newPage);
  }
};

const handleJumpToPage = (page) => {
  if (page < 1) {
    setCurrentPage(1);
  } else if (page > totalPages) {
    setCurrentPage(totalPages);
  } else {
    setCurrentPage(page);
  }
};

const paginatedPlayers = players.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE
);

const handlePlayerClick = (player) => {
  setSelectedPlayer(player);
};

const closeModal = () => {
  setSelectedPlayer(null);
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setNewGame((prevGame) => ({
    ...prevGame,
    [name]: value
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!newGame.name || !newGame.shortname || !newGame.description || !newGame.image) {
    setError('Wszystkie pola są wymagane. Proszę wypełnić wszystkie pola.');
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:4001/api/admin/addNewGame', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.replace(/"/g, '')}`
      },
      body: JSON.stringify(newGame)
    });

    if (!response.ok) {
      throw new Error('Nie udało się dodać nowej gry');
    }

    const data = await response.json();
    setSuccessMessage('Gra została pomyślnie dodana!'); 
    setNewGame({ name: '', shortname: '', description: '', image: '' });
    setError(null); 
  } catch (error) {
    setError(error.message);
  }
};

return (
  <div className="admin-page">
    <div className="sidebar">
      <div className="tabs">
        <div>
          <h1 className="main-title"> Użytkownicy </h1>
        </div>
        <button
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => handleTabClick('all')}
        >
          Wszyscy
        </button>
        <button
          className={`tab ${activeTab === 'notBanned' ? 'active' : ''}`}
          onClick={() => handleTabClick('notBanned')}
        >
          Nie zbanowani
        </button>
        <button
          className={`tab ${activeTab === 'banned' ? 'active' : ''}`}
          onClick={() => handleTabClick('banned')}
        >
          Zbanowani
        </button>
      </div>
      <div>
        <h1 className="main-title margin-top"> Gry </h1>
        <button
          className={`tab ${activeTab === 'addNewGame' ? 'active' : ''}`}
          onClick={() => handleTabClick('addNewGame')}
        >
          Dodaj grę
        </button>
      </div>
    </div>
    <div className="main-content">
      {activeTab === 'addNewGame' && isLoggedIn && (
        <form onSubmit={handleSubmit} className="add-game-form">
          <div>
            <label>Nazwa gry:</label>
            <input
              type="text"
              name="name"
              value={newGame.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Skrócona nazwa:</label>
            <input
              type="text"
              name="shortname"
              value={newGame.shortname}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Opis:</label>
            <textarea
              name="description"
              value={newGame.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Obraz URL:</label>
            <input
              type="text"
              name="image"
              value={newGame.image}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Dodaj grę</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      )}
      {activeTab !== 'addNewGame' && (
        <div className="players-container">
          {paginatedPlayers.length === 0 && !error ? (
            <p className="no-users-message">Brak użytkowników do wyświetlenia.</p>
          ) : (
            paginatedPlayers.map((player) => (
              <PlayerCard
                key={player.ID_USER}
                player={player}
                onBan={handleBanUser}
                onUnban={handleUnbanUser}
                onClick={handlePlayerClick}
              />
            ))
          )}
        </div>
      )}
      {paginatedPlayers.length > 0 && (
        <div className="pagination">
          <button onClick={() => handleJumpToPage(1)}>Pierwsza</button>
          <button onClick={() => handlePageChange(-10)}>-10</button>
          <button onClick={() => handlePageChange(-1)}>Poprzednia</button>
          <span className="page-counter">{currentPage} / {totalPages}</span>
          <button onClick={() => handlePageChange(1)}>Następna</button>
          <button onClick={() => handlePageChange(10)}>+10</button>
          <button onClick={() => handleJumpToPage(totalPages)}>Ostatnia</button>
        </div>
      )}
    </div>
    {selectedPlayer && <Modal show={true} onClose={closeModal} user={selectedPlayer} />}
    {successMessage && (
      <div className="success-modal">
        <div className="success-modal-content">
          <p>{successMessage}</p>
          <button onClick={() => setSuccessMessage(null)}>OK</button>
        </div>
      </div>
    )}
  </div>
);
};

export default AdminPage;
