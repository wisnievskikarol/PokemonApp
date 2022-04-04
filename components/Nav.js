import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Logo from "../img/logo.png";
export default function Nav() {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "109px", boxShadow: "none" }}>
      <AppBar elevation={0} position="fixed">
        <Toolbar sx={{ backgroundColor: "#0093AB" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Link to={`/`}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <img style={{ width: "100px" }} src={Logo}></img>
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
