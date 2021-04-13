import { useCookies } from "react-cookie";
import { Link as RouteLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

export default function LogoutButton(props: any) {
  const [, , removeCookie] = useCookies(["user"]);
  function handleSetValidUser() {
    removeCookie("user");
    console.log("User cookie removed");
    props.setValidUser(false);
  }
  return (
    <Button
      variant="contained"
      onClick={handleSetValidUser}
      color={props.color || "inherit"}
    >
      <Link color="inherit" to={props.to || "/"} component={RouteLink}>
        Logout
      </Link>
    </Button>
  );
}
