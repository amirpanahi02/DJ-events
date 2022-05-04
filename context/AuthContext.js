import { createContext, useState } from "react";
import { NEXT_URL } from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const register = async (user) => {
    console.log(user);
  };
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/login`, {
      method: "POST",
      headers: { "Conetnt-Type": "aplication/josn" },
      body: JSON.stringify({ identifier: identifier, password }),
    });
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
    } else {
      setError(data.message);
    }
  };
  const logout = async () => {
    console.log("logged out");
  };
  const checkUserLoggedIn = async () => {
    console.log("check");
  };
  return (
    <AuthContext.Provider
      value={{ user, error, setError, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
