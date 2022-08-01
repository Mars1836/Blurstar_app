import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import userRequest from "../httprequest/user";
import { createContext } from "react";
const UserContext = createContext(null);
function RequireAuth({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);
  const navigate = useNavigate();
  const instance = useAxiosPrivate();
  useEffect(() => {
    instance
      .post(`/auth/token`)
      .then(({ data }) => {
        return data;
      })
      .then(({ user }) => {
        userRequest.findById(user._id).then(({ data }) => {
          setUser(data);
        });
      })
      .catch((err) => {
        navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [reload]);
  return (
    <UserContext.Provider value={{ user, setReload }}>
      {loading || children}
    </UserContext.Provider>
  );
}
export const useUser = () => {
  const user = useContext(UserContext);
  return user;
};
export default RequireAuth;
