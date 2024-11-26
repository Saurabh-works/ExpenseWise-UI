import React, { useState } from "react";
import axios from "axios";
import vid from "../Assets/Black Hat 3D Animated Icon (2).mp4";
import { Box, TextField, Button, Typography, Container, Alert } from "@mui/material";
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
      const response = await axios.post("https://expense-wise-api.vercel.app/api/auth/login", {
        email,
        password,
      });

      // Check for success message
      if (response.data.message === "Login successful") {
        setAlertMessage("Login Successful!");
        setAlertSeverity("success");
        navigate("/dashboard");
        localStorage.setItem("userData", email);
      } else {
        setAlertMessage(response.data.message || "An error occurred during login.");
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
          position: "relative", // Enable absolute positioning for the alert
        }}
      >
        {/* Alert message at the top-center */}
        {alertMessage && (
          <Alert
            severity={alertSeverity} // 'success' or 'error'
            sx={{
              position: "absolute",
              top: "10%",
              left: "50%",
              transform: "translateX(-50%)", // Center it horizontally
              width: "80%", // You can adjust width as needed
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
              zIndex: 1, // Ensure it's above other elements
            }}
          >
            {alertMessage}
          </Alert>
        )}

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
            sx={{ input: { color: "#ffffff" }, bgcolor: "#4A4A4A", borderRadius: 1 }}
          />
          <TextField
            label="Password"
            type="password"
            variant="filled"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ input: { color: "#ffffff" }, bgcolor: "#4A4A4A", borderRadius: 1 }}
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
