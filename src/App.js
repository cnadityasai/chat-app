import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/login/login';
import Register from './pages/registration/register';

function App() {

    return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/registration" element={<Register />} /> {/* Add a route for the Registration component */}
      </Routes>
    </BrowserRouter>
    );
}

export default App;