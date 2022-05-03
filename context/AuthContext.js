import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const register = async (user) => {
    console.log(user);
  };
  const login = async ({ email: identifier, password }) => {
    console.log(identifier, password);
  };
  const logout = async () => {
    console.log("logged out");
  };
  const checkUserLoggedIn = async () => {
    console.log("check");
  };
  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
