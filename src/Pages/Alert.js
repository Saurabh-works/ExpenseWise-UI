import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";

const Alert = () => {
  const [alertType, setAlertType] = useState("daily");
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    setLoading(true);
    const userEmail = localStorage.getItem("userData");
    if (!userEmail) {
      console.error("User email not found. Please log in.");
      return;
    }

    try {
      const { data } = await axios.get("https://expense-wise-api.vercel.app/api/alerts", {
        params: { userEmail },
      });
      setAlerts(data);
    } catch (error) {
      console.error("Error fetching alerts:", error.response?.data || error.message);
      setSnackbarMessage("Error fetching alerts.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleAlert = async () => {
    const userEmail = localStorage.getItem("userData");
    if (!userEmail) {
      alert("User email not found. Please log in.");
      return;
    }

    if (!/^\d{2}:\d{2}$/.test(time)) {
      alert("Please enter a valid time in HH:mm format.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        userEmail,
        type: alertType,
        time,
        day: alertType !== "daily" ? day : null,
      };
      await axios.post("https://expense-wise-api.vercel.app/api/alerts", payload);
      fetchAlerts();
      setSnackbarMessage("Alert scheduled successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error scheduling alert:", error.response?.data || error.message);
      setSnackbarMessage("Error scheduling alert.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAlert = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`https://expense-wise-api.vercel.app/api/alerts/${id}`);
      fetchAlerts();
      setSnackbarMessage("Alert deleted successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error deleting alert:", error.response?.data || error.message);
      setSnackbarMessage("Error deleting alert.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

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

  return (
    <Box sx={{ padding: 4, color: "white" }}>
      <Typography variant="h5" sx={{ mb: 3, color: "white" }}>
        <span style={{borderBottomColor:"#F78D6A"}} >Schedule Alerts</span>
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Alert Type"
          select
          value={alertType}
          onChange={(e) => setAlertType(e.target.value)}
          fullWidth
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
          sx={responsiveInputStyle}
        >
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </TextField>
        {alertType !== "daily" && (
          <TextField
            label={alertType === "weekly" ? "Day of Week" : "Day of Month"}
            select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            fullWidth
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
            {alertType === "weekly"
              ? [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].map((dayName, index) => (
                  <MenuItem key={index} value={index}>
                    {dayName}
                  </MenuItem>
                ))
              : Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                ))}
          </TextField>
        )}
        <TextField
          label="Time (HH:mm)"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={responsiveInputStyle}
        />
      </Box>
      <Button
        variant="contained"
        onClick={handleScheduleAlert}
        sx={{
          bgcolor: "#F78D6A",
          color: "#ffffff",
          fontWeight: "bold",
          mt: 1,
          paddingY: 1,
          "&:hover": { bgcolor: "#a3644e" },
        }}
      >
        {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Schedule Alert"}
      </Button>

      <Typography variant="h6" sx={{ mt: 4, mb: 2, color: "#F78D6A" }}>
      <span style={{borderBottomColor:"#F78D6A"}} >Alerts History:</span>
      </Typography>
      <TableContainer component={Paper} sx={{ backgroundColor: "#2c2c2c", color: "white" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Alert Type</TableCell>
              <TableCell sx={{ color: "white" }}>Day</TableCell>
              <TableCell sx={{ color: "white" }}>Time</TableCell>
              <TableCell sx={{ color: "white" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alerts.map((alert) => (
              <TableRow key={alert._id} sx={{ "&:hover": { backgroundColor: "#444" } }}>
                <TableCell sx={{ color: "white" }}>{alert.type}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {alert.type === "weekly"
                    ? [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ][alert.day]
                    : alert.day || "N/A"}
                </TableCell>
                <TableCell sx={{ color: "white" }}>{alert.time}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteAlert(alert._id)}
                    disabled={loading}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar for success or error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default Alert;
