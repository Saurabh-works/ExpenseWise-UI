import React, { useState } from "react";
import axios from "axios";
import vid from "../Assets/Black Hat 3D Animated Icon (2).mp4";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending data:", { name, email, password });

    try {
      const response = await axios.post("https://expense-wise-api.vercel.app/api/auth/signup", {
      // const response = await axios.post(
      //   "http://localhost:5000/api/auth/signup",
      //   {
          name,
          email,
          password,
        }
      );

      console.log("Response received:", response.data);

      if (response.data.message === "User created successfully") {
        navigate("/login");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert("An error occurred during signup. Please try again.");
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
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
          Sign Up
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
            label="Name"
            variant="filled"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              input: { color: "#ffffff" },
              bgcolor: "#4A4A4A",
              borderRadius: 1,
            }}
          />
          <TextField
            label="Email"
            variant="filled"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              input: { color: "#ffffff" },
              bgcolor: "#4A4A4A",
              borderRadius: 1,
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
              input: { color: "#ffffff" },
              bgcolor: "#4A4A4A",
              borderRadius: 1,
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
            Already a member?{" "}
            <span
              style={{ color: "#F78D6A", cursor: "pointer" }}
              onClick={handleLoginClick}
            >
              Login
            </span>
          </Typography>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default SignUp;
