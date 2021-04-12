import LoginUser from "./LoginUser/LoginUser";
import NavBar from "./NavBar/NavBar";
import RegisterUser from "./RegisterUser/RegisterUser";
import { Route } from "react-router";
import MarketingPage from "./MarketingPage/MarketingPage";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

function App() {
  return (
    <Container style={{ padding: "0" }}>
      <Paper style={{ minHeight: "100vh" }}>
        <NavBar />
        <Route
          exact
          path="/"
          render={(props) => <MarketingPage {...props} />}
        />
        <Route
          exact
          path="/login"
          render={(props) => <LoginUser {...props} />}
        />
        <Route
          exact
          path="/register"
          render={(props) => <RegisterUser {...props} />}
        />
      </Paper>
    </Container>
  );
}

export default App;
