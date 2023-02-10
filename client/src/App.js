import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";



function App() {
//add state and selector
const mode = useSelector((state) => state.mode); // help grab value that we set in initial state under state/index.js into the correct reducer
const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // to set the theme
const isAuth = Boolean(useSelector((state) => state.token))//whether they are logged in or not. if the token exists, means they are authorised

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>

            <Routes>
              <Route path='/' element={<LoginPage/>} />
              <Route path='/home' element={isAuth ? <HomePage/> : <Navigate to="/" />} />
              <Route path='/profile/:userId' element={isAuth ? <ProfilePage/> : <Navigate to="/" />} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
