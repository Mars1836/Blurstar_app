import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import Logo from "../../components/Logo";
import Button from "../../components/Button";
import { useState } from "react";
import authRequest from "../../httprequest/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/auth";
import Cookies from "universal-cookie";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});
function Login() {
  const [isBtnSubmitdDisable, setIsBtnSubmitdDisable] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const cx = classNames.bind(styles);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const cookies = new Cookies();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmitLogin = (data) => {
    const { username, password } = data;
    authRequest
      .login(username, password)
      .then((res) => {
        return res.data;
      })
      .then((tokenOj) => {
        if (tokenOj) {
          cookies.set("token", tokenOj.token);
          cookies.set("refreshToken", tokenOj.refreshToken);
          auth.login(tokenOj);
          navigate("/");
        }
      })
      .catch(({ response }) => {
        toast.error(response.data);
      });
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("login-container")}>
          <Logo large={200}></Logo>
          <form
            className={cx("login-form")}
            onSubmit={handleSubmit(handleSubmitLogin)}
            onChange={() => {
              if (isValid) {
                setIsBtnSubmitdDisable(false);
              } else {
                setIsBtnSubmitdDisable(true);
              }
            }}
          >
            <div>
              <input placeholder="username" {...register("username")}></input>
            </div>
            <div>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="password"
              ></input>
              <span className={cx("password-ctr")} onClick={handleShowPassword}>
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            <button
              type="submit"
              className={cx("submit-btn")}
              disabled={isBtnSubmitdDisable}
            >
              Log in
            </button>
          </form>
          <div className={cx("barrier")}>
            <div className={cx("bar")}></div>
            <p>Or</p>
            <div className={cx("bar")}></div>
          </div>
          <div className={cx("login-with")}>
            <p>Login with Facebook</p>
          </div>
          <a href="#" className={cx("fg-pass")}>
            Forgot password
          </a>
        </div>
        <div className={cx("register-suggest")}>
          <span>If you havent account.</span>
          <Button to="/register">Register</Button>
        </div>
      </div>
      <ToastContainer autoClose={2000}></ToastContainer>
    </div>
  );
}
export default Login;
