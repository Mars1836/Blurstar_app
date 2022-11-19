import React, { useEffect, useState } from "react";
import styles from "./Account.module.scss";
import classNames from "classnames/bind";
import Avatar from "~/components/Avatar";
import { useDispatch, useSelector } from "react-redux";
import userRequest from "~/httprequest/user";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { mainUserAction } from "~/store/actions/mainUserAction";
import Button from "~/components/Button";
import SetAvatar from "~/components/Model/components/SetAvatar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const cx = classNames.bind(styles);
const schema = yup.object().shape(
  {
    name: yup.string().required("Name is required!"),
    username: yup
      .string()
      .required("Username is required!")
      .matches(/^[a-z][^\W_]{5,14}$/, "This username is not valid"),
    email: yup.string().when("email", {
      is: (value) => value?.length,
      then: yup
        .string()
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "This email is not valid"
        ),
      otherwise: yup.string().min(0),
    }),
    phone: yup.string().when("phone", {
      is: (value) => value?.length, // alternatively: (val) => val == true
      then: yup
        .string()
        .matches(
          /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/,
          "This phone is not valid"
        ),
      otherwise: yup.string().min(0),
    }),
    bio: yup
      .string()
      .matches(/^[A-Za-z0-9_@./#&+-]{0,150}$/, "Max is 150 characters"),
    gender: yup.string(),
  },
  [
    // Add Cyclic deps here because when require itself
    ["phone", "phone"],
    ["email", "email"],
  ]
);
function AccountEdit() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [bioNum, setBioNum] = useState(0);
  const [submitActive, setSubmitActive] = useState(true);
  const ditpatch = useDispatch();
  const userUsername = useSelector((state) => {
    return state.mainUser?.data?.username;
  });
  const userGender = useSelector((state) => {
    return state.mainUser?.data?.gender;
  });

  const userAvatar = useSelector((state) => {
    return state.mainUser?.data?.avatar;
  });
  const userPhone = useSelector((state) => {
    return state.mainUser?.data?.phone;
  });
  const userName = useSelector((state) => {
    return state.mainUser?.data?.name;
  });
  const userEmail = useSelector((state) => {
    return state.mainUser?.data?.email;
  });
  const userBio = useSelector((state) => {
    return state.mainUser?.data?.bio;
  });
  const userId = useSelector((state) => {
    return state.mainUser?.data?._id;
  });
  useEffect(() => {
    setBioNum(userBio?.length || 0);
  }, [userId]);
  const onSubmit = (data) => {
    const a = userRequest.updateInfor(userId, data).then(() => {
      ditpatch(mainUserAction.updateInfor(data));
    });

    toast.promise(a, {
      pending: "Loading...",
      success: "Profile saved",
      error: "Error",
    });
  };

  return (
    <>
      <ToastContainer autoClose={1000} />
      {userId && (
        <div className={cx("grid")}>
          <div className={cx("row center")}>
            <div className={cx("col c-12 l-8 m-8")}>
              <div className={cx("wapper")}>
                <div className={cx("avatar_edit")}>
                  <div className={cx("avatar_edit_child_1")}>
                    <Avatar username={userUsername} url={userAvatar}></Avatar>
                  </div>
                  <div className={cx("avatar_edit_child_2")}>
                    <p className={cx("username")}>{userUsername}</p>
                    <Button
                      className={cx("btn_edit_avatar")}
                      dialog={<SetAvatar></SetAvatar>}
                    >
                      Change profile photo
                    </Button>
                  </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={cx("name_edit", "group_input")}>
                    <label className={cx("field")} htmlFor="name_field">
                      Name
                    </label>
                    <div className={cx("input_wrap")}>
                      <input
                        type="text"
                        className={cx("input")}
                        id="name_field"
                        {...register("name", {
                          value: userName,
                        })}
                      ></input>
                      <p className={cx("text-error")}>{errors.name?.message}</p>
                      <p className={cx("detail")}>
                        Help people discover your account by using the name
                        you're known by: either your full name, nickname, or
                        business name.
                      </p>
                      <p className={cx("detail")}>
                        You can only change your name twice within 14 days.
                      </p>
                    </div>
                  </div>
                  <div className={cx("username_edit", "group_input")}>
                    <label className={cx("field")} htmlFor="username_field">
                      Username
                    </label>
                    <div className={cx("input_wrap")}>
                      <input
                        type="text"
                        className={cx("input")}
                        name="username"
                        id="username_field"
                        {...register("username", { value: userUsername })}
                      ></input>
                      <p className={cx("text-error")}>
                        {errors.username?.message}
                      </p>
                      <p className={cx("detail")}>
                        In most cases, you'll be able to change your username
                        back to {userUsername} for another 14 days.
                      </p>
                    </div>
                  </div>
                  <div className={cx("bio_edit", "group_input")}>
                    <label className={cx("field")} htmlFor="bio_field">
                      Bio
                    </label>
                    <div className={cx("input_wrap")}>
                      <textarea
                        type="text"
                        className={cx("input", "textarea")}
                        name="bio"
                        id="bio_field"
                        {...register("bio", { value: userBio })}
                        onChange={(e) => {
                          setBioNum(e.target.value.length);
                        }}
                      ></textarea>

                      <p className={cx("text-error")}>{errors.bio?.message}</p>
                      <p
                        className={cx("detail")}
                        style={bioNum > 150 ? { color: "red" } : {}}
                      >
                        {bioNum}/150
                      </p>
                    </div>
                  </div>
                  <div className={cx("input_wrap")}>
                    <p className={cx("detail_title")}>Personal information</p>
                    <p className={cx("detail")}>
                      Provide your personal information, even if the account is
                      used for a business, a pet or something else. This won't
                      be a part of your public profile
                    </p>
                  </div>
                  <div className={cx("email_edit", "group_input")}>
                    <label className={cx("field")} htmlFor="email_field">
                      Email
                    </label>
                    <div className={cx("input_wrap")}>
                      <input
                        type="text"
                        className={cx("input")}
                        name="email"
                        id="email_field"
                        {...register("email", { value: userEmail })}
                      ></input>
                      <p className={cx("text-error")}>
                        {errors.email?.message}
                      </p>
                    </div>
                  </div>
                  <div className={cx("phone_edit", "group_input")}>
                    <label className={cx("field")} htmlFor="phone_field">
                      Phone
                    </label>
                    <div className={cx("input_wrap")}>
                      <input
                        type="text"
                        className={cx("input")}
                        name="phone"
                        id="phone_field"
                        {...register("phone", { value: userPhone })}
                      ></input>
                      <p className={cx("text-error")}>
                        {errors.phone?.message}
                      </p>
                    </div>
                  </div>
                  <div className={cx("gender_edit", "group_input")}>
                    <label className={cx("field")} htmlFor="gender_field">
                      Gender
                    </label>
                    <div className={cx("input_wrap")}>
                      <input
                        type="text"
                        className={cx("input")}
                        name="gender"
                        id="gender_field"
                        {...register("gender", { value: userGender })}
                      ></input>
                    </div>
                  </div>
                  <div className={cx("input_wrap")}>
                    <input
                      type="submit"
                      value="Submit"
                      className={cx("submit_btn")}
                      disabled={!submitActive}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AccountEdit;
