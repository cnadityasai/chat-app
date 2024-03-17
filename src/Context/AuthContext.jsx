import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const login = () => setIsLoggedIn(true);
    const logout = () => {
        setIsLoggedIn(false);
        setToken(null);
    };

    const setAuthToken = (newToken) => {
        setToken(newToken);
    }

    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, logout, token, setAuthToken}}>
            {children}
        </AuthContext.Provider>
    );
};
