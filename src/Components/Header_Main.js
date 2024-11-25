// components/Header_Main.js
import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Box, CssBaseline } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/logo-Photoroom.jpg"; // Ensure path is correct

const Header_Main = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "#282826",
          color: "#ffffff",
          width: "100%",
          paddingY: { xs: "2%", sm: "2%", md: "2%" },
        }}
      >
        <AppBar
          position="static"
          sx={{
            bgcolor: "#282826",
            borderBottom: "2px solid #F78D6A",
            boxShadow: "none",
            padding: { xs: "1px", sm: "1%" },
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* Sidebar Toggle Icon, Logo, and Website Name */}
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <IconButton edge="start" color="inherit" onClick={toggleSidebar} sx={{ marginRight: {xs:0, md:1} }}>
                <MenuIcon sx={{fontSize:{sx:35, sm: 35, md:40, }, color:"#F78D6A"}}/>
              </IconButton>
              <img
                src={logo}
                alt="ExpenseWise Logo"
                style={{ height: "40px"}}
              />
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold", color: "#F78D6A", marginLeft:{xs:"2px", md:"10px"}, fontSize:{xs:"100%", md:"150%"} }}
              >
                ExpenseWise
              </Typography>
            </Box>

            {/* Logout Button */}
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{
                bgcolor: "#F78D6A",
                color: "#ffffff",
                fontWeight: "bold",
                paddingY: {xs:"4px", md:1},
                paddingX: {xs:"6px", md:3},
                "&:hover": { bgcolor: "#a3644e" },
                fontSize:{xs:"80%", sm:"80%", md:"90%"},
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header_Main;
