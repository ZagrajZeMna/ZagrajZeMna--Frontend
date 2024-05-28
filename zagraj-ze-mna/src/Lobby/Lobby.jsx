import styles from './Lobby.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Lobby() {
    const [output, setOutput] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [players, setPlayers] = useState([]);
    const [owner, setOwner] = useState({});
    const { lobbyId } = useParams();

    useEffect(() => {
        fetchLobbyData();
    }, [lobbyId]);

    const fetchLobbyData = async () => {
        try {
            const playersResponse = await fetch("/api/lobbyInside/getUserList", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token'),
                    'lobbyId': lobbyId
                }
            });
            if (!playersResponse.ok) {
                throw new Error('Failed to fetch players');
            }
            const playersData = await playersResponse.json();
            setPlayers(playersData);

            const ownerResponse = await fetch("/api/lobbyInside/getOwnerLobbyData", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token'),
                    'lobbyId': lobbyId
                }
            });
            if (!ownerResponse.ok) {
                throw new Error('Failed to fetch owner');
            }
            const ownerData = await ownerResponse.json();
            setOwner(ownerData);
        } catch (error) {
            console.error('Error fetching lobby data:', error);
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            const message = inputValue;
            setOutput([...output, `C:Users\\User>${message}`]);
            setInputValue('');

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
                    <div className={styles.lobbyheader}>Players</div>
                    {players.map(player => (
                        <div key={player.ID_USER}>
                            <img src={player.avatar} alt="Avatar" className={styles.avatar} />
                            {player.username}
                        </div>
                    ))}
                </div>
                <div className={styles.maincontent}>
                    <div className={styles.lobbyheader}>Lobby: {lobbyId}</div>
                    <div className={styles.ownerheader}>Owner: {owner.username}</div>
                    <div className={styles.chatheader}>Chat</div>
                    <div className={styles.chatoutput}>
                        {output.map((line, index) => (
                            <div key={index}>{line}</div>
                        ))}
                    </div>
                    <div className={styles.inputcontainer}>
                        <span>C:Users\User&gt;</span>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            maxLength={100}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
