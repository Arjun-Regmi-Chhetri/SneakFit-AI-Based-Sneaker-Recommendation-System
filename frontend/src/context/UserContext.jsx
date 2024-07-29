
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserDetails, updateUserDetails } from '../service/Service'; // Update the path accordingly
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserDetails();
    }
  }, [isAuthenticated]);

  const fetchUserDetails = async () => {
    try {
      const userData = await getUserDetails();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUser(null); // Optionally handle error state
    }
  };

  const updateUser = async (userData) => {
    try {
      const updatedUser = await updateUserDetails(userData);
      setUser(updatedUser);
    } catch (error) {
      console.error("Error updating user details:", error);
      throw error; // Propagate error for handling in components
    }
  };

  return (
    <UserContext.Provider value={{ user, fetchUserDetails, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
