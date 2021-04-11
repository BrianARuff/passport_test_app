import React, { useState } from "react";

type IUserData = {
  username: string;
  password: string;
  email: string;
};

function LoginUser() {
  const [userData, setUserData] = useState<IUserData>({
    username: "",
    password: "",
    email: "",
  });

  function handleUserData(e: React.BaseSyntheticEvent) {
    setUserData(() => ({ ...userData, [e.target.name]: e.target.value }));
  }

  function handleSubmitUserData(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    console.log("handle logUser");
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
      <input
        type="email"
        name="email"
        placeholder="email"
        onChange={handleUserData}
        required
      />
      <button onClick={handleSubmitUserData}>Login User</button>
    </form>
  );
}

export default LoginUser;
