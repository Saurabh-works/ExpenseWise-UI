import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  CssBaseline,
} from "@mui/material";

// Import images from Assets
import logo from "../Assets/logo-Photoroom.jpg";
import placeholderImage from "../Assets/Home Page image new.png";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Navigate to the login page
    navigate("/login");
  };

  const handleSignUpClick = () => {
    // Navigate to the SignUp page
    navigate("/signup");
  };


  return (
    <>
      <Box
        sx={{
          bgcolor: "#282826",
          color: "#ffffff",
          minHeight: "100vh",
          padding: { xs: "5%", sm: "3%", md: "2%" }, // Responsive padding
        }}
      >
        <CssBaseline />

        {/* Header */}
        <AppBar
          position="static"
          sx={{
            bgcolor: "#282826",
            borderBottom: "2px solid #ffffff",
            borderBottomColor: "#F78D6A",
            boxShadow: 0,
            padding: { xs: "5px", sm: "1%" },
          }}
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
              <img
                src={logo}
                alt="ExpenseWise Logo"
                style={{ height: "40px", marginRight: "10px" }}
              />
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                <span style={{ color: "#F78D6A" }}>Expense</span>Wise
              </Typography>
            </Box>
            <Button
              color="inherit"
              variant="outlined"
              onClick={handleLoginClick}
              sx={{
                borderColor: "#F78D6A",
                color: "#ffffff",
                fontWeight: "bold",
                marginRight: { xs: "5px", sm: "1%" },
                "&:hover": { bgcolor: "#3A3A36" },
              }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              onClick={handleSignUpClick}
              sx={{
                borderColor: "#F78D6A",
                color: "#ffffff",
                fontWeight: "bold",
                "&:hover": { bgcolor: "#3A3A36" },
              }}
            >
              Sign Up
            </Button>
          </Toolbar>
        </AppBar>

        {/* Content */}
        <Container sx={{ marginTop: { xs: "20px", sm: "50px" } }}>
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="space-between"
          >
            {/* Left Section */}
            <Grid item xs={12} md={6} sx={{ textAlign: "left" }}>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "1.8rem", sm: "2.5rem", md: "2.8rem" },
                }}
              >
                Transform the Way You Track Your Expenses With{" "}
                <span style={{ color: "#F78D6A" }}>ExpenseWise</span>
              </Typography>
              <Typography
                variant="subtitle1"
                component="p"
                sx={{
                  lineHeight: 1.6,
                  marginBottom: 3,
                  fontStyle: "italic",
                  fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" },
                }}
              >
                "Take control of your budget and achieve financial peace of
                mind. With detailed expense tracking and powerful visual tools,
                our platform provides a clear picture of your spending,
                empowering you to make better financial decisions"
              </Typography>
              <Button
                variant="contained"
                onClick={handleLoginClick}
                sx={{
                  bgcolor: "#F78D6A",
                  color: "#ffffff",
                  fontWeight: "bold",
                  paddingX: { xs: 2, sm: 3 },
                  paddingY: { xs: 1, sm: 1.5 },
                  border: "1px solid transparent",
                  "&:hover": { bgcolor: "#a3644e", borderColor: "#ffffff" },
                  
                }}
              >
                Let's Start
              </Button>
            </Grid>

            {/* Right Section */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Box
                component="img"
                src={placeholderImage}
                alt="Expense Tracking Visual"
                sx={{
                  width: "100%",
                  maxWidth: { xs: "250px", sm: "350px", md: "400px" },
                  borderRadius: 1,
                  boxShadow: 0,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer></Footer>
    </>
  );
};

export default HomePage;
