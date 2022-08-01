import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
const apiRoute = {
  tokenAuth: "/auth/token",
};
const useTokenAuth = async () => {
  const [user, setUser] = useState();
  const instance = useAxiosPrivate();
  let data = await instance.post(`${apiRoute.tokenAuth}`);
  return data;
};
export default useTokenAuth;
