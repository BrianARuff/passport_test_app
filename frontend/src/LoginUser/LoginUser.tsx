import React, { useState } from "react";
import axios from "axios";
import { Cookies, useCookies } from "react-cookie";
import { Typography } from "@material-ui/core";
import LogoutButton from "../Logout/Logout";

type IUserData = {
  username: string;
  password: string;
};

function LoginUser(props: any) {
  const [userData, setUserData] = useState<IUserData>({
    username: "",
    password: "",
  });
  const [, setCookie] = useCookies(["user"]);

  function handleUserData(e: React.BaseSyntheticEvent) {
    setUserData(() => ({ ...userData, [e.target.name]: e.target.value }));
  }

  function handleSubmitUserData(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    const cookies = new Cookies();
    axios({
      method: "POST",
      data: { ...userData },
      withCredentials: true,
      url: "http://localhost:4000/login",
    })
      .then((res) => {
        const { username, email, id } = res.data;
        setCookie("user", { username, email, id });
        console.log(res.data.username, cookies.get("user").username);
        if (res.data.username === cookies.get("user").username) {
          props.setValidUser(true);
        } else {
          props.setValidUser(false);
        }
      })
      .catch((err) => console.error(err));
  }
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.validUser ? (
        <div>
          <Typography variant="h4" component="h4">
            You are already Logged In
          </Typography>
          <LogoutButton
            setValidUser={props.setValidUser}
            to="/login"
            color="secondary"
          />
        </div>
      ) : (
        <form>
          <h4>Login</h4>
          <input
            name="username"
            type="text"
            placeholder="username"
            onChange={handleUserData}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleUserData}
            required
          />
          <button onClick={handleSubmitUserData}>Login Your Account</button>
        </form>
      )}
    </div>
  );
}

export default LoginUser;
