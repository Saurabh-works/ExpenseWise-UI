import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, TextField, MenuItem, colors } from "@mui/material";
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
  const email = localStorage.getItem("userData");

  useEffect(() => {
    fetchMonthlyData(year);
  }, [year]);

  const fetchMonthlyData = async () => {
    try {
      const email = localStorage.getItem("userData"); // Ensure you get email from localStorage
      if (!email) {
        console.error("User email not found in localStorage.");
        return;
      }

      const response = await axios.get(`https://expense-wise-api.vercel.app/api/monthly-spends`, {
      // const response = await axios.get(
      //   `http://localhost:5000/api/monthly-spends`,
      //   {
          params: {
            email: email, // Pass email properly
            year: year, // Pass the selected year
          },
        }
      );
      console.log("Monthly Spend Data:", response.data);
      setData(response.data); // Set the data for charting
    } catch (error) {
      console.error(
        "Error fetching monthly spend data:",
        error.response?.data || error.message
      );
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
              // "& fieldset": {
              //   borderColor: "gray", // Default border color
              // },
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
