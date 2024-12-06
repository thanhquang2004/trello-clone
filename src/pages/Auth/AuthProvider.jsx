import { createContext, useEffect, useState } from "react";
import { useGetMe } from "~/hooks/useGetMe";

// Create a context for the auth state
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const { getMe, data, error } = useGetMe();
  getMe();
  // State to hold the authentication status

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle login
  useEffect(() => {
    if (data) {
      setIsAuthenticated(true);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setIsAuthenticated(false);
    }
  }, [error]);

  // Function to handle logout
  const logout = () => {
    // Perform logout logic here
    setIsAuthenticated(false);
  };

  // Provide the auth state and functions to the children components
  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
