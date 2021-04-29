import { useState } from "react";
import { AppDispatch } from "../store";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import Sidebar from "./Sidebar";
import {
  fetchAsynclogout,
  selectLoginUser,
} from "../../features/auth/authSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const [Status, SetStatus] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const classes = useStyles();
  const loginuser = useSelector(selectLoginUser);

  const toggleMenu = (status: any) => {
    SetStatus(status);
  };

  return (
    <>
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => toggleMenu(!Status)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}></Typography>
            <Button
              color="inherit"
              onClick={() => dispatch(fetchAsynclogout(loginuser))}
            >
              {loginuser.map((login, index) => (
                <div key={index}>
                  <div>
                    {login.token == "" || "ログインしてください" ? (
                      <div></div>
                    ) : (
                      <div>ログアウト</div>
                    )}
                  </div>
                </div>
              ))}
            </Button>
          </Toolbar>
        </AppBar>
        <div>
          {Status ? (
            <Sidebar onClick={toggleMenu} status={Status}></Sidebar>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
