import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, TextField, MenuItem, Alert } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlySpends = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState([]);
  const [alertMessage, setAlertMessage] = useState(""); // State to handle alert message
  const [alertSeverity, setAlertSeverity] = useState(""); // State to handle severity (success/error)
  const email = localStorage.getItem("userData");

  useEffect(() => {
    fetchMonthlyData(year);
  }, [year]);

  const fetchMonthlyData = async () => {
    try {
      const email = localStorage.getItem("userData"); // Ensure you get email from localStorage
      if (!email) {
        setAlertMessage("User not logged in.");
        setAlertSeverity("error");
        setTimeout(() => setAlertMessage(""), 5000); // Auto close after 5 seconds
        return;
      }

      const response = await axios.get(`https://expense-wise-api.vercel.app/api/monthly-spends`, {
        params: {
          email: email, // Pass email properly
          year: year, // Pass the selected year
        },
      });
      console.log("Monthly Spend Data:", response.data);
      setData(response.data); // Set the data for charting
      setAlertMessage("Monthly data fetched successfully!");
      setAlertSeverity("success");
      setTimeout(() => setAlertMessage(""), 5000); // Auto close after 5 seconds
    } catch (error) {
      console.error(
        "Error fetching monthly spend data:",
        error.response?.data || error.message
      );
      setAlertMessage(error.response?.data?.message || "Failed to fetch monthly spends.");
      setAlertSeverity("error");
      setTimeout(() => setAlertMessage(""), 5000); // Auto close after 5 seconds
    }
  };

  const chartData = {
    labels: [
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
    ],
    datasets: [
      {
        label: "Total Spend ( ₹ )",
        data: data,
        backgroundColor: "#F78D6A",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white", // Make legend text white
        },
      },
      title: {
        display: true,
        text: `Monthly Spends for ${year}`,
        color: "white", // Make title text white
        font: {
          size: 18, // Optional: adjust font size
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white", // Make X-axis labels white
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Optional: make grid lines lighter
        },
      },
      y: {
        ticks: {
          color: "white", // Make Y-axis labels white
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Optional: make grid lines lighter
        },
      },
    },
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Alert message at the top-center */}
      {alertMessage && (
        <Alert
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
      )}

      <Typography variant="h5" color="primary" sx={{ mb: 3, color: "white" }}>
        Monthly Spends :
      </Typography>

      {/* Year Selector */}
      <Box sx={{ mb: 1, width: 200 }}>
        <TextField
          label="Year"
          select
          fullWidth
          sx={{
            color: "white",
            marginRight: 2,
            "& .MuiOutlinedInput-root": {
              "& .MuiSelect-select": {
                color: "white", // Ensures the default selected value appears white
              },
              "& input": {
                color: "white", // Ensure input text is white
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
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          {[...Array(5)].map((_, i) => {
            const y = new Date().getFullYear() - i;
            return (
              <MenuItem key={y} value={y} sx={{ color: "white" }}>
                {y}
              </MenuItem>
            );
          })}
        </TextField>
      </Box>

      {/* Bar Chart */}
      <Bar sx={{ color: "white" }} data={chartData} options={chartOptions} />
    </Box>
  );
};

export default MonthlySpends;
