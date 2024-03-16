import React from 'react';
import MessageBox from './messageBox';

const ChatSpace = ({messages, user, roomId}) => {

    const roomMessages = messages.filter((message) => message.room === roomId);

    return (
        <div className='chatSpace'>
          {roomMessages.length > 0 ? (
            roomMessages.map((newMessage, index) => (
              <MessageBox
                key={index}
                name={newMessage.current_user}
                message={newMessage.message}
                currentUser={user} // Add alignRight prop based on sender
              />
            ))
          ) : (
            <p>No messages in this room.</p>
          )}
        </div>
      );
}

export default ChatSpace;