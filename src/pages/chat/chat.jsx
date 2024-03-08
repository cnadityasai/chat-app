import React, {useState} from 'react';
import './chat.css';
import bg from './bg.jpg'

function Chat() {

    const [selectedUser, setSelectedUser] = useState(null);

    function handleClick(user){
        if(selectedUser !== user){
            setSelectedUser(user);
        }
    }


    return (
        <div className="page-container">
            <div className="flex-container">
                <div className='grid-container'>
                    <div className='first-grid'>
                        <div className="chatbox">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
                            <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
                            </svg>
                        </div>
                    </div>
                    <div className='second-grid'>
                        <div className='headSection'>
                            <header class='chatHead'>Messages</header>
                            <div class="arrow">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/>
                                </svg>
                            </div>
                        </div>
                        <div className="messageList">
                            <div className="message" onClick={() => handleClick("User 1")}>
                                <img src={bg} alt="User DP" />
                                <p> User 1 </p>
                            </div>
                            <div className="message" onClick={() => handleClick("User 2")}>
                                <img src={bg} alt="User DP" />
                                <p> User 2 </p>
                            </div>
                            <div className="message">
                                <img src={bg} alt="User DP" />
                                <p> User 3 </p>
                            </div>
                            <div className="message">
                                <img src={bg} alt="User DP" />
                                <p> User 4 </p>
                            </div>
                            <div className="message">
                                <img src={bg} alt="User DP" />
                                <p> User 5 </p>
                            </div>
                            <div className="message">
                                <img src={bg} alt="User DP" />
                                <p> User 6 </p>
                            </div>
                            <div className="message">
                                <img src={bg} alt="User DP" />
                                <p> User 7 </p>
                            </div>
                            <div className="message">
                                <img src={bg} alt="User DP" />
                                <p> User 8 </p>
                            </div>
                            <div className="message">
                                <img src={bg} alt="User DP" />
                                <p> User 9 </p>
                            </div>
                            <div className="message">
                                <img src={bg} alt="User DP" />
                                <p> User 10 </p>
                            </div>
                            <div className="message">
                                <img src={bg} alt="User DP" />
                                <p> User 11 </p>
                            </div>
                            <div className="message">
                                <img src={bg} alt="User DP" />
                                <p> User 12 </p>
                            </div>
                            <div className="message">
                                <img src={bg} alt="User DP" />
                                <p> User 13 </p>
                            </div>
                            <div className="message">
                                <img src={bg} alt="User DP" />
                                <p> User 14 </p>
                            </div>
                        </div>
                    </div>
                    <div className='third-grid'>
                        <div className='messagesHeader'>
                            <div className="messageIcon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-chat-dots-fill" viewBox="0 0 16 16">
                                <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                                </svg>
                            </div>
                            <div className='user'>{selectedUser}</div>
                        </div>
                        <div className='chatSpace'>

                        </div>
                        <div className='textBox'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;