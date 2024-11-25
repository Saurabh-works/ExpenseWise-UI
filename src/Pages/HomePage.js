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
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "#282826",
          color: "#ffffff",
          minHeight: "100vh",
          padding: { xs: "5%", sm: "4%", md: "3%" },
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
            paddingX: { xs: "1px", sm: "15px", md: "20px" },
          }}
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center"}}>
              <img
                src={logo}
                alt="ExpenseWise Logo"
                style={{ height: "40px", marginRight: "10px" }}
              />
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "1rem", sm: "1.5rem", md: "1.8rem" },
                }}
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
                fontSize: { xs: "0.6rem", sm: "1rem" },
                marginRight: { xs: "5px", sm: "10px" },
                "&:hover": { bgcolor: "#3A3A36" },
                // width:{xs:"7px"}
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
                fontSize: { xs: "0.6rem", sm: "1rem" },
                "&:hover": { bgcolor: "#3A3A36" },
                // width:{xs:"20px"}
              }}
            >
              Sign Up
            </Button>
          </Toolbar>
        </AppBar>

        {/* Content */}
        <Container sx={{ marginTop: { xs: "20px", sm: "40px", md: "50px" } }}>
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="space-between"
          >
            {/* Left Section */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                textAlign: { xs: "center", md: "left" },
                paddingX: { xs: "1%", sm: "4%", md: "2%" },
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "1.5rem", sm: "2.2rem", md: "2.8rem" },
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
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.3rem" },
                  
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
                  fontSize: { xs: "0.9rem", sm: "1rem" },
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
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-end" },
                marginTop: { xs: "20px", md: "0px" },
              }}
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
      <Footer />
    </>
  );
};

export default HomePage;
