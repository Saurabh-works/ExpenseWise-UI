import React, { useState } from "react";
import { Box, List, ListItem, ListItemText, ListItemIcon, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaidIcon from "@mui/icons-material/Paid";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BarChartIcon from "@mui/icons-material/BarChart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import userImage from "../Assets/Avatar.png"; // Imported directly

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();  // To get the current route

  const [username, setUsername] = useState("Saurabh Shinde"); // Replace with dynamic data from user

  const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { label: "Expenses", path: "/expenses", icon: <PaidIcon /> },
    { label: "Income", path: "/income", icon: <AccountBalanceWalletIcon /> },
    { label: "Report", path: "/report", icon: <BarChartIcon /> },
    { label: "Alert", path: "/alert", icon: <NotificationsIcon /> },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    onClose(); // Close sidebar after navigation
  };

  // Determine the active route
  const getActiveClass = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <Box
      sx={{
        width: "250px",
        bgcolor: "#383838",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        paddingTop: 2,
        position: "fixed",
        height: "100vh",
        paddingLeft: 2,
        paddingRight: 2,
        paddingBottom: 2,
      }}
    >
      {/* Profile Image and Username */}
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            overflow: "hidden",
            margin: "0 auto 10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <img
            src={userImage}
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
        <Typography variant="h6" color="#ffffff">
          {username}
        </Typography>
      </Box>

      {/* Menu Items */}
      <List sx={{ padding: 0 }}>
        {menuItems.map(({ label, path, icon }) => (
          <ListItem
            key={label}
            button
            onClick={() => handleNavigation(path)}
            sx={{
              padding: "10px 20px",
              "&:hover": {
                bgcolor: "#5C5A5A",
                color: "#F78D6A",
              },
              backgroundColor: getActiveClass(path) ? "#5C5A5A" : "transparent",
              color: getActiveClass(path) ? "#F78D6A" : "inherit",
              borderRadius: 1,
            }}
          >
            <ListItemIcon
              sx={{
                color: getActiveClass(path) ? "#F78D6A" : "inherit",
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
