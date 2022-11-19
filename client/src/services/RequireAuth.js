import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import socket from "../SocketIO/socket";
import userRequest from "../httprequest/user";
import { createContext } from "react";
import { useDispatch } from "react-redux";
import { mainUserApiAction } from "~/store/actions/mainUserAction";
import { postApiAction } from "~/store/actions/postAction";
const UserContext = createContext(null);
function RequireAuth({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);
  const navigate = useNavigate();
  const instance = useAxiosPrivate();
  const dispatch = useDispatch();
  useEffect(() => {
    instance
      .post(`/auth/token`)
      .then(({ data }) => {
        return data;
      })
      .then(({ user }) => {
        dispatch(mainUserApiAction.loginFetchApi(user.id));
        socket.emit("set-user-id", user.id);
      })
      .catch((err) => {
        navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [reload]);

  return (
    <UserContext.Provider value={{ user, setUser, setReload }}>
      {loading || children}
    </UserContext.Provider>
  );
}
export const useUser = () => {
  const user = useContext(UserContext);
  return user;
};
export default RequireAuth;
