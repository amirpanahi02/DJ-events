import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { NEXT_URL } from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

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
    const res = await fetch(`${NEXT_URL}/user`);
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
      router.push("/account/dashboard");
    } else {
      setUser(null);
    }
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
