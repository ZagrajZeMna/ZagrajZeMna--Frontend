import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./GameCategory.css";
import LobbyForm from "../LobbyForm/LobbyForm";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import LoadingChad from "../LoadingChad/LoadingChad";
import { Link } from "react-router-dom";
import { expandLink } from "../fetches/expandLink";
import io from "socket.io-client";

const socket = io.connect("https://zagrajzemna-backend.onrender.com");

const GameCategory = () => {
  const [response, setResponse] = useState(null);
  const [error2, setError2] = useState(null);
  const [error, setError] = useState(null);
  const [lobbies, setLobbies] = useState([]);
  const [lopata, setLopata] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [size, setSize] = useState("");
  const [maxPages, setMaxPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const { game } = useParams();
  const [name, setName] = useState("");
  const [sorting, setSorting] = useState("");
  const [language, setLanguage] = useState("");
  const [gameDesc, setGameDesc] = useState("");
  const [gameImg, setGameImg] = useState("");

  useEffect(() => {
    fetchUserId();
    fetchLobbies();
  }, [game, currentPage, lopata]);

  useEffect(() => {
    fetchCategoryInfo();
  }, []);

  const fetchUserId = async () => {
    const token = localStorage.getItem("token");
    const tokenWithoutQuotes = token.replace(/"/g, "");
    const response2 = await fetch(expandLink(`/api/lobby/join`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response2.ok) {
      const errorData = await response2.json();
      throw new Error(errorData.message || "Błąd tworzenia formularza");
    }
  };

  const fetchCategoryInfo = () => {
    fetch(expandLink(`/api/lobby/gameinfo?gameName=${game}`))
      .then((res) => {
        if (!res.ok) {
          throw new Error("Internal Server Error witch fetching category info");
        }
        return res.json();
      })
      .then((data) => {
        setGameImg(data.image);
        setGameDesc(data.description);
      });
  };

  const fetchLobbies = () => {
    setIsLoading(true);
    fetch(
      expandLink(
        `/api/lobby/show?page=${currentPage}&size=${5}&game=${game}&name=${name}`
      )
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Internal Server Error witch fetching lobbies");
        }
        setError(null);
        return res.json();
      })
      .then((data) => {
        setLobbies(data.Lobby);
        setMaxPages(data.Pages);
      })
      .catch((error) => {
        setError(error.message);
      });
    setIsLoading(false);
  };

  const addGameToShelf = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(expandLink(`/api/profile/addGameToShelf`), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ GAME_NAME: game }),
      });

      if (!res.ok) {
        let errorMessage;
        switch (res.status) {
          case 409:
            errorMessage = "Gra jest już dodana do kolekcji.";
            break;
          case 400:
            errorMessage =
              "Nieprawidłowe żądanie - problem z przesłanymi danymi.";
            break;
          case 403:
            errorMessage =
              "Nieautoryzowane - brak tokena lub token jest nieprawidłowy.";
            break;
          case 500:
            errorMessage = "Wewnętrzny błąd serwera.";
            break;
          default:
            errorMessage = `HTTP error! Status: ${res.status}`;
        }
        throw new Error(errorMessage);
      }

      const data = await res.json();
      setResponse(data.message);
      setError2(null); // Clear any previous errors
    } catch (err) {
      setError2(err.message);
      setResponse(null); // Clear any previous response
    }
  };

  const sendMessage = async (ID) => {
    await socket.emit("joinRoom", ID);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  };

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleSearch = () => {
    fetchLobbies();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="background2">
      <div>
        <div className="game-info-wrapper">
          <div className="game-info">
            <img src={gameImg} className="game-image" />
            <div className="game-details">
              <h2 className="category-text">Kategoria: {game}</h2>
              <div className="game-description">
                <span className="description-text">{gameDesc}</span>
              </div>
              <div className="add-game">
                <button className="add-game-button" onClick={addGameToShelf}>
                  Dodaj
                </button>
                {error2 ? (
                  <span className="add-game-text">{error2}</span>
                ) : response ? (
                  <span className="add-game-text">
                    {JSON.stringify(response)}
                  </span>
                ) : (
                  <span className="add-game-text">
                    Dodaj grę do kolekcji, aby wyświetlała się na twoim profilu!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <span className="available-lobby-text">DOSTĘPNE LOBBY: </span>
        <div className="search-bar">
          <input
            type="text"
            value={name}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSearch}>Szukaj</button>
        </div>
      </div>

      <LobbyForm
        gameNameProp={game}
        lopata={lopata}
        setLopata={setLopata}
      ></LobbyForm>

      {error ? (
        <div className="error-message">
          {console.log(error)}Brak dostępnych lobby 😥
        </div>
      ) : isLoading ? (
        <LoadingChad></LoadingChad>
      ) : (
        <div className="lobby-wrapper">
          <div className="lobby-container">
            {lobbies.map((lobby) => (
              <div key={lobby.ID_LOBBY} className="lobby-tile">
                <img
                  src={"https://i.ibb.co/7bs0bb6/chad.png"}
                  alt={lobby.Name}
                  className="lobby-image"
                />
                <div></div>
                <div className="lobby-details">
                  <h3>{lobby.Name}</h3>
                  <p>{lobby.Description}</p>
                </div>
                <div className="player-count">
                  <Link>
                    <button onClick={() => sendMessage(lobby.ID_LOBBY)}>
                      <FaCirclePlus />
                    </button>
                  </Link>
                  <span>
                    Gracze: {lobby.playerCount}/{lobby.NeedUsers}
                  </span>
                </div>
              </div>
            ))}

            <div className="lobby-pagination-wrapper">
              <div className="lobby-pagination-container">
                <button
                  onClick={() => {
                    if (currentPage > 0) {
                      setCurrentPage(currentPage - 1);
                    }
                  }}
                >
                  <MdNavigateBefore />
                </button>
                <button
                  onClick={() => {
                    if (currentPage + 1 < maxPages) {
                      setCurrentPage(currentPage + 1);
                    }
                  }}
                >
                  <MdNavigateNext />
                </button>
                <span>
                  Strona {currentPage + 1} z {maxPages}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="popup-message">
              Wysłano prośbę o dołączenie do lobby. Informacja o przyjęciu
              wyświetli się w zakładce powiadomienia (dzwonek).
            </span>
            <button className="popup-close" onClick={() => setShowPopup(false)}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCategory;
