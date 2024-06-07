import styles from "./Lobby.module.css";
import React, { useState } from "react";

const SendMessage = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };
  const sendMessage = () => {
    if (message.trim() !== "") {
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      socket.emit("send_message", { username, room, message });
      setMessage("");
    }
  };

  return (
    <div className={styles.sendMessageContainer}>
      <span>C:Users\{username}&gt;</span>
      <input
        className={styles.messageInput}
        placeholder="Message..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        onKeyDown={handleKeyPress}
        maxLength={500}
      />
      <button className="btn btn-primary" onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
};

export default SendMessage;
