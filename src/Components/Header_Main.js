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
          padding: { xs: "5%", sm: "3%", md: "2%" },
        }}
      >
        <AppBar
          position="static"
          sx={{
            bgcolor: "#282826",
            borderBottom: "2px solid #F78D6A",
            boxShadow: "none",
            padding: { xs: "5px", sm: "1%" },
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* Sidebar Toggle Icon, Logo, and Website Name */}
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <IconButton edge="start" color="inherit" onClick={toggleSidebar} sx={{ marginRight: 1 }}>
                <MenuIcon sx={{fontSize:40, color:"#F78D6A"}}/>
              </IconButton>
              <img
                src={logo}
                alt="ExpenseWise Logo"
                style={{ height: "40px", marginRight: "10px" }}
              />
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold", color: "#F78D6A" }}
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
                paddingY: 1,
                paddingX: 3,
                "&:hover": { bgcolor: "#a3644e" },
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
