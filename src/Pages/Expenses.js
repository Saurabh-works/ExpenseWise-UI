import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";

const Expenses = () => {
  const [formData, setFormData] = useState({
    date: "",
    day: "",
    category: "",
    description: "",
    amount: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("userData"); // Get email from localStorage

    try {
      // await axios.post("http://localhost:5000/api/expenses/add", {
        await axios.post("https://expense-wise-api.vercel.app/api/expenses/add", {
        ...formData,
        email,
      });
      alert("Expense added successfully!");
      setFormData({
        date: "",
        day: "",
        category: "",
        description: "",
        amount: "",
      });
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense.");
    }
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
            borderBottomColor:"#F78D6A",
          }}
        >
          <span style={{ borderBottom: "1px solid #F78D6A", margin: "auto", paddingBottom:"2px" }}>
            {" "}
            Add Expense
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
          onChange={(e) => setFormData({ ...formData, day: e.target.value })}
          sx={responsiveInputStyle}
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
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          sx={responsiveInputStyle}
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
        >
          {[
            "Housing",
            "Food",
            "Transportation",
            "Bills",
            "Healthcare",
            "Personal Care",
            "Entertainment",
            "Shopping",
            "Other",
          ].map((category) => (
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
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
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
    "& input": {
      color: "white", // Input text color
    },
    // "& fieldset": {
    //   borderColor: "gray", // Default border color
    // },
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

export default Expenses;
