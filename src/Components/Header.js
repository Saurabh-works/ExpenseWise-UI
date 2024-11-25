import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
} from "@mui/material";

// Import logo from Assets
import logo from "../Assets/logo-Photoroom.jpg"; // Ensure path is correct

const Header = () => {
  return (
    <>
      <CssBaseline />

      {/* Header Box */}
      <Box
        sx={{
          bgcolor: "#282826",
          color: "#ffffff",
          width: "100%",  // Full width but only takes required height
          padding: { xs: "5%", sm: "3%", md: "2%" },
        }}
      >
        <AppBar
          position="static"
          sx={{
            bgcolor: "#282826",
            borderBottom: "2px solid #F78D6A",
            boxShadow: 0,
            padding: { xs: "3px", sm: "1%" },
          }}
        >
          <Toolbar>
            {/* Logo and Website Name */}
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
              <img
                src={logo}
                alt="ExpenseWise Logo"
                style={{ height: "40px", marginRight: "10px" }}
              />
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold", fontSize:{xs:"100%"} }}
              >
                <span style={{ color: "#F78D6A" }}>Expense</span>Wise
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
