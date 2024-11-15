import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header_Main from "./Header_Main";
import Footer from "./Footer";
import { Box } from "@mui/material";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", position: "relative" }}>
      {/* Sidebar */}
      {isSidebarOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "250px", // Adjust width as needed
            bgcolor: "#383838",
            zIndex: 1200, // Higher than AppBar to overlap it
          }}
          onClick={(e) => e.stopPropagation()} // Prevents closing sidebar when clicking inside it
        >
          <Sidebar onClose={closeSidebar} />
        </Box>
      )}

      {/* Container for Header, Main Content, and Footer */}
      <Box
        sx={{
          flexGrow: 1,
          ml: isSidebarOpen ? "250px" : "0", // Shift to the right when sidebar is open
          transition: "margin-left 0.3s ease", // Smooth transition for sidebar open/close
          width: "100%", // Ensures it spans the full width
        }}
      >
        {/* Header */}
        <Header_Main toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <Box component="main" sx={{ p: 3, bgcolor: "#f5f5f5" }} onClick={closeSidebar}>
          {children}
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
