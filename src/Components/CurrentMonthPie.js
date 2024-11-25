import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, TextField, MenuItem } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CurrentMonthPie = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Current month (1-based)
  const [year, setYear] = useState(new Date().getFullYear()); // Current year
  const [pieData, setPieData] = useState({ labels: [], datasets: [] });
  const [totalSpends, setTotalSpends] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const email = localStorage.getItem("userData");

  // Category colors for the pie chart
  const categoryColors = {
    Housing: "#FF6384",
    Food: "#36A2EB",
    Transportation: "#FFCE56",
    Bills: "#4BC0C0",
    Healthcare: "#FF9F40",
    "Personal Care": "#9966FF",
    Entertainment: "#FFB6C1",
    Shopping: "#FFD700",
    Other: "#8A2BE2",
  };

  useEffect(() => {
    fetchMonthlyData(email, year, month);
  }, [month, year]);

  const fetchMonthlyData = async (email, selectedYear, selectedMonth) => {
    try {
      const response = await axios.get("https://expense-wise-api.vercel.app/api/current-month", {
      // const response = await axios.get(
      //   "http://localhost:5000/api/current-month",
      //   {
          params: {
            email: email,
            year: selectedYear,
            month: selectedMonth,
          },
        }
      );

      console.log("Current Month Data:", response.data);

      const expensesData = response.data.expenses || [];
      const incomeData = response.data.income || [];

      // Process expenses by category
      const categoryData = expensesData.reduce((acc, expense) => {
        const category = expense.category || "Other"; // Default to "Other" if category is missing
        acc[category] = (acc[category] || 0) + expense.amount;
        return acc;
      }, {});

      // Set pie chart data
      const chartLabels = Object.keys(categoryData);
      const chartDataset = Object.values(categoryData);

      // Set the colors for each category based on predefined colors
      const chartColors = chartLabels.map(
        (label) => categoryColors[label] || "#808080"
      ); // Default to gray if no color

      setPieData({
        labels: chartLabels,
        datasets: [
          {
            label: "Spending by Category",
            data: chartDataset,
            backgroundColor: chartColors,
            hoverOffset: 4,
          },
        ],
      });

      // Calculate total spends and earnings
      const totalSpend = expensesData.reduce(
        (acc, expense) => acc + expense.amount,
        0
      );
      const totalEarn = incomeData.reduce(
        (acc, income) => acc + income.amount,
        0
      );

      setTotalSpends(totalSpend);
      setTotalEarnings(totalEarn);
    } catch (error) {
      console.error(
        "Error fetching current month data:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" color="primary" sx={{ mb: 3, color: "white" }}>
        Current Month Pie Chart:
      </Typography>

      {/* Year and Month Selector */}
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
          ].map((monthName, index) => (
            <MenuItem key={index} value={index + 1}>
              {monthName}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Pie Chart and Legend */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center", // Center vertically
          justifyContent: "center", // Center horizontally
          gap: 4, // Space between chart and legend
        }}
      >
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Typography
            variant="body1"
            sx={{
              color: "white",
              textAlign: "left",
            }}
          >
            {/* Custom legend content */}
            {pieData.labels.map((label, index) => (
              <Box
                key={label}
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    backgroundColor:
                      pieData.datasets[0]?.backgroundColor[index],
                    borderRadius: "50%",
                    mr: 1,
                  }}
                />
                {label}
              </Box>
            ))}
          </Typography>
        </Box>

        <Box sx={{ flex: 2, maxWidth: "40%" }}>
          <Pie
            data={pieData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false }, // Hide default legend
                title: { display: true, text: `Expenses for ${month} ${year}` },
              },
            }}
          />
        </Box>
      </Box>

      {/* Total Spend and Earn */}
      <Box sx={{ justifyContent: "start", mt: 1 }}>
        <Typography variant="h6" sx={{ color: "white" }}>
          <span style={{ color: "#F78D6A" }}>Total Spend: </span> ₹
          {totalSpends.toFixed(2)}
        </Typography>
        <Typography variant="h6" sx={{ color: "white" }}>
          <span style={{ color: "#F78D6A" }}>Total Earn: </span> ₹
          {totalEarnings.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default CurrentMonthPie;
