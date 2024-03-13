import React from 'react';
import bg from '../pages/chat/bg.jpg'

function ChatRoom(props) {
    const {roomName, handleClick} = props;
    return (
        <div className="message" onClick={() => handleClick(roomName)}>
            <img src={bg} alt="User DP" />
            <p>{roomName}</p>
        </div>
    )
}

export default ChatRoom;