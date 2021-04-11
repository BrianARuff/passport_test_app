import "./App.css";
import GetUser from "./GetUser";
import LoginUser from "./LoginUser";
import RegisterUser from "./RegisterUser";

function App() {
  return (
    <div className="App">
      <hr />
      <RegisterUser />
      <hr />
      <LoginUser />
      <hr />
      <GetUser />
      <hr />
    </div>
  );
}

export default App;
