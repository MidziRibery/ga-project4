import React from 'react'
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material"

const LoginPage = () => {
  const theme = useTheme(); //to use the colours
  const isNonMobileScreens = useMediaQuery("(min)")
  return (
    <div>LoginPage11</div>
  )
}

export default LoginPage;