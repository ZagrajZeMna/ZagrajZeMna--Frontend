import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  MdNavigateNext,
  MdNavigateBefore,
  MdExpandMore,
  MdExpandLess,
} from "react-icons/md"; // Import icons
import LoadingChad from "../LoadingChad/LoadingChad";
import "./Home.css";
import Footer from "../footer/footer";
import { expandLink } from "../fetches/expandLink";

function Home() {
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPages, setMaxPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [recommendedGames, setRecommendedGames] = useState([]);
  const [showPopular, setShowPopular] = useState(true); // Nowy stan

  const navigate = useNavigate();

  useEffect(() => {
    fetchGames();
    fetchRecommendedGames();
  }, [currentPage]);

  const fetchGames = () => {
    setIsLoading(true);
    fetch(
      expandLink(
        `/api/mainGame/getGamePagination?page=${currentPage}&name=${name}`
      )
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Internal Server Error");
        }
        setError(null);
        return res.json();
      })
      .then((data) => {
        setGames(data.Game);
        setMaxPages(data.Pages);
        console.log("---------------FETCH DO STRONY GŁÓWNEJ---------------");
        console.log(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchRecommendedGames = () => {
    setIsLoading(true);
    fetch(expandLink(`/api/mainGame/getRecommendedGames`))
      .then((res) => {
        if (!res.ok) {
          throw new Error("Internal Server Error");
        }
        setError(null);
        return res.json();
      })
      .then((data) => {
        setRecommendedGames(data.Game);
        console.log("---------------FETCH GIER PROPOWANOWANYCH---------------");
        console.log(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (event) => {
    setName(event.target.value); // Update name state on input change
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    fetchGames();
    setCurrentPage(0);
    if (name.trim() !== "") {
      setShowPopular(false); // Ukryj popularne gry przy wyszukiwaniu
    } else {
      setShowPopular(true); // Pokaż popularne gry, gdy pole wyszukiwania jest puste
    }
  };

  const [games, setGames] = useState([]);

  const togglePopularGames = () => {
    setShowPopular(!showPopular); // Przełącz widoczność popularnych gier
  };

  return (
    <div className="background">
      <div className="game-tiles-container">
        <span className="caption">Giereczki</span>
        <div className="category-button-container">
          <div className="category-button">
            <span className="category-button-text">Graj</span>
          </div>
          <div className="category-button">
            <span className="category-button-text">Poznawaj</span>
          </div>
          <div className="category-button">
            <span className="category-button-text">Baw się</span>
          </div>
        </div>
        <div className="searchBar">
          <input
            type="text"
            value={name}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSearch}>Szukaj</button>
        </div>
        <div className="sorting-buttons">
          <button className="sorting-button" onClick={togglePopularGames}>
            Popularne
            {showPopular ? (
              <MdExpandLess className="arrow-icon" />
            ) : (
              <MdExpandMore className="arrow-icon" />
            )}
          </button>
        </div>
        {showPopular && (
          <div className="game-tiles-grid">
            {Array.isArray(recommendedGames) &&
              recommendedGames.map((game, index) => (
                <Link
                  to={`/category/${game.name}`}
                  key={index}
                  className="game-tile"
                >
                  <img src={game.image} alt={game.name} />
                  <span className="game-name">{game.name}</span>
                  <span className="lobby-count">
                    Liczba lobby: {game.lobbycount}
                  </span>
                </Link>
              ))}
          </div>
        )}
        <div className="spacing"></div>
        <div className="sorting-buttons">
          <button className="sorting-button">Kategorie</button>
        </div>
        {isLoading ? (
          <LoadingChad />
        ) : error ? (
          <div className="server-down-container">
            <span>Pora dotknąć trawy</span>
            <img src="https://i.ibb.co/0FnRKhw/grass.jpg" alt="Grass" />
          </div>
        ) : (
          <>
            <div className="game-tiles-grid">
              {games.map((game, index) => (
                <Link
                  to={`/category/${game.name}`}
                  key={index}
                  className="game-tile"
                >
                  <img src={game.image} alt={game.name} />
                  <span className="game-name">{game.name}</span>
                </Link>
              ))}
            </div>
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
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
