import styles from './Lobby.module.css';
export default function Lobby(){
    return(
    <div className={styles.background}>
        <div className={styles.lobbycontainer}>
            <div className={styles.lobbyheader}></div>
            <span>C:Users\User{">"}</span>
            <input type="text" />
        </div>
    </div>);
}