import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, MenuItem, Alert, Snackbar } from "@mui/material";

const Income = () => {
  const [formData, setFormData] = useState({
    date: "",
    day: "",
    category: "",
    description: "",
    amount: "",
  });
  const [alert, setAlert] = useState(null); // To handle success or error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("userData"); // Get email from localStorage

    try {
      // Send the form data to the backend
      await axios.post("https://expense-wise-api.vercel.app/api/incomes/add", {
        ...formData,
        email,
      });

      // Set success alert
      setAlert({ message: "Income added successfully!", severity: "success" });

      // Reset form data
      setFormData({
        date: "",
        day: "",
        category: "",
        description: "",
        amount: "",
      });
    } catch (error) {
      console.error("Error adding income:", error);
      // Set error alert
      setAlert({ message: "Failed to add income.", severity: "error" });
    }
  };

  // Automatically close the alert after 2 seconds
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 2000);
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [alert]);

  return (
    <Box
      sx={{
        backgroundColor: "#282826",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: { xs: 2, sm: 4, md: 6 },
      }}
    >
      {/* Global Alert Header */}
      {alert && (
        <Snackbar
          open={Boolean(alert)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity={alert.severity}
            variant="outlined"
            sx={{
              width: "100%",
              backgroundColor: "#383838", // Optional: Match form styling
              color: "white",
            }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          padding: { xs: 3, sm: 4, md: 5 },
          width: { xs: "90%", sm: "70%", md: "400px" },
          borderRadius: 2,
          backgroundColor: "#383838",
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
            Add Income
          </span>
        </Typography>

        {/* Date Input */}
        <TextField
          label="Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          margin="normal"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          sx={responsiveInputStyle}
        />

        {/* Day Dropdown */}
        <TextField
          label="Day"
          select
          fullWidth
          margin="normal"
          value={formData.day}
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
          onChange={(e) => setFormData({ ...formData, day: e.target.value })}
          sx={responsiveInputStyle}
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
          value={formData.category}
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
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          sx={responsiveInputStyle}
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
          sx={responsiveInputStyle}
        />

        {/* Amount Input */}
        <TextField
          label="Amount"
          type="number"
          fullWidth
          margin="normal"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          sx={responsiveInputStyle}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#F78D6A",
            color: "#ffffff",
            fontWeight: "bold",
            mt: 3,
            paddingY: 1,
            fontSize: { xs: "0.9rem", sm: "1rem" },
            "&:hover": { bgcolor: "#a3644e" },
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

// Reusable Input Style
const responsiveInputStyle = {
  "& .MuiOutlinedInput-root": {
    "& .MuiSelect-select": {
      color: "white", // Ensures the default selected value appears white
    },
    "& input": {
      color: "white", // Input text color
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
};

export default Income;
