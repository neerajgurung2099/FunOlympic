import { useState, createContext, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const userLogin = (user) => {
    setUser(user);
  };

  const adminLogin = (user) => {
    setUser(user);
  };

  const logout = (user) => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, userLogin, adminLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
