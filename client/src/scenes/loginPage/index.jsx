import React from 'react'
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material"
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme(); //to use the colours
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return 
    <Box>
      <Box width="100% backgroundColor={theme.pallete.background.alt}" p="1rem 6%" textAligh ="center">
        <Typography
        fontWeight="bold"
        fontSize="32px"
        color="primary"
        sx={{
          "&:hover": {
            color: primaryLight,
            cursor: "pointer",
          },
        }}
      >
        Muslim Mastery
      </Typography>
      </Box>
      <Box width={isNonMobileScreens ? "50%" : "93%"}
      p="2rem"
      m="2rem auto"
      borderRadius="1.5rem"
      backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem"}}>
          Welcome to Muslim Mastery, the one-stop Social Media place where students and teachers align their intentions in knowledge seeking and mastering them! 
        </Typography>

      </Box>
    </Box>;
}; 

export default LoginPage;