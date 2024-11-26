import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, MenuItem, Alert } from "@mui/material";

const Income = () => {
  const [formData, setFormData] = useState({
    date: "",
    day: "",
    category: "",
    description: "",
    amount: "",
  });
  const [error, setError] = useState(null); // To store error messages
  const [isSubmitting, setIsSubmitting] = useState(false); // For disabling submit button during submission

  // Function to get the day of the week based on date
  const getDayOfWeek = (date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayIndex = new Date(date).getDay();
    return days[dayIndex];
  };

  // Auto-fill day when date changes
  useEffect(() => {
    if (formData.date) {
      const day = getDayOfWeek(formData.date);
      setFormData((prevData) => ({ ...prevData, day }));
    }
  }, [formData.date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { date, day, category, description, amount } = formData;
    const email = localStorage.getItem("userData");

    // Simple validation: Ensure all fields are filled out
    if (!date || !day || !category || !description || !amount) {
      setError("All fields are required.");
      return;
    }

    if (amount <= 0) {
      setError("Amount must be a positive number.");
      return;
    }

    setError(null); // Reset error state if validation passes
    setIsSubmitting(true); // Disable the submit button while submitting

    try {
      await axios.post("https://expense-wise-api.vercel.app/api/incomes/add", { ...formData, email });
      // await axios.post("http://localhost:5000/api/incomes/add", { ...formData, email });
      alert("Income added successfully!");
      setFormData({
        date: "",
        day: "",
        category: "",
        description: "",
        amount: "",
      });
    } catch (error) {
      console.error("Error adding income:", error.response || error.message || error);
      setError(error.response?.data?.message || "Failed to add income.");
    } finally {
      setIsSubmitting(false); // Re-enable the submit button after submission
    }
  };

  const handleReset = () => {
    setFormData({
      date: "",
      day: "",
      category: "",
      description: "",
      amount: "",
    });
    setError(null); // Reset any error messages
  };

  return (
    <Box
      sx={{
        backgroundColor: "#282826",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          padding: { xs: 3, sm: 4, md: 5 },
          backgroundColor: "#383838",
          width: { xs: "90%", sm: "70%", md: "40%" },
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h6"
          color="white"
          sx={{
            textAlign: "center",
            marginBottom: 3,
            fontSize: { xs: "1.2rem", sm: "1.5rem" },
            fontWeight: "bold",
            borderBottomColor: "#F78D6A",
          }}
        >
          <span style={{ borderBottom: "1px solid #F78D6A", margin: "auto", paddingBottom: "2px" }}>
            {" "}
            Add Income
          </span>
        </Typography>

        {/* Error Message */}
        {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}

        {/* Date Input */}
        <TextField
          label="Date"
          type="date"
          fullWidth
          margin="normal"
          sx={responsiveInputStyle}
          InputLabelProps={{ shrink: true }}
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />

        {/* Day Dropdown (auto-filled based on date) */}
        <TextField
          label="Day"
          select
          fullWidth
          margin="normal"
          sx={responsiveInputStyle}
          value={formData.day}
          disabled // Disable day input, as it is auto-filled
        >
          {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
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
          sx={responsiveInputStyle}
          value={formData.category}
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
          sx={responsiveInputStyle}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        {/* Amount Input */}
        <TextField
          label="Amount"
          type="number"
          fullWidth
          margin="normal"
          sx={responsiveInputStyle}
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            marginTop: 3,
            bgcolor: "#F78D6A",
            color: "white",
            fontWeight: "bold",
            "&:hover": { bgcolor: "#a3644e" },
            paddingY: { xs: 1, sm: 1.2 },
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
          disabled={isSubmitting} // Disable submit button while submitting
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>

        {/* Reset Button */}
        <Button
          type="button"
          variant="outlined"
          fullWidth
          sx={{
            marginTop: 2,
            color: "white",
            borderColor: "#F78D6A",
            fontWeight: "bold",
            "&:hover": { borderColor: "#a3644e", color: "#a3644e" },
            paddingY: { xs: 1, sm: 1.2 },
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
          onClick={handleReset}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

// Reusable Styles for Inputs
const responsiveInputStyle = {
  "& .MuiOutlinedInput-root": {
    "& input": {
      color: "white",
    },
    "&:hover fieldset": {
      borderColor: "gray",
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
};

export default Income;
