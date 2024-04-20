import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home(){

    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };


    return(
        <>
            <h1>Witaojcie</h1>
            <button onClick={handleClick}></button>
        </>
    );
}

export default Home