import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/login/login';
import Register from './pages/registration/register';
import Chat from './pages/chat/chat';

function App() {

    return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/registration" element={<Register />} /> 
        <Route path="/chat" element={<Chat />}></Route>
      </Routes>
    </BrowserRouter>
    );
}

export default App;