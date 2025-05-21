import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContextType, User } from '../utils/types';
import { storage } from '../utils/storage';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing user on app start
    const loadUser = async () => {
      const savedUser = await storage.getUser();
      if (savedUser) {
        setUser(savedUser);
      }
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const savedUser = await storage.getUser();
    if (savedUser && savedUser.email === email && savedUser.password === password) {
      setUser(savedUser);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (name: string, email: string, password: string, gender: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password,
      gender,
    };
    await storage.saveUser(newUser);
    setUser(newUser);
  };

  const logout = async () => {
    // Only clear the current user's session
    setUser(null);
    // Don't clear the storage, so registered users remain
  };

  return (
      <AuthContext.Provider value={{ user, login, register, logout }}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
