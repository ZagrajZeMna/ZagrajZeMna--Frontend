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
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('Please log in');
          return;
        }
        
        const tokenWithoutQuotes = token.replace(/"/g, '');
        let endpoint;
        if (activeTab === 'all') {
          endpoint = 'getUser';
        } else if (activeTab === 'notBanned') {
          endpoint = 'getNotBannedUser';
        } else if (activeTab === 'banned') {
          endpoint = 'getBannedUser';
        }

        const response = await fetch(`http://localhost:4001/api/admin/${endpoint}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${tokenWithoutQuotes}`
          }
        });

        if (!response.ok) {
          throw new Error('Cannot reach your data');
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
        throw new Error('Failed to ban user');
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
        throw new Error('Failed to unban user');
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

return (
  <div className="admin-page">
    <div className="sidebar">
      <div className="tabs">
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
    </div>
    <div className="main-content">
      {error && <p className="error">{error}</p>}
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
  </div>
);
};

export default AdminPage;