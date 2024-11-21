import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Report = () => {
  const currentMonth = new Date().getMonth() + 1; // Current month (1-based)
  const currentType = "expenses"; // Default type

  const [month, setMonth] = useState(currentMonth);
  const [type, setType] = useState(currentType);
  const [reportData, setReportData] = useState([]);

  // Function to calculate total amount
  const calculateTotal = () => {
    return reportData.reduce((sum, item) => sum + item.amount, 0);
  };

  // Fetch data for the default month and type when the component loads
  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem("userData");

      if (!email) {
        alert("No user data found.");
        return;
      }

      try {
        const response = await axios.get("https://expense-wise-api.vercel.app/api/reports", {
          params: { email, month, type },
        });
        console.log("API Response:", response.data);
        setReportData(response.data);
      } catch (error) {
        console.error("Error fetching report data:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Failed to fetch report data.");
      }
    };

    fetchData();
  }, [month, type]); // Trigger fetch when month or type changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("userData");

    if (!email || !month || !type) {
      alert("Please select all fields.");
      return;
    }

    try {
      const response = await axios.get("https://expense-wise-api.vercel.app/api/reports", {
        params: { email, month, type },
      });
      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching report data:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to fetch report data.");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
        Generate Report
      </Typography>

      {/* Filter Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 2, mb: 3 }}>
        {/* Month Dropdown */}
        <TextField
          label="Month"
          select
          fullWidth
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((month, index) => (
            <MenuItem key={index} value={index + 1}>
              {month}
            </MenuItem>
          ))}
        </TextField>

        {/* Type Dropdown */}
        <TextField
          label="Type"
          select
          fullWidth
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="expenses">Expenses</MenuItem>
          <MenuItem value="income">Income</MenuItem>
        </TextField>

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>

      {/* Report Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Day</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportData.length > 0 ? (
              <>
                {reportData.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                    <TableCell>{item.day}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                  </TableRow>
                ))}
                {/* Total Row */}
                <TableRow>
                  <TableCell colSpan={4} align="right" style={{ fontWeight: "bold" }}>
                    Total:
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>{calculateTotal()}</TableCell>
                </TableRow>
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Report;
