import { useEffect } from "react";
import instance from "../configs/axios";
import { useAuth } from "../services/auth";
const useAxiosPrivate = () => {
  const auth = useAuth();
  useEffect(() => {
    instance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = auth?.tokenOj?.token;
        }
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );
  }, []);
  return instance;
};
export default useAxiosPrivate;
