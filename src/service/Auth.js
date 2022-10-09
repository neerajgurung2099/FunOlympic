import { useState, createContext, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    Email: localStorage.getItem("Email") || "",
    UserName: localStorage.getItem("UserName") || "",
    Role: localStorage.getItem("Role") || "",
  });

  const login = (user) => {
    setUser(user);
    localStorage.setItem("UserName", user.UserName);
    localStorage.setItem("Email", user.Email);
    localStorage.setItem("Role", user.Role);
  };

  const logout = (user) => {
    setUser(null);
    localStorage.removeItem("UserName");
    localStorage.removeItem("Email");
    localStorage.removeItem("Role");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
