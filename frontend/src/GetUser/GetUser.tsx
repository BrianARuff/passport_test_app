import { Cookies, withCookies } from "react-cookie";

function GetUser() {
  const cookieObj = new Cookies();
  function handleShowUser() {
    console.log(cookieObj.get("user"));
  }
  return (
    <section>
      <h4>Get User</h4>
      <button onClick={handleShowUser}>Submit to Get User</button>
    </section>
  );
}

export default withCookies(GetUser);
