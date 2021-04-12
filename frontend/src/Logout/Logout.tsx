import { useCookies } from "react-cookie";

export default function LogoutButton() {
  const [, , removeCookie] = useCookies(["user"]);
  function handleLogout() {
    removeCookie("user");
    console.log("User cookie removed");
  }
  return <button onClick={handleLogout}>Log out of Application</button>;
}
