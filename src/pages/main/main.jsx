import React, { useState, useEffect } from "react";
import "./chat.css";
import { useNavigate, useParams } from "react-router-dom"
import ChatRoom from "../../components/ChatRoom"
import { ChatState } from "../../Context/ChatProvider"
import axios from "axios"
import { useAuth } from "../../Context/AuthContext"
import io from "socket.io-client"


function Main() {

    const { roomId } = useParams()
    const message =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    const [selectedRoom, setSelectedRoom] = useState(null)
    const [selectedRoomId, setSelectedRoomId] = useState(null)
    const { user } = ChatState()
    const [showCreateRoomForm, setShowCreateRoomForm] = useState(false)
    const [newRoomName, setNewRoomName] = useState("")
    const [recipientId, setRecipientId] = useState("")
    const [socket, setSocket] = useState(null)
    const [messages, setMessages] = useState([])
    const [availableRooms, setAvailableRooms] = useState({ rooms: [] })
    const [membersList, setMembersList] = useState([])
    const { isLoggedIn, setIsLoggedIn, logout } = useAuth()
    const navigate = useNavigate()
    const {token} = useAuth();
  
    useEffect(() => {
      if (!isLoggedIn) {
        navigate("/")
      }
      fetchRooms()
      const socket = io("http://127.0.0.1:5000", {
        sync_disconnect_on_unload: true,
      })
      setSocket(socket)
  
      return () => {

      }
    }, [roomId, user, isLoggedIn, navigate, selectedRoomId])
  
    const fetchRooms = () => {
      // console.log(token)
      const headers = {
        'Authorization': `Bearer ${token}`
      }
      fetch("http://127.0.0.1:5000/api/chat/list_rooms", { 
        method: "GET",
        headers: headers
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data)
          setAvailableRooms(data)
        })
        .catch((error) => console.error("Error fetching rooms: ", error))
    }

    function handleClick(roomId, roomName, members) {
        if (selectedRoomId === roomId) {
          return;
        }
        navigate(`/chat/${roomId}`)
      }
      function handleSubmitRoom() {
        if (newRoomName.trim() !== "") {
          const requestData = {
            room_name: newRoomName
          }
    
          //console.log(requestData);
          axios
            .post("http://127.0.0.1:5000/api/chat/room/new", requestData, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          })
            .then((response) => {
              if (response.status === 201) {
                console.log("Room created Successfully:", response.data)
                fetchRooms()
              } else {
                console.error("Failed to create room:", response.data)
              }
            })
            .catch((error) =>
              console.error("Error fetching updated rooms: ", error)
            )
    
          setNewRoomName("")
          setShowCreateRoomForm(false)
        }
      }

      function handleLogout() {
        socket.on("disconnect", () => {
          console.log("Connected to the server")
        })
        // socket.disconnect(); finalise on which one
        logout()
        navigate("/")
      }

      function handleCreateRoom() {
        setShowCreateRoomForm(true)
      }
    
      function handleCancelRoomCreation() {
        setShowCreateRoomForm(false)
      }
    
      function handleRoomNameChange(event) {
        setNewRoomName(event.target.value)
      }
    
      function handleRecipientIdChange(event) {
        setRecipientId(event.target.value)
      }

    return (
        <div className='page-container'>
          <div className='flex-container'>
            <div className='grid-container'>
              <div className='first-grid'>
                <div className='chatbox'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='25'
                    height='25'
                    fill='currentColor'
                    className='bi bi-chat'
                    viewBox='0 0 16 16'
                  >
                    <path d='M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105' />
                  </svg>
                </div>
                <div className='logout' onClick={handleLogout}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    fill='currentColor'
                    className='bi bi-box-arrow-left'
                    viewBox='0 0 16 16'
                  >
                    <path
                      fillRule='evenodd'
                      d='M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z'
                    />
                    <path
                      fillRule='evenodd'
                      d='M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z'
                    />
                  </svg>
                  <span className='logout-text'>Logout</span>
                </div>
              </div>
              <div className='second-grid'>
                <div className='headSection'>
                  <header className='chatHead'>Messages</header>
                  
                  <div className='create-room'>
                    {/* <div className="arrow">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-down-up" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/>
                                        </svg>
                                    </div> */}
                    <div className="username">Current User: {user}</div>
                    <div className='create-room-text' onClick={handleCreateRoom}>
                      Create Room
                    </div>
                  </div>
                  {showCreateRoomForm && (
                    <div className='create-room-form'>
                      <input
                        className='create-room-input'
                        type='text'
                        value={newRoomName}
                        onChange={handleRoomNameChange}
                        placeholder='Enter room name'
                      />
                      {/* <input
                        className='recipient-id-input'
                        type='text'
                        value={recipientId}
                        onChange={handleRecipientIdChange}
                        placeholder='Enter recipient ID'
                      /> */}
                      <div className='flex-buttons'>
                        <button onClick={handleSubmitRoom}>Create</button>
                        <button onClick={handleCancelRoomCreation}>Cancel</button>
                      </div>
                    </div>
                  )}
                </div>
                <div className='messageList'>
                  {availableRooms.rooms.map((room, index) => (
                    <ChatRoom
                      key={index}
                      room={room}
                      roomId={room.room_id}
                      roomName={room.room_name}
                      handleClick={() =>
                        handleClick(room.room_id, room.room_name, room.members)
                      }
                    />
                  ))}
                </div>
              </div>
              <div className='third-grid'>
              </div>
            </div>
          </div>
        </div>
      )
}

export default Main;