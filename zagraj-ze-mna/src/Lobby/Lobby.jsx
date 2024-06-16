import styles from "./Lobby.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { expandLink } from "../fetches/expandLink";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import io from "socket.io-client";
import { Link } from 'react-router-dom';

const socket = io.connect('https://zagrajzemna-backend.onrender.com');

export default function Lobby() {
  const [output, setOutput] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [players, setPlayers] = useState([]);
  const [owner, setOwner] = useState({});
  const { lobbyId } = useParams();
  const { lobbyname } = useParams();
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchLobbyData();
    const room = lobbyId;
    socket.emit("joinchat", { username, room });
  }, [lobbyId]);

  const fetchLobbyData = async () => {
    try {
      const playersResponse = await fetch(
        expandLink(`/api/lobbyInside/getUserList?lobbyId=${lobbyId}`)
      );
      if (!playersResponse.ok) {
        throw new Error("Failed to fetch players");
      }
      const playersData = await playersResponse.json();
      console.log(playersData);
      setPlayers(playersData);

      const ownerResponse = await fetch(
        expandLink(`/api/lobbyInside/getOwnerLobbyData?lobbyId=${lobbyId}`)
      );

      if (!ownerResponse.ok) {
        throw new Error("Failed to fetch owner");
      }
      const ownerData = await ownerResponse.json();
      setOwner(ownerData);
    } catch (error) {
      console.error("Error fetching lobby data:", error);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      const message = inputValue;
      setOutput([...output, `C:Users\\User>${message}`]);
      setInputValue("");

      //------experimental code for adding the message to database------

      //     try {
      //         const response = await fetch("/api/lobbyInside/addMessage", {
      //             method: 'POST',
      //             headers: {
      //                 'Content-Type': 'application/json',
      //                 'x-access-token': localStorage.getItem('token')
      //             },
      //             body: JSON.stringify({ lobbyId, message, userId: localStorage.getItem('userId') })
      //         });
      //         if (!response.ok) {
      //             throw new Error('Failed to send message');
      //         }
      //     } catch (error) {
      //         console.error('Error sending message:', error);
      //     }
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.lobbycontainer}>
        <div className={styles.sidebar}>
          <div className={styles.lobbyheader}>Gracze:</div>
          {players.map((player, index) => (
            <Link to={`/userProfile/${player.ID_USER}` }key={player.ID_USER} className={styles.myLink}>
              <div  className={styles.players}>
                <img src={player.avatar} alt="no avatar" className={styles.avatar} />
                <span className={styles.myText}>{player.username}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.maincontent}>
          <div className={styles.lobbyheader}>
            <div className={styles.headerContent}>
              <span>Lobby: {lobbyname}</span>
            </div>
            <button className={styles.leaveButton}>opusc lobby</button>
          </div>

          <div className={styles.ownerheader}>Właściciel: {owner.username}</div>
          <div className={styles.chatheader}>Chat</div>
          <div className={styles.chatoutput}>
            {/* {output.map((line, index) => (
              <div key={index}>{line}</div>
            ))} */}
            <Messages
              socket={socket}
              usernameMy={username}
              roomId={lobbyId}
            ></Messages>
          </div>
          <div className={styles.inputcontainer}>
            {/* <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              maxLength={100}
            /> */}
            <SendMessage
              socket={socket}
              username={username}
              room={lobbyId}
            ></SendMessage>
          </div>
        </div>
      </div>
    </div>
  );
}
