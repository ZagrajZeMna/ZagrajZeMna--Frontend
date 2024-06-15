import { expandLink } from "../fetches/expandLink";
import styles from "./Lobby.module.css";
import { useState, useEffect, useRef } from "react";



const Messages = ({ socket, usernameMy ,roomId}) => {
  const [messagesReceived, setMessagesReceived] = useState([]);
  let previousUserName = '';
  let previousTime = '';
  let previousUserDate= '';
  let hider = false;

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
  function formatDateFromTimestamp(timestamp, justtime) {
    console.log("czas: ", timestamp);
    console.log(justtime);
    const date = new Date(timestamp);
    let value = date.toLocaleString();
    value = value.substring(0, value.length-10);
    return value;
  }

  function doMagicClassName(username)
  {
    let myClassName = styles.msgMeta1;
    if(usernameMy == username)
      myClassName = styles.msgMeta2;
    
    return myClassName;
  }

  function doMagicClassNameAling(username)
  {
    let myClassName = styles.msgRight;
    if(usernameMy == username)
      myClassName = styles.msgLeft;
    
    return myClassName;
  }

  function vanisher_or_sth(username, date)
  {
    let show = false;
    hider = false;
    if(username != previousUserName || date != previousUserDate){
      show = true;
      hider = true;
    }

    if(show){
      previousUserName = username;
      previousUserDate = date;
    }

    return show;
  }

  function addintional_margin_class(username, date)
  {
    let classAdditional = styles.no_margin_added;
    if(username != previousUserName || date != previousUserDate)
    {
      classAdditional = styles.margin_added;
    }

    return classAdditional;

  }

  return (
    <div className={styles.messagesColumn} ref={scrollSpan}>
      {sortMessagesByDate(messagesReceived).map((msg, i) => (
        <div className={styles.message + " " + doMagicClassNameAling(msg.username) + " "+ addintional_margin_class(msg.username, msg.date)} key={i}>
          <div className={styles.messagewrapper}>
            {vanisher_or_sth(msg.username, msg.date) && <span className={doMagicClassName(msg.username) + " " + styles.booldMessage}>{msg.username} </span>}
            <span className={styles.msgMeta}>
              {hider && (formatDateFromTimestamp(msg.date, msg.time))}
            </span>
          </div>
          {/*<span className={styles.msgText} >C:Users\</span>*/}
          <span className={styles.booldMessage}>{msg.message}</span>
          <span ref={scrollSpan}></span>
        </div>
        
      ))}
    </div>
  );
};

export default Messages;
