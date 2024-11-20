// pages/Dashboard.js
import React, { useState } from "react";
import RecentExpenses from "../Components/RecentExpenses";
import MonthlySpends from "../Components/MonthlySpends";
import CurrentMonthPie from "../Components/CurrentMonthPie";
import DailySpends from "../Components/DailySpends";


const Dashboard = () => {

  return (
    <>
      <h1>Dashboard</h1>
      <RecentExpenses/>
      <MonthlySpends/>
      <CurrentMonthPie/>
      <DailySpends/>
    </>
  );
};

export default Dashboard;
