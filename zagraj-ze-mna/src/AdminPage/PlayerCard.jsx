import React from 'react';
import './PlayerCard.css';

const PlayerCard = ({ player, onBan, onUnban, onClick }) => {
  const handleBan = (e) => {
    e.stopPropagation();
    onBan(player.ID_USER);
  };

  const handleUnban = (e) => {
    e.stopPropagation();
    onUnban(player.ID_USER);
  };

  return (
    <div className="player-card" onClick={() => onClick(player)}>
      <img src={player.avatar} alt="Avatar" className="player-avatar" />
      <div className="player-info">
        <span className="player-nickname">
          <span className="label">Nickname: </span> 
          <span className="player-detail">{player.username}</span>
        </span>
        <span className="player-email">
          <span className="label">Email: </span> 
          <span className="player-detail">{player.email}</span>
        </span>
      </div>
      {player.isBanned ? (
        <button className="unban-button" onClick={handleUnban}>Unban</button>
      ) : (
        <button className="ban-button" onClick={handleBan}>Ban</button>
      )}
    </div>
  );
};

export default PlayerCard;
