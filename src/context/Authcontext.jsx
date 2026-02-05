import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from "../service/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser =
            localStorage.getItem('sp_active_user') ||
            sessionStorage.getItem('sp_active_user');

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        setLoading(false);
    }, []);

    const login = (userData, remember = false) => {
        setLoading(true);
        console.log('User Data: ', userData)
        setUser(userData);
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem('sp_active_user', JSON.stringify(userData));
        setLoading(false);
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('sp_active_user');
        sessionStorage.removeItem('sp_active_user');
        // Clear any other auth-related data
        localStorage.removeItem('remember');
        return { success: true };
    };

    const register = async (data) => {
        try {
            setUser(data);
            const storage = data?.remember ? localStorage : sessionStorage;
            storage.setItem('sp_active_user', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading, isAdmin: user?.role === 'admin' }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
