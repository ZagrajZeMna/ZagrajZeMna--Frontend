import { expandLink } from "../fetches/expandLink";
import styles from "./Lobby.module.css";
import { useState, useEffect, useRef } from "react";



const Messages = ({ socket, roomId }) => {
  const [messagesReceived, setMessagesReceived] = useState([]);

  const scrollSpan = useRef();
  // Runs whenever a socket event is received from the server
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          date: data.date,
          time: data.time,
        },
      ]);
    });

    // Remove event listener on component unmount
    return () => socket.off("receive_message");
  }, [socket]);

  // Fetch the last 100 messages sent in the chat room (fetched from the db in backend)
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        expandLink("/api/lobbyInside/latest100messages"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            room: `${roomId}`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Internal Server Error");
      }

      const data = await response.json();
      console.log("Fetched data:", data); // Log the response data

      if (!Array.isArray(data.message)) {
        throw new Error("Response is not an array");
      }

      const formattedMessages = data.message.map((msg) => ({
        message: msg.message,
        username: msg.username,
        date: msg.date,
        time: msg.time,
      }));

      setMessagesReceived((state) => [...state, ...formattedMessages]);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  //Scroll to the most recent message
  useEffect(() => {
    // if (messagesColumnRef.current) {
    //   messagesColumnRef.current.scrollIntoView =
    //     messagesColumnRef.current.scrollHeight;
    // }
    scrollSpan.current.scrollIntoView({ behavior: "smooth" });

    }, [messagesReceived]);

  // Sort messages by date
  function sortMessagesByDate(messages) {
    return messages.sort(
      (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
    );
  }

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div className={styles.messagesColumn} ref={scrollSpan}>
      {sortMessagesByDate(messagesReceived).map((msg, i) => (
        <div className={styles.message} key={i}>
          <div className={styles.messagewrapper}>
            <span className={styles.msgMeta}>{msg.username} </span>
            <span className={styles.msgMeta}>
              {formatDateFromTimestamp(msg.date, msg.time)}
            </span>
          </div>
          <p className={styles.msgText} >C:Users\{msg.message}</p>
          <span ref={scrollSpan}></span>
        </div>
        
      ))}
    </div>
  );
};

export default Messages;
