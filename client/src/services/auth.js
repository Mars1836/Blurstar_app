import { useContext, createContext, useState } from "react";
import Cookies from "universal-cookie";
const AuthContext = createContext(null);
const cookies = new Cookies();
export const AuthPrivide = ({ children }) => {
  const [tokenOj, setTokenOj] = useState({
    token: cookies.get("token"),
    refreshtoken: cookies.get("refreshtoken"),
  });
  const login = (tokenOj) => {
    setTokenOj(tokenOj);
  };
  const logout = () => {
    setTokenOj(null);
  };
  return (
    <AuthContext.Provider value={{ logout, login, tokenOj, setTokenOj }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};
