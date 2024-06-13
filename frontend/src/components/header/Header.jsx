import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogOutDialog from "../dialog/Dialog";
import Drawer from "@mui/material/Drawer";
import AppDrawer from "../drawer/AppDrawer";
import Divider from "@mui/material/Divider";
import CssBaseline from "@mui/material/CssBaseline";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../../hooks/getUser";
import { authAction } from "../../hooks/authAction";
import MobileHeader from "./MobileHeader";
import MainHeader from "./MainHeader";

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentUser } = getUser();
  const { handleLogoutAuth } = authAction();
  const [handleOpen, setHandleOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await handleLogoutAuth().then(() => {
      navigate("/login");
    });
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  return (
    <Box sx={{ flexGrow: 1, zIndex: 50 }}>
      <LogOutDialog
        isOpen={handleOpen}
        handleLogout={handleLogout}
        setIsOpen={setHandleOpen}
      />
      <CssBaseline />
      <AppBar>
        <Toolbar disableGutters sx={{ px: 1 }}>
          {/* mobile header view */}
          <MobileHeader
            open={open}
            toggleDrawer={toggleDrawer}
            setHandleOpen={setHandleOpen}
            navigate={navigate}
            currentUser={currentUser}
          />

          {/* main header view */}
          <MainHeader
            navigate={navigate}
            currentUser={currentUser}
            setHandleOpen={setHandleOpen}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
