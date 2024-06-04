import React, { useEffect, useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('ask');
  const [newGameReq, setNewGameReq] = useState({ name_game: '', description: '' });
  const [newReview, setNewReview] = useState({ username: '',stars: '3', description: '' });
  const [banUser, setBanUser] = useState({ username: '', description: '' });
  const [newAsk, setNewAsk] = useState({ name: '', message: '' });

  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

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

        setError()
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [activeTab]);

const handleSliderChange = (e) => {
  setNewReview({
    ...newReview,
    stars: parseInt(e.target.value)
  });
};

const handleTabClick = (tab) => {
  setActiveTab(tab);
};

const handleInputChangeGame = (e) => {
  const { name, value } = e.target;
  setNewGameReq((prevGame) => ({
    ...prevGame,
    [name]: value
  }));
};

const handleSubmitGame = async (e) => {
  e.preventDefault();
  if (!newGameReq.name_game || !newGameReq.description) {
    setError('Aby dodać prośbę wszystkie pola muszą być uzupełnione.');
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const response = await fetch('`/api/review/addNewGameReq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.replace(/"/g, '')}`
      },
      body: JSON.stringify(newGameReq)
    });

    if (!response.ok) {
      throw new Error('Nie udało się wysłać prośby o dodanie nowej gry');
    }

    const data = await response.json();
    setSuccessMessage('Gra została pomyślnie dodana!'); 
    setNewGameReq({ name_game: '', description: '' });
    setError(null); 
  } catch (error) {
    setError(error.message);
  }
};

const handleSubmitReview = async (e) => {
  e.preventDefault();
  if ( !newReview.username || !newReview.stars || !newReview.description) {
    setError('Aby dodać recenzje wszystkie pola muszą być uzupełnione.');
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:4001/api/review/addReview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.replace(/"/g, '')}`
      },
      body: JSON.stringify(newReview)
    });

    if (!response.ok) {
      throw new Error('Nie udało się dodać recenzji');
    }

    const data = await response.json();
    setSuccessMessage('Recenzja została pomyślnie dodana!'); 
    setNewReview({ username: '', stars: '3', description: '' });
    setError(null); 
  } catch (error) {
    setError(error.message);
  }
};

const handleInputChangeReview = (e) => {
  const { name, value } = e.target;
  setNewReview((prevReview) => ({
    ...prevReview,
    [name]: value
  }));
};

const handleSubmitBan = async (e) => {
  e.preventDefault();
  if ( !banUser.username || !banUser.description) {
    setError('Aby zgłosić użytkownika wszystkie pola muszą być uzupełnione.');
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:4001/api/review/reportUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.replace(/"/g, '')}`
      },
      body: JSON.stringify(banUser)
    });

    if (!response.ok) {
      throw new Error('Nie udało się zgłosić użytkownika.');
    }

    const data = await response.json();
    setSuccessMessage('Zgłoszono użytkownika! Twoje zgłoszenie wkrótce zostanie rozpatrzone.'); 
    setBanUser({ username: '', description: '' });
    setError(null); 
  } catch (error) {
    setError(error.message);
  }
};

const handleInputChangeBan = (e) => {
  const { name, value } = e.target;
  setBanUser((prevBan) => ({
    ...prevBan,
    [name]: value
  }));
};

const handleSubmitAsk = async (e) => {
  e.preventDefault();
  if ( !newAsk.name || !newAsk.message) {
    setError('Aby wysłać wiadomość wszystkie pola muszą być uzupełnione.');
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:4001/api/review/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.replace(/"/g, '')}`
      },
      body: JSON.stringify(newAsk)
    });

    if (!response.ok) {
      throw new Error('Nie udało się wysłać wiadomości.');
    }

    const data = await response.json();
    setSuccessMessage('Wiadomość została wysłana!'); 
    setNewAsk({ name: '', message: '' });
    setError(null); 
  } catch (error) {
    setError(error.message);
  }
};

const handleInputChangeAsk = (e) => {
  const { name, value } = e.target;
  setNewAsk((prevAsk) => ({
    ...prevAsk,
    [name]: value
  }));
};


