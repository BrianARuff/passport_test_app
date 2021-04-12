import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

type IUserData = {
  username: string;
  password: string;
};

function LoginUser() {
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
    axios({
      method: "POST",
      data: { ...userData },
      withCredentials: true,
      url: "http://localhost:4000/login",
    })
      .then((res) => {
        const { username, email, id } = res.data;
        setCookie("user", { username, email, id });
      })
      .catch((err) => console.error(err));
  }
  return (
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
      <button onClick={handleSubmitUserData}>Login User</button>
    </form>
  );
}

export default LoginUser;
