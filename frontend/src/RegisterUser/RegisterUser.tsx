import React, { useState } from "react";
import axios from "axios";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useCookies, withCookies } from "react-cookie";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

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
    }, 3000);
  }

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexFlow: "column wrap",
          justifyContent: "center",
          alignItems: "center",
          margin: "1.25rem auto",
          width: "500px",
        }}
      >
        {error.hasError ? <ErrorMessage error={error} /> : null}
        <Typography variant="h2" component="h2">
          Register
        </Typography>
        <div>
          <Input
            name="username"
            type="text"
            placeholder="Enter your username here..."
            onChange={handleUserData}
            required
            style={{
              width: "500px",
            }}
          />
        </div>
        <div>
          <Input
            type="password"
            name="password"
            placeholder="Type in your password here..."
            onChange={handleUserData}
            required
            style={{
              width: "500px",
            }}
          />
        </div>
        <div>
          <Input
            type="email"
            name="email"
            placeholder="Insert your email address here..."
            onChange={handleUserData}
            required
            style={{
              width: "500px",
            }}
          />
        </div>
        <Button
          color="primary"
          variant="contained"
          onClick={handleSubmitUserData}
          style={{
            margin: "1.25rem",
            width: "500px",
          }}
        >
          Register User
        </Button>
      </form>
    </div>
  );
}

export default withCookies(RegisterUser);
