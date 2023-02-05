import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";



function App() {
//add state and selector
const mode = useSelector((state) => state.mode); // help grab value that we set in initial state under state/index.js into the correct reducer
const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // to set the theme

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/home' element={<HomePage/>} />
            <Route path='/profile/:userId' element={<ProfilePage/>} />
          </Routes>
          </ThemeProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
