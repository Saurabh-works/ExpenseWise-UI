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
      await axios.post("https://expense-wise-api.vercel.app/api/incomes/add", { ...formData, email });
      // await axios.post("http://localhost:5000/api/incomes/add", {
      //   ...formData,
      //   email,
      // });
      alert("Income added successfully!");
      setFormData({
        date: "",
        day: "",
        category: "",
        description: "",
        amount: "",
      });
    } catch (error) {
      console.error(
        "Error adding income:",
        error.response || error.message || error
      );
      alert(error.response?.data?.message || "Failed to add income.");
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
            borderBottomColor:"#F78D6A",
          }}
        >
          <span style={{ borderBottom: "1px solid #F78D6A", margin: "auto", paddingBottom:"2px" }}>
            {" "}
            Add Income
          </span>
        </Typography>

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

        {/* Day Dropdown */}
        <TextField
          label="Day"
          select
          fullWidth
          margin="normal"
          sx={responsiveInputStyle}
          value={formData.day}
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
          onChange={(e) => setFormData({ ...formData, day: e.target.value })}
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
        >
          Submit
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
