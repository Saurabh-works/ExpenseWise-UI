import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ paddingX: "2%", bgcolor: "#282826"}} >
      <Box
        sx={{
          bgcolor: "#282826",
          color: "#ffffff",
          textAlign: "center",
          borderTop: "1px solid #F78D6A", // Top border with F78D6A color
          padding: { xs: "5px", sm: "1%", md: "2%"},
        }}
      >
        <Typography variant="body2" sx={{fontSize:{xs:'10px', sm:"15px", md:"18px"}}}>
          Copyright © 2024 Saurabh Shinde ❤️ All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
