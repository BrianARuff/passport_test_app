import LoginUser from "./LoginUser/LoginUser";
import NavBar from "./NavBar/NavBar";
import RegisterUser from "./RegisterUser/RegisterUser";
import { Route } from "react-router";
import MarketingPage from "./MarketingPage/MarketingPage";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { Cookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const cookies = new Cookies();
  const [validUser, setValidUser] = useState(false);
  useEffect(() => {
    axios({
      method: "POST",
      url: "http://localhost:4000/user",
      withCredentials: true,
      data: {
        username: cookies.get("user")?.username,
        id: cookies.get("user")?.id,
      },
    })
      .then((res) => {
        if (res.data?.username?.id === cookies.get("user")?.username?.id) {
          console.log("logged in");
          setValidUser(true);
        } else {
          setValidUser(false);
        }
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <Container style={{ padding: "0" }}>
      <Paper style={{ minHeight: "100vh" }}>
        <NavBar validUser={validUser} setValidUser={setValidUser} />
        <Route
          exact
          path="/"
          render={(props) => (
            <MarketingPage
              validUser={validUser}
              setValidUser={setValidUser}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={(props) => (
            <LoginUser
              validUser={validUser}
              setValidUser={setValidUser}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/register"
          render={(props) => (
            <RegisterUser
              validUser={validUser}
              setValidUser={setValidUser}
              {...props}
            />
          )}
        />
      </Paper>
    </Container>
  );
}

export default App;
