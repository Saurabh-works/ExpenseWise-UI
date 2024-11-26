import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, TextField, MenuItem, Alert } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DailySpends = () => {
  const getCurrentWeek = () => {
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startOfYear) / (1000 * 60 * 60 * 24));
    return Math.ceil((days + 1) / 7); // Calculate the current week number
  };

  const [week, setWeek] = useState(getCurrentWeek());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [dailyData, setDailyData] = useState([]);
  const [totalSpend, setTotalSpend] = useState(0);
  const [alertMessage, setAlertMessage] = useState(""); // Alert message state
  const [alertSeverity, setAlertSeverity] = useState(""); // Alert severity state
  const email = localStorage.getItem("userData");

  useEffect(() => {
    fetchWeeklyData(email, year, month, week);
  }, [week, month, year]);

  const fetchWeeklyData = async (email, selectedYear, selectedMonth, selectedWeek) => {
    try {
      const response = await axios.get("https://expense-wise-api.vercel.app/api/daily-spends", {
        params: {
          email,
          year: selectedYear,
          month: selectedMonth,
          week: selectedWeek,
        },
      });

      setDailyData(response.data.dailySpends);
      setTotalSpend(response.data.totalSpend);
      setAlertMessage("Data fetched successfully!");
      setAlertSeverity("success");
    } catch (error) {
      console.error("Error fetching daily spend data:", error.response?.data || error.message);
      setAlertMessage("Failed to fetch data. Please try again.");
      setAlertSeverity("error");
    }
  };

  const chartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Daily Spend ( ₹ )",
        data: dailyData,
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
        text: `Daily Spend for Week ${week}, ${month} ${year}`,
        color: "white", // Make title text white
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
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
        Weekly Spending:
      </Typography>

      {/* Year, Month, Week Selector */}
      <Box sx={{ mb: 4, display: "flex", gap: 2 }}>
        <TextField
          label="Year"
          select
          value={year}
          sx={{
            color: "white",
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "gray",
              },
              "& .MuiSelect-select": {
                color: "white", // Ensures the default selected value appears white
              },
              "&.Mui-focused fieldset": {
                borderColor: "gray",
              },
            },
            "& .MuiInputLabel-root": {
              color: "gray",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white",
            },
          }}
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  backgroundColor: "#3e3e3e",
                  color: "white",
                },
              },
            },
          }}
          onChange={(e) => setYear(e.target.value)}
          fullWidth
        >
          {[...Array(5)].map((_, i) => {
            const y = new Date().getFullYear() - i;
            return (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            );
          })}
        </TextField>

        <TextField
          label="Month"
          select
          value={month}
          sx={{
            color: "white",
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "gray",
              },
              "& .MuiSelect-select": {
                color: "white", // Ensures the default selected value appears white
              },
              "&.Mui-focused fieldset": {
                borderColor: "gray",
              },
            },
            "& .MuiInputLabel-root": {
              color: "gray",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white",
            },
          }}
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  backgroundColor: "#3e3e3e",
                  color: "white",
                },
              },
            },
          }}
          onChange={(e) => setMonth(e.target.value)}
          fullWidth
        >
          {[
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December",
          ].map((monthName, index) => (
            <MenuItem key={index} value={index + 1}>
              {monthName}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Week"
          select
          value={week}
          sx={{
            color: "white",
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "gray",
              },
              "& .MuiSelect-select": {
                color: "white", // Ensures the default selected value appears white
              },
              "&.Mui-focused fieldset": {
                borderColor: "gray",
              },
            },
            "& .MuiInputLabel-root": {
              color: "gray",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white",
            },
          }}
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  backgroundColor: "#3e3e3e",
                  color: "white",
                },
              },
            },
          }}
          onChange={(e) => setWeek(e.target.value)}
          fullWidth
        >
          {[...Array(5)].map((_, i) => (
            <MenuItem key={i + 1} value={i + 1}>
              Week {i + 1}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Bar Chart */}
      <Box sx={{ mb: 4 }}>
        <Bar data={chartData} options={chartOptions} />
      </Box>

      {/* Total Spend */}
      <Typography variant="h6" sx={{ color: "white" }}>
        <span style={{color:"#F78D6A"}}>Total Spend in Week {week}: </span> ₹{totalSpend.toFixed(2)}
      </Typography>
    </Box>
  );
};

export default DailySpends;
