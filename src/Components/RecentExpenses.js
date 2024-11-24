import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const RecentExpenses = () => {
  const [recentExpenses, setRecentExpenses] = useState([]);

  useEffect(() => {
    const fetchRecentExpenses = async () => {
      const email = localStorage.getItem("userData");

      if (!email) {
        alert("User not logged in.");
        return; 
      }

      try {
        const currentMonth = new Date().getMonth() + 1; // 1-based month
        const response = await axios.get("https://expense-wise-api.vercel.app/api/recent-expenses", {
        // const response = await axios.get("http://localhost:5000/api/recent-expenses", {
          params: { email },
        });

        setRecentExpenses(response.data);
      } catch (error) {
        console.error("Error fetching recent expenses:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Failed to fetch recent expenses.");
      }
    };

    fetchRecentExpenses();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" color="primary" sx={{ mb: 2, color:"white" }}>
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
