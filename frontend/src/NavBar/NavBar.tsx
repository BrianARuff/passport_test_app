import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "@material-ui/core/Link";
import { Link as RouteLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div style={{ flex: "1" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            style={{ marginRight: "20px" }}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography style={{ flex: "1", margin: "0 auto" }} variant="h6">
            News
          </Typography>
          <Button color="inherit">
            <Link color="inherit" to="/login" component={RouteLink}>
              Login
            </Link>
          </Button>
          <Button color="inherit">
            <Link color="inherit" to="/register" component={RouteLink}>
              Register
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
