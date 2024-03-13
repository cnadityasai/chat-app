import React, {useState} from 'react';
import './chat.css';
import MessageBox from '../../components/messageBox';
import ChatRoom from '../../components/ChatRoom';
import { ChatState } from '../../Context/ChatProvider';

function Chat() {

    // Only for testing remove later
    const message = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

    const [selectedUser, setSelectedUser] = useState(null);
    const [messageInput, setMessageInput] = useState("");
    const {user} = ChatState();
    // console.log(user);
    const [showCreateRoomForm, setShowCreateRoomForm] = useState(false);
    const [showJoinRoomForm, setShowJoinRoomForm] = useState(false);
    const [newRoomName, setNewRoomName] = useState('');
    const [joinRoomName, setJoinRoomName] = useState('');
    //testing
    const [messages, setMessages] = useState([]);
    const [availableRooms, setAvailableRooms] = useState(["Room 1", "Room 2", "Room 3", "Room 4", "Room 5"]);
    

    function handleClick(user){
        if(selectedUser !== user){
            setSelectedUser(user);
        }
    }

    function handleMessageSubmit(){
        if(messageInput.trim() !== ''){
            const newMessage = {
                user: selectedUser,
                text: messageInput
            };
            setMessages([...messages, newMessage]);
            setMessageInput('');
        }
    }

    function handleCreateRoom() {
        setShowCreateRoomForm(true);
    }

    function handleCancelRoomCreation() {
        setShowCreateRoomForm(false);
    }

    function handleRoomNameChange(event) {
        setNewRoomName(event.target.value);
    }

    function handleSubmitRoom() {
        if (newRoomName.trim() !== '') {
            setAvailableRooms([...availableRooms, newRoomName]);
            setNewRoomName('');
            setShowCreateRoomForm(false);
        }
    }

    function handleJoinRoom() {
        setShowJoinRoomForm(true);
    }

    function handleCancelRoomJoin() {
        setShowJoinRoomForm(false);
    }

    function handleJoinRoomNameChange(event) {
        setJoinRoomName(event.target.value);
    }

    function handleSubmitJoinRoom() {
        // Your logic to join the room goes here
        if (joinRoomName.trim() !== '') {
            console.log(`Joining room: ${joinRoomName}`);
            setJoinRoomName('');
            setShowJoinRoomForm(false);
        }
    }


    return (
        <div className="page-container">
            <div className="flex-container">
                <div className='grid-container'>
                    <div className='first-grid'>
                        <div className="chatbox">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
                            <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
                            </svg>
                        </div>
                    </div>
                    <div className='second-grid'>
                        <div className='headSection'>
                            <header className='chatHead'>Messages</header>
                            <div className="create-room">
                                {/* <div className="arrow">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-down-up" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/>
                                    </svg>
                                </div> */}
                                <div className="create-room-text" onClick={handleCreateRoom}>Create Room</div>
                                <div className="join-room-text" onClick={handleJoinRoom}>Join Room</div>
                            </div>
                            {showCreateRoomForm && (
                                <div className="create-room-form">
                                    <input
                                        type="text"
                                        value={newRoomName}
                                        onChange={handleRoomNameChange}
                                        placeholder="Enter room name"
                                    />
                                    <button onClick={handleSubmitRoom}>Create</button>
                                    <button onClick={handleCancelRoomCreation}>Cancel</button>
                                </div>
                            )}
                            {showJoinRoomForm && (
                                <div className="join-room-form">
                                    <input
                                        type="text"
                                        value={joinRoomName}
                                        onChange={handleJoinRoomNameChange}
                                        placeholder="Enter room name to join"
                                    />
                                    <button onClick={handleSubmitJoinRoom}>Join</button>
                                    <button onClick={handleCancelRoomJoin}>Cancel</button>
                                </div>
                            )}
                        </div>
                        <div className="messageList">
                            {availableRooms.map((room, index) => (
                                <ChatRoom key={index} roomName={room} handleClick={handleClick} />
                            ))}
                        </div>
                    </div>
                    <div className='third-grid'>
                        <div className='messagesHeader'>
                            <div className="messageIcon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chat-dots-fill" viewBox="0 0 16 16">
                                <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                                </svg>
                            </div>
                            <div className='user'>{selectedUser}</div>
                        </div>
                        <div className='chatSpace'>
                            <div className='receiver'>
                                {selectedUser === "User 1" && <MessageBox name={selectedUser} message={message}/>}    
                            </div>
                            <div className='sender'>
                                {messages.filter((newMessage) => newMessage.user !== 'User 1')
                                .map((newMessage, index) => (
                                    <MessageBox key={index} name={newMessage.user} message={newMessage.text} />
                                ))
                                }
                            </div>
                        </div>
                        <div className='textBox'>
                            <input
                                type="text"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                placeholder="Type your message..."
                            />
                            <button onClick={handleMessageSubmit} className="submitButton">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;