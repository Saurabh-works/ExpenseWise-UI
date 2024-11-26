import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Snackbar
} from "@mui/material";

const RecentExpenses = () => {
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [alertMessage, setAlertMessage] = useState(""); // State to handle alert message
  const [alertSeverity, setAlertSeverity] = useState(""); // State to handle severity (success/error)
  const [openSnackbar, setOpenSnackbar] = useState(false); // State to handle Snackbar visibility

  useEffect(() => {
    const fetchRecentExpenses = async () => {
      const email = localStorage.getItem("userData");

      if (!email) {
        setAlertMessage("User not logged in.");
        setAlertSeverity("error");
        setOpenSnackbar(true); // Show the Snackbar for error
        return;
      }

      try {
        const currentMonth = new Date().getMonth() + 1; // 1-based month
        const response = await axios.get("https://expense-wise-api.vercel.app/api/recent-expenses", {
        // const response = await axios.get("http://localhost:5000/api/recent-expenses", {
          params: { email },
        });

        setRecentExpenses(response.data);
        setAlertMessage("Recent expenses fetched successfully!");
        setAlertSeverity("success");
        setOpenSnackbar(true); // Show the Snackbar for success
      } catch (error) {
        console.error("Error fetching recent expenses:", error.response?.data || error.message);
        setAlertMessage(error.response?.data?.message || "Failed to fetch recent expenses.");
        setAlertSeverity("error");
        setOpenSnackbar(true); // Show the Snackbar for error
      }
    };

    fetchRecentExpenses();
  }, []);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false); // Close Snackbar when autoHideDuration expires or user manually closes
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Snackbar with auto-close functionality */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Auto-close after 6 seconds
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={alertSeverity} // 'success' or 'error'
          variant="outlined" // Outlined variant
          sx={{
            width: "50%", // Smaller width
            margin: "10px auto", // Center it with margin
            fontSize: { xs: "0.8rem", sm: "0.9rem" }, // Small font size
            borderColor: alertSeverity === "error" ? "#d32f2f" : "#388e3c", // Customize border color based on severity
            color: alertSeverity === "error" ? "#d32f2f" : "#388e3c", // Customize text color based on severity
          }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>

      <Typography variant="h5" color="primary" sx={{ mb: 2, color: "white" }}>
        Recent Expenses :
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ backgroundColor: "#282826", border: "1px solid white" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#F78D6A", backgroundColor: "#383838" }}>Date</TableCell>
              <TableCell sx={{ color: "#F78D6A", backgroundColor: "#383838" }}>Category</TableCell>
              <TableCell sx={{ color: "#F78D6A", backgroundColor: "#383838" }}>Description</TableCell>
              <TableCell sx={{ color: "#F78D6A", backgroundColor: "#383838" }}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentExpenses.length > 0 ? (
              recentExpenses.map((item) => (
                <TableRow key={item._id}>
                  <TableCell sx={{ color: "white" }}>{new Date(item.date).toLocaleDateString()}</TableCell>
                  <TableCell sx={{ color: "white" }}>{item.category}</TableCell>
                  <TableCell sx={{ color: "white" }}>{item.description}</TableCell>
                  <TableCell sx={{ color: "white" }}>₹ {item.amount}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No recent expenses found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RecentExpenses;
