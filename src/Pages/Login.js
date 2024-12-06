import React, { useState } from "react";
import axios from "axios";
import vid from "../Assets/Black Hat 3D Animated Icon (2).mp4";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState(""); // State to handle alert message
  const [alertSeverity, setAlertSeverity] = useState(""); // State to handle severity (success/error)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://expense-wise-api.vercel.app/api/auth/login",
        {
          email,
          password,
        }
      );

      // Check for success message
      if (response.data.message === "Login successful") {
        setAlertMessage("Login Successful!");
        setAlertSeverity("success");
        navigate("/dashboard");
        localStorage.setItem("userData", email);
      } else {
        setAlertMessage(
          response.data.message || "An error occurred during login."
        );
        setAlertSeverity("error");
      }
    } catch (error) {
      setErrorMessage("An error occurred during login. Please try again.");
      setAlertMessage("Login Failed");
      setAlertSeverity("error");
    }
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <>
      <Box sx={{ position: "absolute", top: 0, width: "100%", zIndex: 1 }}>
        {/* Alert message at the top-center, smaller, outlined */}
        {alertMessage && (
          <Alert
            severity={alertSeverity} // 'success' or 'error'
            variant="outlined" // Outlined variant
            sx={{
              width: "50%", // Smaller width
              margin: "10px auto", // Center it with margin
              fontSize: { xs: "0.8rem", sm: "0.9rem" }, // Small font size
              borderColor: alertSeverity === "error" ? "#d32f2f" : "#388e3c", // Customize border color based on severity
              color: alertSeverity === "error" ? "#d32f2f" : "#388e3c", // Customize text color based on severity
            }}
          >
            {alertMessage}
          </Alert>
        )}
      </Box>

      <Header />
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "#282826",
          padding: { xs: "5%", sm: "3%", md: "2%" },
        }}
      >
        <Typography
          variant="h4"
          color="#F78D6A"
          gutterBottom
          sx={{
            borderBottom: "1px solid #F78D6A",
            marginBottom: 4,
            marginTop: -3,
            fontSize: { xs: "130%", sm: "130%" },
          }}
        >
          Login
        </Typography>

        <Box
          sx={{
            bgcolor: "#383838",
            padding: { xs: "20px", sm: "30px" },
            borderRadius: 2,
            width: { xs: "100%", sm: "80%", md: "400px" },
            maxWidth: "400px",
            textAlign: "center",
            marginX: "auto",
          }}
        >
          <Box
            sx={{
              width: "100px",
              height: "100px",
              margin: "0 auto 20px auto",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <video
              src={vid}
              autoPlay
              loop
              muted
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>

          <TextField
            label="Email"
            variant="filled"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              input: {
                color: "#ffffff", // Default text color
              },
              "& .MuiFilledInput-root": {
                bgcolor: "#4A4A4A", // Background color
                borderRadius: 1, // Rounded corners
                // border: "1px solid transparent", // Initial border
                "&:hover": {
                  bgcolor: "#5A5A5A", // Background on hover
                },
                ":before": {
                  borderBottomColor: "#555", // Default underline color
                },
                ":after": {
                  borderBottomColor: "#F78D6A", // Focused underline color
                },
              },
              "& .MuiInputLabel-root": {
                color: "#c7c7c7", // Label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#ffffff", // Label color on focus
              },
            }}
          />

          <TextField
            label="Password"
            type="password"
            variant="filled"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              input: {
                color: "#ffffff", // Default text color
              },
              "& .MuiFilledInput-root": {
                bgcolor: "#4A4A4A", // Background color
                borderRadius: 1, // Rounded corners
                border: "1px solid transparent", // Initial border
                "&:hover": {
                  bgcolor: "#5A5A5A", // Background on hover
                },
                ":before": {
                  borderBottomColor: "#555", // Default underline color
                },
                ":after": {
                  borderBottomColor: "#F78D6A", // Focused underline color
                },
              },
              "& .MuiInputLabel-root": {
                color: "#c7c7c7", // Label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#ffffff", // Label color on focus
              },
            }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            sx={{
              bgcolor: "#F78D6A",
              color: "#ffffff",
              fontWeight: "bold",
              mt: 2,
              paddingY: 1,
              "&:hover": { bgcolor: "#a3644e" },
            }}
          >
            Submit
          </Button>

          <Typography
            align="right"
            sx={{ mt: 2, color: "#ffffff", fontSize: "0.9rem" }}
          >
            Not a member yet?{" "}
            <span
              style={{ color: "#F78D6A", cursor: "pointer" }}
              onClick={handleSignUpClick}
            >
              Join
            </span>
          </Typography>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