return (
  <div className="contact">
    <div className="sidebar">
      <div className="tab">
        <div>
          <h1 className="main-title">Gry</h1>
        </div>
        <button
          className={`tab ${activeTab === 'addNewGameReq' ? 'active' : ''}`}
          onClick={() => handleTabClick('addNewGameReq')}
        >
          Dodaj Grę
        </button>
      </div>
      <div className="tabs">
      <div>
        <h1 className="main-title">Użytkownicy</h1>
      </div>
        <button
          className={`tab ${activeTab === 'ban' ? 'active' : ''}`}
          onClick={() => handleTabClick('ban')}
        >
          Zgłoś użytkownika
        </button>
        <button
          className={`tab ${activeTab === 'review' ? 'active' : ''}`}
          onClick={() => handleTabClick('review')}
        >
          Dodaj recenzje użytkownika
        </button>
      </div>
      <div className="tab">
      <div>
        <h1 className="main-title">Kontakt</h1>
        </div>
        <button
          className={`tab ${activeTab === 'ask' ? 'active' : ''}`}
          onClick={() => handleTabClick('ask')}
        >
          Napisz do nas
        </button>
      </div>
    </div>

    <div className="main-content">
      {activeTab === 'addNewGameReq' && isLoggedIn && (
        <form onSubmit={handleSubmitGame} className="add-game-form">
          <div>
            <label>Nazwa gry:</label>
            <input
              type="text"
              name="name_game"
              value={newGameReq.name_game}
              onChange={handleInputChangeGame}
            />
          </div>
          <div>
            <label>Opis:</label>
            <textarea
              name="description"
              value={newGameReq.description}
              onChange={handleInputChangeGame}
              placeholder="Uzasadnij prośbę..." rows="5"
            />
          </div>
          <button type="submit">Dodaj prośbę</button>
          {error && <p className="error-messageee">{error}</p>}
        </form>
      )}
      {activeTab !== 'addNewGameReq' && activeTab === 'review' && isLoggedIn && (
        <form onSubmit={handleSubmitReview} className="reviewer-form">
        <div>
          <label>Pseudonim gracza:</label>
          <input
            type="text"
            name="username"
            value={newReview.username}
            onChange={handleInputChangeReview}
          />
        </div>
        <div className='slider'>
              <input
                type="range"
                value={newReview.stars}
                min="1"
                max="5"
                className='slider'
                onChange={handleSliderChange}
              />
              <span>Ocena: {newReview.stars}</span>
        </div>
        
        <div>
          <label>Opis:</label>
          <textarea
            name="description"
            value={newReview.description}
            onChange={handleInputChangeReview}
            placeholder="Dodaj opis recenzji..."
          />
        </div>
        <button type="submit">Dodaj recenzje</button>
        {error && <p className="error-messageee">{error}</p>}
      </form>
    )}
      {activeTab !== 'addNewGameReq' && activeTab !== 'review' && activeTab === 'ban' && isLoggedIn && (
        <form onSubmit={handleSubmitBan} className="add-game-form">
        <div>
          <label>Pseudonim gracza:</label>
          <input
            type="text"
            name="username"
            value={banUser.username}
            onChange={handleInputChangeBan}
          />
        </div>
        
        <div>
          <label>Opis:</label>
          <textarea
            name="description"
            value={banUser.description}
            onChange={handleInputChangeBan}
            placeholder="Podaj przyczyne zgłoszenia użytkownika..." rows="5"
          />
        </div>
        <button type="submit">Zgłoś użytkownika</button>
        {error && <p className="error-messageee">{error}</p>}
      </form>
    )}
      {activeTab !== 'addNewGameReq' && activeTab !== 'review' && activeTab !== 'ban' && activeTab === 'ask' && isLoggedIn && (
        <form onSubmit={handleSubmitAsk} className="add-game-form">
        <div>
          <label>Temat:</label>
          <input
            type="text"
            name="name"
            value={newAsk.name}
            onChange={handleInputChangeAsk}
          />
        </div>
        
        <div>
          <label>Treść wiadomości:</label>
          <textarea
            name="message"
            value={newAsk.message}
            onChange={handleInputChangeAsk}
            placeholder="Podaj treść wiadomości... 
Uwaga! Nieuzasadnione wysyłanie wiadomości będzie karane" rows="5"
          />
        </div>
        <button type="submit">Wyślij wiadomość</button>
        {error && <p className="error-messageee">{error}</p>}
      </form>
    )}
    </div>
  </div>
);
};

export default Contact;
