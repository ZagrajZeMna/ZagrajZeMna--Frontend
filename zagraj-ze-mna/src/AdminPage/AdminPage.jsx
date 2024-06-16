import React, { useEffect, useState } from 'react';
import './AdminPage.css';
import PlayerCard from './PlayerCard';
import Modal from './Modal';
import { LuArrowBigLeftDash, LuArrowBigRightDash } from "react-icons/lu";
import { RxThickArrowLeft, RxThickArrowRight, RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { AiOutlineMenu } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { expandLink } from '../fetches/expandLink';

const AdminPage = () => {
  // Tablice przechowujące dane użytkowników, raportów i propozycji gier
  const [players, setPlayers] = useState([]);
  const [reports, setReports] = useState([]);
  const [gameProposals, setGameProposals] = useState([]);
  const [error, setError] = useState(null); // Przechowuje informacje o błędach
  const [activeTab, setActiveTab] = useState('all'); // Przechowuje informacje o aktywnej zakładce
  const [currentPage, setCurrentPage] = useState(1); // Przechowuje numer bieżącej strony
  const [totalPages, setTotalPages] = useState(1); // Przechowuje liczbę stron
  const [reportPage, setReportPage] = useState(1); // Przechowuje numer bieżącej strony raportów
  const [totalReportPages, setTotalReportPages] = useState(1);  // Przechowuje liczbę stron raportów
  const [gamePage, setGamePage] = useState(1); // Przechowuje numer bieżącej strony propozycji gier
  const [totalGamePages, setTotalGamePages] = useState(1); // Przechowuje liczbę stron propozycji gier
  const [selectedPlayer, setSelectedPlayer] = useState(null); // Przechowuje wybranego użytkownika
  const [newGame, setNewGame] = useState({ name: '', shortname: '', description: '', image: '' }); // Przechowuje dane nowej gry
  const [successMessage, setSuccessMessage] = useState(null); // Przechowuje wiadomość sukcesu
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Przechowuje informacje o zalogowaniu
  const [sidebarVisible, setSidebarVisible] = useState(true); // Przechowuje stan widoczności paska bocznego
  const ITEMS_PER_PAGE = 10; // Stała przechowująca liczbę elementów na stronę

  // Funkcja przełączająca widoczność paska bocznego
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Funkcja fetch pobierająca dane użytkowników
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
      let isBanned;
      if (activeTab === 'all') {
        isBanned = '';
      } else if (activeTab === 'notBanned') {
        isBanned = 'false';
      } else if (activeTab === 'banned') {
        isBanned = 'true';
      } else if (activeTab === 'addNewGame') {
        setPlayers([]);
        return;
      }

      const response = await fetch(expandLink(`/api/admin/getUser?page=${currentPage-1}&size=${ITEMS_PER_PAGE}&isBanned=${isBanned}`), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokenWithoutQuotes}`
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          setPlayers([]);
          setTotalPages(1);
          setError(null);
        } else {
          throw new Error('Nie można pobrać danych');
        }
      } else {
        const data = await response.json();
        setPlayers(data.users);
        setTotalPages(data.totalPages);
        setError(null);
      }
    } catch (error) {
      setError(error.message);
      setPlayers([]);
    }
  };

  // Funkcja fetch pobierająca raporty użytkowników
  const fetchReports = async (page, size) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Proszę się zalogować');
        setIsLoggedIn(false);
        return;
      }

      setIsLoggedIn(true);
      const tokenWithoutQuotes = token.replace(/"/g, '');

      const response = await fetch(expandLink(`/api/review/getReportUser?page=${page}&size=${size}`), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokenWithoutQuotes}`
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          setReports([]);
          setTotalReportPages(1);
          setError(null);
        } else {
          throw new Error('Nie można pobrać raportów');
        }
      } else {
        const data = await response.json();
        setReports(data.User);
        setTotalReportPages(data.Pages);
        setError(null);
      }
    } catch (error) {
      setError(error.message);
      setReports([]);
    }
  };

  // Funkcja fetch pobierająca propozycje gier
  const fetchGameProposals = async (page, size) => {
    try {
      const response = await fetch(expandLink(`/api/review/getRequestGame?page=${page}&size=${size}`));
      if (!response.ok) {
        if (response.status === 404) {
          setGameProposals([]);
          setTotalGamePages(1);
          setError(null);
        } else {
          throw new Error('Nie można pobrać propozycji gier');
        }
      } else {
        const data = await response.json();
        setGameProposals(data.game || []);
        setTotalGamePages(data.Pages);
        setError(null);
      }
    } catch (error) {
      setError(error.message);
      setGameProposals([]);
    }
  };

  // Funkcja usuwająca raport
  const deleteReport = async (reportId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(expandLink('/api/review/deleteReport'), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.replace(/"/g, '')}`
        },
        body: JSON.stringify({ report_id: reportId })
      });

      if (!response.ok) {
        throw new Error('Nie udało się usunąć raportu');
      }

      setReports((prevReports) => prevReports.filter(report => report.id !== reportId));

      // Sprawdzenie, czy bieżąca strona nie ma już elementów po usunięciu
      if (reports.length - 1 === 0 && reportPage > 1) {
        setReportPage(reportPage - 1);
      } else {
        fetchReports(reportPage - 1, ITEMS_PER_PAGE);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Funkcja usuwająca propozycję gry
  const deleteGameProposal = async (proposalId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(expandLink('/api/review/deleteGameReq'), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.replace(/"/g, '')}`
        },
        body: JSON.stringify({ request_id: proposalId })
      });

      if (!response.ok) {
        throw new Error('Nie udało się usunąć propozycji gry');
      }

      setGameProposals((prevProposals) => prevProposals.filter(proposal => proposal.id !== proposalId));

      // Sprawdzenie, czy bieżąca strona nie ma już elementów po usunięciu
      if (gameProposals.length - 1 === 0 && gamePage > 1) {
        setGamePage(gamePage - 1);
      } else {
        fetchGameProposals(gamePage - 1, ITEMS_PER_PAGE);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Efekt, który pobiera dane w zależności od aktywnej zakładki
  useEffect(() => {
    if (activeTab === 'reports') {
      fetchReports(reportPage - 1, ITEMS_PER_PAGE);
    } else if (activeTab === 'gameProposals') {
      fetchGameProposals(gamePage - 1, ITEMS_PER_PAGE);
    } else {
      fetchData();
    }
  }, [activeTab, currentPage, reportPage, gamePage]);

  // Efekt obsługujący zmianę rozmiaru okna
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 795) {
        setSidebarVisible(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

   // Funkcja banująca użytkownika
  const handleBanUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(expandLink('/api/admin/banUser'), {
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

  // Funkcja odbanowująca użytkownika
  const handleUnbanUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(expandLink('/api/admin/unbanUser'), {
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

      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.ID_USER === id ? { ...player, isBanned: false } : player
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  // Funkcja obsługująca kliknięcie zakładki
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setReportPage(1);
    setGamePage(1);
  };

  // Funkcja zmieniająca stronę użytkowników
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

  // Funkcja zmieniająca stronę raportów
  const handleReportPageChange = (change) => {
    const newPage = reportPage + change;
    if (newPage < 1) {
      setReportPage(1);
    } else if (newPage > totalReportPages) {
      setReportPage(totalReportPages);
    } else {
      setReportPage(newPage);
    }
  };

  // Funkcja zmieniająca stronę propozycji gier
  const handleGamePageChange = (change) => {
    const newPage = gamePage + change;
    if (newPage < 1) {
      setGamePage(1);
    } else if (newPage > totalGamePages) {
      setGamePage(totalGamePages);
    } else {
      setGamePage(newPage);
    }
  };

  // Funkcja przeskakująca do danej strony użytkowników
  const handleJumpToPage = (page) => {
    if (page < 1) {
      setCurrentPage(1);
    } else if (page > totalPages) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(page);
    }
  };

  // Funkcja przeskakująca do danej strony raportów
  const handleJumpToReportPage = (page) => {
    if (page < 1) {
      setReportPage(1);
    } else if (page > totalReportPages) {
      setReportPage(totalReportPages);
    } else {
      setReportPage(page);
    }
  };

  // Funkcja przeskakująca do danej strony propozycji gier
  const handleJumpToGamePage = (page) => {
    if (page < 1) {
      setGamePage(1);
    } else if (page > totalGamePages) {
      setGamePage(totalGamePages);
    } else {
      setGamePage(page);
    }
  };

  // Funkcja obsługująca kliknięcie użytkownika
  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  // Funkcja zamykająca modal
  const closeModal = () => {
    setSelectedPlayer(null);
  };

  // Funkcja obsługująca pobranie wartości z formularza dodawania gier
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGame((prevGame) => ({
      ...prevGame,
      [name]: value
    }));
  };

  // Funkcja obsługująca przesłanie formularza dodawania gry
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newGame.name || !newGame.shortname || !newGame.description || !newGame.image) {
      setError('Wszystkie pola są wymagane. Proszę wypełnić wszystkie pola.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(expandLink('/api/admin/addNewGame'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.replace(/"/g, '')}`
        },
        body: JSON.stringify(newGame)
      });

      if (response.status === 400) {
        setError('Gra o podanej nazwie już istnieje w bazie danych.');
    } else if (!response.ok) {
        throw new Error('Nie udało się dodać nowej gry');
    } else {
        const data = await response.json();
        setSuccessMessage('Gra została pomyślnie dodana!');
        setNewGame({ name: '', shortname: '', description: '', image: '' });
        setError(null);
    }
} catch (error) {
    setError(error.message);
}
  };

  return (
    <div className="admin-page">
      <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
        <AiOutlineMenu />
      </button>
      <div className={`sidebar ${sidebarVisible ? '' : 'hidden'}`}>
        <div className="tabs">
          <div>
            <h1 className="main-title">Użytkownicy</h1>
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
          <button
            className={`tab ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => handleTabClick('reports')}
          >
            Przeglądanie reportów
          </button>
        </div>
        <div>
          <h1 className="main-title margin-top">Gry</h1>
          <button
            className={`tab ${activeTab === 'addNewGame' ? 'active' : ''}`}
            onClick={() => handleTabClick('addNewGame')}
          >
            Dodaj grę
          </button>
          <button
            className={`tab ${activeTab === 'gameProposals' ? 'active' : ''}`}
            onClick={() => handleTabClick('gameProposals')}
          >
            Propozycje gier
          </button>
        </div>
      </div>
      <div className={`main-content ${sidebarVisible ? '' : 'sidebar-hidden'}`}>
        {activeTab === 'addNewGame' && isLoggedIn && (
          <form onSubmit={handleSubmit} className="add-game-form">
            <div style={{ marginBottom: '20px' }}>
              <label>Nazwa gry:</label>
              <input
                type="text"
                name="name"
                value={newGame.name}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label>Skrócona nazwa:</label>
              <input
                type="text"
                name="shortname"
                value={newGame.shortname}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
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
            {error && <p className="error-messageee">{error}</p>}
          </form>
        )}
        {activeTab === 'reports' && (
          <div className="reports-container">
            {reports.length === 0 && !error ? (
              <p className="no-reports-message">Brak raportów do wyświetlenia.</p>
            ) : (
              reports.map((report, index) => (
                <div key={index} className="report-card no-hover-effect">
                  <div className="report-top">
                    <div>
                      <p><strong>Nadawca:</strong> {report.sender}</p>
                      <p><strong>Zgłoszony:</strong> {report.reported}</p>
                    </div>
                    <button className="delete-report-btn" onClick={() => deleteReport(report.id)}>
                      <FaTimes />
                    </button>
                  </div>
                  <div className="report-description">
                    <p><strong>Opis:</strong> {report.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        {activeTab === 'gameProposals' && (
          <div className="reports-container">
            {Array.isArray(gameProposals) && gameProposals.length === 0 && !error ? (
              <p className="no-reports-message">Brak propozycji gier do wyświetlenia.</p>
            ) : (
              Array.isArray(gameProposals) && gameProposals.map((proposal, index) => (
                <div key={index} className="report-card no-hover-effect">
                  <div className="report-top">
                    <div>
                      <p><strong>Użytkownik:</strong> {proposal.user}</p>
                      <p><strong>Nazwa gry:</strong> {proposal.name}</p>
                    </div>
                    <button className="delete-report-btn" onClick={() => deleteGameProposal(proposal.id)}>
                      <FaTimes />
                    </button>
                  </div>
                  <div className="report-description">
                    <p><strong>Opis:</strong> {proposal.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        {activeTab !== 'addNewGame' && activeTab !== 'reports' && activeTab !== 'gameProposals' && (
          <div className="players-container">
            {players.length === 0 && !error ? (
              <p className="no-users-message">Brak użytkowników do wyświetlenia.</p>
            ) : (
              players.map((player) => (
                <PlayerCard
                  key={player.ID_USER}
                  player={player}
                  onBan={handleBanUser}
                  onUnban={handleUnbanUser}
                  onClick={handlePlayerClick}
                >
                  <button className="ban-button" onClick={() => handleBanUser(player.ID_USER)}>Ban</button>
                  <button className="unban-button" onClick={() => handleUnbanUser(player.ID_USER)}>Unban</button>
                </PlayerCard>
              ))
            )}
          </div>
        )}
        {(activeTab === 'all' || activeTab === 'notBanned' || activeTab === 'banned') && players.length > 0 && (
          <div className="pagination">
            <div onClick={() => handleJumpToPage(1)} className='arrowButtonTetris'><RxDoubleArrowLeft /></div>
            <div onClick={() => handlePageChange(-5)} className='arrowButtonTetris'><LuArrowBigLeftDash /></div>
            <div onClick={() => handlePageChange(-1)} className='arrowButtonTetris'><RxThickArrowLeft /></div>
            <span className="page-counter">{currentPage} / {totalPages}</span>
            <div onClick={() => handlePageChange(1)} className='arrowButtonTetris'><RxThickArrowRight /></div>
            <div onClick={() => handlePageChange(5)} className='arrowButtonTetris'><LuArrowBigRightDash /></div>
            <div onClick={() => handleJumpToPage(totalPages)} className='arrowButtonTetris'><RxDoubleArrowRight/></div>
          </div>
        )}
        {activeTab === 'reports' && reports.length > 0 && (
          <div className="pagination">
            <div onClick={() => handleJumpToReportPage(1)} className='arrowButtonTetris'><RxDoubleArrowLeft /></div>
            <div onClick={() => handleReportPageChange(-5)} className='arrowButtonTetris'><LuArrowBigLeftDash /></div>
            <div onClick={() => handleReportPageChange(-1)} className='arrowButtonTetris'><RxThickArrowLeft /></div>
            <span className="page-counter">{reportPage} / {totalReportPages}</span>
            <div onClick={() => handleReportPageChange(1)} className='arrowButtonTetris'><RxThickArrowRight /></div>
            <div onClick={() => handleReportPageChange(5)} className='arrowButtonTetris'><LuArrowBigRightDash /></div>
            <div onClick={() => handleJumpToReportPage(totalReportPages)} className='arrowButtonTetris'><RxDoubleArrowRight/></div>
          </div>
        )}
        {activeTab === 'gameProposals' && Array.isArray(gameProposals) && gameProposals.length > 0 && (
          <div className="pagination">
            <div onClick={() => handleJumpToGamePage(1)} className='arrowButtonTetris'><RxDoubleArrowLeft /></div>
            <div onClick={() => handleGamePageChange(-5)} className='arrowButtonTetris'><LuArrowBigLeftDash /></div>
            <div onClick={() => handleGamePageChange(-1)} className='arrowButtonTetris'><RxThickArrowLeft /></div>
            <span className="page-counter">{gamePage} / {totalGamePages}</span>
            <div onClick={() => handleGamePageChange(1)} className='arrowButtonTetris'><RxThickArrowRight /></div>
            <div onClick={() => handleGamePageChange(5)} className='arrowButtonTetris'><LuArrowBigRightDash /></div>
            <div onClick={() => handleJumpToGamePage(totalGamePages)} className='arrowButtonTetris'><RxDoubleArrowRight/></div>
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