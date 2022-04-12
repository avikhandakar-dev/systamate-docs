import { createContext, useEffect, useState } from "react";

let local_token = null;
let local_user = null;
if (typeof window !== "undefined") {
  local_token = localStorage?.getItem("token");
  local_user = localStorage?.getItem("user");
}

const AuthContext = createContext(undefined);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(local_user ? JSON.parse(local_user) : null);
  const [token, setToken] = useState(local_token ? local_token : null);

  useEffect(() => {
    if (token && user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
