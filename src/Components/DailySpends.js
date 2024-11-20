import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, TextField, MenuItem } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DailySpends = () => {
  // Define getCurrentWeek above useState
  const getCurrentWeek = () => {
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startOfYear) / (1000 * 60 * 60 * 24));
    return Math.ceil((days + 1) / 7); // Calculate the current week number
  };

  const [week, setWeek] = useState(getCurrentWeek()); // Default to current week
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Current month (1-based)
  const [year, setYear] = useState(new Date().getFullYear()); // Current year
  const [dailyData, setDailyData] = useState([]);
  const [totalSpend, setTotalSpend] = useState(0);
  const email = localStorage.getItem("userData");

  useEffect(() => {
    fetchWeeklyData(email, year, month, week);
  }, [week, month, year]);

  const fetchWeeklyData = async (email, selectedYear, selectedMonth, selectedWeek) => {
    try {
      const response = await axios.get("http://localhost:5000/api/daily-spends", {
        params: {
          email,
          year: selectedYear,
          month: selectedMonth,
          week: selectedWeek,
        },
      });

      console.log("Weekly Spend Data:", response.data);

      setDailyData(response.data.dailySpends);
      setTotalSpend(response.data.totalSpend);
    } catch (error) {
      console.error("Error fetching daily spend data:", error.response?.data || error.message);
    }
  };

  const chartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Daily Spend ($)",
        data: dailyData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
        Weekly Spending
      </Typography>

      {/* Year, Month, Week Selector */}
      <Box sx={{ mb: 4, display: "flex", gap: 2 }}>
        <TextField
          label="Year"
          select
          value={year}
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
          onChange={(e) => setWeek(e.target.value)}
          fullWidth
        >
          {[...Array(5)].map((_, i) => {
            return (
              <MenuItem key={i + 1} value={i + 1}>
                Week {i + 1}
              </MenuItem>
            );
          })}
        </TextField>
      </Box>

      {/* Bar Chart */}
      <Box sx={{ mb: 4 }}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              title: { display: true, text: `Daily Spend for Week ${week}, ${month} ${year}` },
            },
          }}
        />
      </Box>

      {/* Total Spend */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Total Spend on Week {week}: ${totalSpend.toFixed(2)}</Typography>
      </Box>
    </Box>
  );
};

export default DailySpends;
