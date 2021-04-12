import React from "react";
import GetUser from "./GetUser/GetUser";
import LoginUser from "./LoginUser/LoginUser";
import LogoutButton from "./Logout/Logout";
import NavBar from "./NavBar/NavBar";
import RegisterUser from "./RegisterUser/RegisterUser";

function App() {
  return (
    <>
      <NavBar />
      <RegisterUser />
      <LoginUser />
      <GetUser />
      <LogoutButton />
    </>
  );
}

export default App;
