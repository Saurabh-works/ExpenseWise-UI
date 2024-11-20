import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, TextField, MenuItem } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
  
      const response = await axios.get(`http://localhost:5000/api/monthly-spends`, {
        params: {
          email: email, // Pass email properly
          year: year,   // Pass the selected year
        },
      });
      console.log("Monthly Spend Data:", response.data);
      setData(response.data); // Set the data for charting
    } catch (error) {
      console.error("Error fetching monthly spend data:", error.response?.data || error.message);
    }
  };
  

 
  const chartData = {
    labels: [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December",
    ],
    datasets: [
      {
        label: "Total Spend ($)",
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
        Monthly Spends
      </Typography>

      {/* Year Selector */}
      <Box sx={{ mb: 4, width: 200 }}>
        <TextField
          label="Year"
          select
          fullWidth
          value={year}
          onChange={(e) => setYear(e.target.value)}
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
      </Box>

      {/* Bar Chart */}
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: `Monthly Spends for ${year}` },
          },
        }}
      />
    </Box>
  );
};

export default MonthlySpends;
