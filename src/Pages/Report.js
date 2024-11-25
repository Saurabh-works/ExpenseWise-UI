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
        // const response = await axios.get("http://localhost:5000/api/reports", {
          params: { email, month, type },
        });
        console.log("API Response:", response.data);
        setReportData(response.data);
      } catch (error) {
        console.error(
          "Error fetching report data:",
          error.response?.data || error.message
        );
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
      // const response = await axios.get("http://localhost:5000/api/reports", {
        params: { email, month, type },
      });
      setReportData(response.data);
    } catch (error) {
      console.error(
        "Error fetching report data:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Failed to fetch report data.");
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
        sx={{ display: "flex", gap: {xs:1, sm:1, md:2}, mb: 3 }}
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

      {/* Report Table */}
      <TableContainer component={Paper}>
        <Table
          id="report-table"
          sx={{ backgroundColor: "#282826", border: "1px solid white" }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#F78D6A", backgroundColor: "#383838" }}>
                Date
              </TableCell>
              <TableCell sx={{ color: "#F78D6A", backgroundColor: "#383838" }}>
                Day
              </TableCell>
              <TableCell sx={{ color: "#F78D6A", backgroundColor: "#383838" }}>
                Category
              </TableCell>
              <TableCell sx={{ color: "#F78D6A", backgroundColor: "#383838" }}>
                Description
              </TableCell>
              <TableCell sx={{ color: "#F78D6A", backgroundColor: "#383838" }}>
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.length > 0 ? (
              <>
                {currentData.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell sx={{ color: "white" }}>
                      {new Date(item.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>{item.day}</TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {item.category}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {item.description}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      ₹ {item.amount}
                    </TableCell>
                  </TableRow>
                ))}
                {/* Total Row */}
                <TableRow style={{ backgroundColor: "#383838" }}>
                  <TableCell
                    colSpan={4}
                    align="right"
                    style={{ fontWeight: "bold", color: "#F78D6A" }}
                  >
                    Total:
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#F78D6A" }}>
                    {calculateTotal()} Rs /-
                  </TableCell>
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

      {/* Pagination and Print Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<Print sx={{fontSize:{xs:4, md:8}}}/>}
          onClick={handlePrint}
          sx={{
            bgcolor: "#282826",
            color: "white",
            borderColor: "#F78D6A",
            "&:hover": { bgcolor: "#a3644e" },
            fontSize:{xs:9, md:12}
          }}
        >
          Generate Report
        </Button>

        <Box>
          <Button>
            <TextField
              select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              // sx={{ color: "white", marginRight: 2 }}
              sx={{
                color: "white",
                marginRight: {xs:1, md:2},
                "& .MuiOutlinedInput-root": {
                  // "& fieldset": {
                  //   borderColor: "gray", // Default border color
                  // },
                  "& .MuiSelect-select": {
                    color: "white", // Ensures the default selected value appears white
                  },
                  "&:hover fieldset": {
                    borderColor: "gray", // Border color on hover
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
            >
              {[3, 5, 10, 20].map((rows) => (
                <MenuItem key={rows} value={rows}>
                  {rows} rows
                </MenuItem>
              ))}
              <MenuItem value="all" sx={{}}>Show All</MenuItem>{" "}
              {/* Add Show All option */}
            </TextField>
          </Button>

          <IconButton
            onClick={() => handleChangePage("previous")}
            disabled={currentPage === 0}
            sx={{}}
          >
            <ArrowBackIos sx={{ color: "#F78D6A", fontSize:{xs:15, md:22} }} />
          </IconButton>
          <IconButton
            onClick={() => handleChangePage("next")}
            disabled={
              currentPage >= Math.ceil(reportData.length / rowsPerPage) - 1
            }
          >
            <ArrowForwardIos sx={{ color: "#F78D6A", fontSize:{xs:15, md:22} }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Report;
