// GameCategory.js
import React from 'react';
import { useParams } from 'react-router-dom';

const GameCategory = () => {
  const { game } = useParams();
 

  
  return (
    
    <div>
      <h2>Category: {game}</h2>
      {}
    </div>
  );
};

export default GameCategory;
