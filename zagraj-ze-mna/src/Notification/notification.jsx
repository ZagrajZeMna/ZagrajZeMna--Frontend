import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import { expandLink } from '../fetches/expandLink';

function Notification(){
    const socket = io.connect(expandLink(''));
    const token = localStorage.getItem('token');

    useEffect(() => {
        const con = socket.on(token, (data,lobbyName) => {
            console.log(data)
            if(data == "Accepted"){
                accepted(lobbyName);
            }
            else if(data == "rejected"){
                rejected(lobbyName);
            }
            else{
                handleActivityNotification(data,lobbyName);
            }
        });
    })[con];
    
    function accepted(lobbyName) {
        toast.success(
            `Gracz "${lobbyName}" zaakceptował twoją prośbę o dołączenie do lobby!`,
            {
                position: "top-right",
                autoClose: 6000,
                progressClassName: "fancy-progress-bar",
                //theme: "dark"
            },
        );
    }

    function rejected(lobbyName) {
        toast.error(
            `Gracz "${lobbyName}" odrzucił twoją prośbę o dołączenie do lobby!`,
            {
                position: "top-right",
                autoClose: 6000,
                progressClassName: "fancy-progress-bar",
                //theme: "dark"
            },
        );
    }

    function handleActivityNotification(data,lobbyName) {
        toast.success(
            `Użytkownik ${data} poprosił o dołączenie do lobby:
            ${lobbyName}!`,
            {
                position: "top-right",
                autoClose: 6000,
                progressClassName: "fancy-progress-bar",
                //theme: "dark"
            },
        );
    }

    return (
        <div className="App">
            <ToastContainer />
        </div>
    );
}

export default Notification;
