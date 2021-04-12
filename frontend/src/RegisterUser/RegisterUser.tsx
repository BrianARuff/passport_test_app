import React, { useState } from "react";
import axios from "axios";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useCookies } from "react-cookie";

type IUserData = {
  username: string;
  password: string;
  email: string;
};

function RegisterUser(props: any) {
  const [userData, setUserData] = useState<IUserData>({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState({
    hasError: false,
    message: "",
    errorObject: {},
  });
  const [, setCookie] = useCookies();

  function handleUserData(e: React.BaseSyntheticEvent) {
    setUserData(() => ({ ...userData, [e.target.name]: e.target.value }));
  }

  function handleSubmitUserData(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    axios({
      method: "POST",
      data: { ...userData },
      withCredentials: true,
      url: "http://localhost:4000/register",
    })
      .then((res) => {
        if (res.data?.message) {
          setError(() => ({
            hasError: true,
            message: res.data.message,
            errorObject: res.data.error,
          }));
        } else {
          console.log(res.data);
          const { username, email, id } = res.data;
          setCookie("user", { username, email, id });
        }
      })
      .catch((err) => console.error(err));

    setTimeout(() => {
      setError({ hasError: false, message: "", errorObject: {} });
    }, 5000);
  }

  return (
    <>
      <form>
        <h4>Register</h4>
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
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={handleUserData}
          required
        />
        <button onClick={handleSubmitUserData}>Register User</button>
      </form>
      {error.hasError ? <ErrorMessage error={error} /> : null}
    </>
  );
}

export default RegisterUser;
