import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, [token, user]);

  const login = (token, user) => {
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, user,login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
