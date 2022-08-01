import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
function RequireNotAuth({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const instance = useAxiosPrivate();
  useEffect(() => {
    instance
      .post(`/auth/token`)
      .then((data) => {
        navigate("/");
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);
  return !isLoading ? <>{children}</> : <></>;
}

export default RequireNotAuth;
