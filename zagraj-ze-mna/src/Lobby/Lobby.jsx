import styles from "./Lobby.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { expandLink } from "../fetches/expandLink";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import io from "socket.io-client";

const socket = io.connect(expandLink(""));

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

  const leaveLobby = async () => {
    try {
      console.log("ID LOBBY I NAZWA UZYTKOWNIKA: " + lobbyId + " " + username);

      const res = await fetch(
        expandLink(
          `/api/lobbyInside/deleteUser?lobbyId=${lobbyId}&username=${username}`
        ),
        { method: "DELETE", headers: { accept: "*/*" } }
      );
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to delete player from lobby: ${errorText}`);
      }
      // Redirect to /myLobby after successful DELETE
      window.location.href = "/myLobby";
    } catch (error) {
      console.error("Error occurred while deleting player: ", error);
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.lobbycontainer}>
        <div className={styles.sidebar}>
          <div className={styles.lobbyheader}>Gracze:</div>
          {players.map((player, index) => (
            <div key={index} className={styles.players}>
              <img
                src={player.avatar}
                alt="no avatar"
                className={styles.avatar}
              />
              {player.username}
            </div>
          ))}
        </div>
        <div className={styles.maincontent}>
          <div className={styles.lobbyheader}>
            <div className={styles.headerContent}>
              <span>Lobby: {lobbyname}</span>
            </div>
            <button className={styles.leaveButton} onClick={leaveLobby}>
              opusc lobby
            </button>
          </div>

          <div className={styles.ownerheader}>Właściciel: {owner.username}</div>
          <div className={styles.chatheader}>Chat</div>
          <div className={styles.chatoutput}>
            <Messages
              socket={socket}
              usernameMy={username}
              roomId={lobbyId}
            ></Messages>
          </div>
          <div className={styles.inputcontainer}>
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
