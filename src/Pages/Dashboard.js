import React from "react";
import RecentExpenses from "../Components/RecentExpenses";
import MonthlySpends from "../Components/MonthlySpends";
import CurrentMonthPie from "../Components/CurrentMonthPie";
import DailySpends from "../Components/DailySpends";
import { Typography, Divider, Box } from "@mui/material";

const Dashboard = () => {
  return (
    <>
      <Typography
        variant="h6"
        color="white"
        sx={{ paddingBottom: "1%", display: "flex", alignItems: "center" }}
      >
        <span style={{ borderBottom: "1px solid #F78D6A", margin: "auto" }}>
          Dashboards
        </span>
      </Typography>

      <Box sx={{ paddingY: 2 }}>
        <RecentExpenses />
      </Box>

      <Divider
        sx={{
          borderColor: "#F78D6A",
          marginY: 2,
          borderWidth: "1px",
          opacity: 0.7,
        }}
      />

      <Box sx={{ paddingY: 2 }}>
        <MonthlySpends />
      </Box>

      <Divider
        sx={{
          borderColor: "#F78D6A",
          marginY: 2,
          borderWidth: "1px",
          opacity: 0.7,
        }}
      />

      <Box sx={{ paddingY: 2 }}>
        <CurrentMonthPie />
      </Box>

      <Divider
        sx={{
          borderColor: "#F78D6A",
          marginY: 2,
          borderWidth: "1px",
          opacity: 0.7,
        }}
      />

      <Box sx={{ paddingY: 2 }}>
        <DailySpends />
      </Box>
    </>
  );
};

export default Dashboard;
