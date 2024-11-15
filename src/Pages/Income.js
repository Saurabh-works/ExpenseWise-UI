import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";

const Income = () => {
  const [formData, setFormData] = useState({
    date: "",
    day: "",
    category: "",
    description: "",
    amount: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("userData");
    console.log("Sending income data:", { ...formData, email });

    try {
      await axios.post("http://localhost:5000/api/incomes/add", { ...formData, email });
      alert("Income added successfully!");
      setFormData({ date: "", day: "", category: "", description: "", amount: "" });
    } catch (error) {
      console.error("Error adding income:", error);
      alert("Failed to add income.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
      <Typography variant="h6" color="primary">
        Add Income
      </Typography>
      
      {/* Date Input */}
      <TextField
        label="Date"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
      />

      {/* Day Dropdown */}
      <TextField
        label="Day"
        select
        fullWidth
        margin="normal"
        value={formData.day}
        onChange={(e) => setFormData({ ...formData, day: e.target.value })}
      >
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
          <MenuItem key={day} value={day}>
            {day}
          </MenuItem>
        ))}
      </TextField>

      {/* Category Dropdown */}
      <TextField
        label="Category"
        select
        fullWidth
        margin="normal"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      >
        {["Salary", "Borrowing Money", "Side Income", "Other"].map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>

      {/* Description Input */}
      <TextField
        label="Description"
        fullWidth
        margin="normal"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />

      {/* Amount Input */}
      <TextField
        label="Amount"
        type="number"
        fullWidth
        margin="normal"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
      />

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Add Income
      </Button>
    </Box>
  );
};

export default Income;
