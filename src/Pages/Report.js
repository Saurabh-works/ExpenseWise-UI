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
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, Print } from "@mui/icons-material"; // For pagination icons

const Report = () => {
  const currentMonth = new Date().getMonth() + 1; // Current month (1-based)
  const currentType = "expenses"; // Default type

  const [month, setMonth] = useState(currentMonth);
  const [type, setType] = useState(currentType);
  const [reportData, setReportData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Pagination
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page (default is 5)
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error handling state

  // Function to calculate total amount
  const calculateTotal = () => {
    return reportData.reduce((sum, item) => sum + item.amount, 0);
  };

  // Fetch data for the default month and type when the component loads
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state
      const email = localStorage.getItem("userData");

      if (!email) {
        setError("No user data found.");
        setLoading(false); // Stop loading
        return;
      }

      try {
        const response = await axios.get("https://expense-wise-api.vercel.app/api/reports", {
          params: { email, month, type },
        });
        setReportData(response.data);
      } catch (error) {
        console.error("Error fetching report data:", error);
        setError("Failed to fetch report data.");
      } finally {
        setLoading(false); // Stop loading
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

    setLoading(true); // Start loading
    setError(null); // Reset error state

    try {
      const response = await axios.get("https://expense-wise-api.vercel.app/api/reports", {
        params: { email, month, type },
      });
      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching report data:", error);
      setError("Failed to fetch report data.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Print function
  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank");

    // Get the HTML of the table you want to print
    const tableHtml = document.getElementById("report-table").outerHTML;

    // Write the content to the print window
    printWindow.document.write(`
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              padding: 10px;
              border: 1px solid #ddd;
              text-align: left;
            }
            th {
              background-color: #282826;
              color: #fff;
            }
            td {
              background-color: #fff;
            }
          </style>
        </head>
        <body>
          <h1 style="text-align: center;">Expense Report</h1>
          ${tableHtml}
        </body>
      </html>
    `);

    // Close the document and trigger the print
    printWindow.document.close();
    printWindow.print();
  };

  // Handle page change for pagination
  const handleChangePage = (direction) => {
    if (direction === "next") {
      setCurrentPage((prevPage) =>
        Math.min(prevPage + 1, Math.ceil(reportData.length / rowsPerPage) - 1)
      );
    } else if (direction === "previous") {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    }
  };

  // Handle changing rows per page
  const handleRowsPerPageChange = (e) => {
    const value = e.target.value;
    if (value === "all") {
      setRowsPerPage(reportData.length); // Show all rows
    } else {
      setRowsPerPage(Number(value)); // Set the selected rows per page
    }
    setCurrentPage(0); // Reset to the first page when rows per page changes
  };

  // Get data to show for the current page
  const currentData = reportData.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  return (
    <Box sx={{ padding: 4, backgroundColor: "#282826" }}>
      <Typography
        variant="h6"
        color="white"
        sx={{ paddingBottom: "3%", display: "flex", alignItems: "center" }}
      >
        <span style={{ borderBottom: "1px solid #F78D6A", margin: "auto" }}>
          Generate Report
        </span>
      </Typography>

      {/* Filter Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", gap: { xs: 1, sm: 1, md: 2 }, mb: 3 }}
      >
        {/* Month Dropdown */}
        <TextField
          label="Month"
          select
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "gray", // Border color on hover
              },
              "& .MuiSelect-select": {
                color: "white", // Ensures the default selected value appears white
              },
              "&.Mui-focused fieldset": {
                borderColor: "gray", // Border color when focused
              },
            },
            "& .MuiInputLabel-root": {
              color: "gray", // Default label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white", // Label color when focused
            },
          }}
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  backgroundColor: "#3e3e3e", // Dark background for dropdown
                  color: "white", // White text
                },
              },
            },
          }}
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
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "gray", // Border color on hover
              },
              "& .MuiSelect-select": {
                color: "white", // Ensures the default selected value appears white
              },
              "&.Mui-focused fieldset": {
                borderColor: "gray", // Border color when focused
              },
            },
            "& .MuiInputLabel-root": {
              color: "gray", // Default label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white", // Label color when focused
            },
          }}
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  backgroundColor: "#3e3e3e", // Dark background for dropdown
                  color: "white", // White text
                },
              },
            },
          }}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="expenses">Expenses</MenuItem>
          <MenuItem value="income">Income</MenuItem>
        </TextField>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="outlined"
          sx={{
            bgcolor: "#282826",
            color: "white",
            borderColor: "#F78D6A",
            "&:hover": { bgcolor: "#a3644e" },
            width: "15%",
          }}
        >
          Submit
        </Button>
      </Box>

      {/* Loading and Error Messages */}
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Report Table */}
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 400,
          backgroundColor: "#282826",
          border: "1px solid gray",
        }}
      >
        <Table id="report-table" sx={{ minWidth: 650 }} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#F78D6A", fontWeight: "bold" }}>
                Date
              </TableCell>
              <TableCell sx={{ color: "#F78D6A", fontWeight: "bold" }}>
                Description
              </TableCell>
              <TableCell sx={{ color: "#F78D6A", fontWeight: "bold" }}>
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: "white" }}>
                  {new Date(row.date).toLocaleDateString()}
                </TableCell>
                <TableCell sx={{ color: "white" }}>{row.description}</TableCell>
                <TableCell sx={{ color: "white" }}>{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Total Amount */}
      <Box sx={{ marginTop: 2, color: "white", textAlign: "center" }}>
        <Typography variant="h6">
          Total Amount: {calculateTotal()}
        </Typography>
      </Box>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
        <Button
          variant="text"
          color="primary"
          onClick={() => handleChangePage("previous")}
          disabled={currentPage === 0}
        >
          <ArrowBackIos />
        </Button>
        <Typography variant="body2" sx={{ alignSelf: "center", color: "white" }}>
          Page {currentPage + 1} of {Math.ceil(reportData.length / rowsPerPage)}
        </Typography>
        <Button
          variant="text"
          color="primary"
          onClick={() => handleChangePage("next")}
          disabled={currentPage >= Math.ceil(reportData.length / rowsPerPage) - 1}
        >
          <ArrowForwardIos />
        </Button>
      </Box>

      {/* Rows per page */}
      <Box sx={{ marginTop: 2 }}>
        <TextField
          label="Rows per page"
          select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          sx={{ backgroundColor: "#3e3e3e", color: "white", borderRadius: "5px", width: "20%" }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value="all">All</MenuItem>
        </TextField>
      </Box>

      {/* Print Button */}
      <Box sx={{ marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePrint}
          sx={{ backgroundColor: "#F78D6A" }}
        >
          <Print /> Print Report
        </Button>
      </Box>
    </Box>
  );
};

export default Report;
