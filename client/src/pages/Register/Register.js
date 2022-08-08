import styles from "./Register.module.scss";
import classNames from "classnames/bind";
import Logo from "../../components/Logo";
import { useState } from "react";
import Button from "../../components/Button";
import userRequest from "../../httprequest/user";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as yup from "yup";
const schema = yup
  .object({
    password: yup
      .string()
      .required()
      .matches(
        "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})",
        "Password: minimum eight characters, at least one letter and one number"
      ),
    name: yup.string().required(),
    username: yup
      .string()
      .required()
      .matches(/^[a-z][a-z]+\d*$|^[a-z]\d\d+$/, "this username is not valid"),
    email: yup
      .string()
      .required()
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "This is not an email!"
      ),
  })
  .required();
const cx = classNames.bind(styles);
function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  function registerAction(data) {
    console.log(userRequest.createUser(data).then);
    userRequest
      .createUser(data)
      .then(() => {
        toast.success("Register success");
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("register-container")}>
          <Logo large={200}></Logo>
          <form
            className={cx("register-form")}
            onSubmit={handleSubmit(registerAction)}
          >
            <div className={cx("form-group")}>
              <input placeholder="email" {...register("email")}></input>
              <p className={cx("errors")}>{errors.email?.message}</p>
            </div>
            <div className={cx("form-group")}>
              {" "}
              <input placeholder="name" {...register("name")}></input>
              <p className={cx("errors")}>{errors.name?.message}</p>
            </div>
            <div className={cx("form-group")}>
              <input {...register("username")} placeholder="username"></input>
              <p className={cx("errors")}>{errors.username?.message}</p>
            </div>
            <div className={cx("form-group")}>
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  {...register("password")}
                ></input>
                <span
                  className={cx("password-ctr")}
                  onClick={handleShowPassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
              <p className={cx("errors")}>{errors.password?.message}</p>
            </div>{" "}
            <button className={cx("submit-btn")}>Register</button>
          </form>
          <div className={cx("barrier")}>
            <div className={cx("bar")}></div>
            <p>Or</p>
            <div className={cx("bar")}></div>
          </div>
          <div className={cx("register-with")}>
            <p>Login with Facebook</p>
          </div>
        </div>
        <div className={cx("register-suggest")}>
          <span>If you hava an account.</span>
          <Button to="/login">Login</Button>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}
export default Register;
