import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../components/InfoBar';
import Input from '../components/Input';
import Messages from '../components/Messages';
import TextContainer from '../components/TextContainer';

let socket;

const Chat = ({ location }) => {

    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState('');
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'https://chatapp67.herokuapp.com/'

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', {name, room}, () => {

        });

        return () => {
            socket.emit('disconnect');

            socket.off();
        }

    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(messages => [...messages, message]);
        })

        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage('')); //Clearing the input field
        }
    }

    return (
        <div className="outerContainer">
            {/* <TextContainer users={users}/> */}
            <div className="container">
                <InfoBar room={room}/>
                <Messages 
                    messages={messages} 
                    name={name}
                />
                <Input 
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage} 
                />
            </div>
        </div>
    )
}
export default Chat;