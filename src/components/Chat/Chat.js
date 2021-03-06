import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css'

let socket;

const Chat = ( { location } ) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:3005';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name: name, room: room }, ({error}) => {
            alert(error);
        });

        return () => { //hapens on unmount of the component
            socket.emit('disconnect');
            socket.off();
        }

    }, [ENDPOINT, location.search]);


    return (
        <h1>Chat</h1>
    )
}

export default Chat;