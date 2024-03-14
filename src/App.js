import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/login/login';
import Register from './pages/registration/register';
import Chat from './pages/chat/chat';
import { AuthProvider } from './Context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

    return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/registration" element={<Register />} /> 
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    );
}

export default App;