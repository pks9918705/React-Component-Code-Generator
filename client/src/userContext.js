// UserContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = (userData) => {
    // Your authentication logic goes here
    console.log('userData',userData);
    // userData -- consist of username and data 
    setUser(userData);
  };

  const logoutUser = () => {
    // Your logout logic goes here
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook for using the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
