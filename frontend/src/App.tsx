import LoginUser from "./LoginUser/LoginUser";
import NavBar from "./NavBar/NavBar";
import RegisterUser from "./RegisterUser/RegisterUser";
import { Route } from "react-router";

function App() {
  return (
    <>
      <NavBar />
      <Route path="/login" render={(props) => <LoginUser {...props} />} />
      <Route path="/register" render={(props) => <RegisterUser {...props} />} />
    </>
  );
}

export default App;
