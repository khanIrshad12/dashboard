import { createTheme } from "@mui/material/styles";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { Routes,Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import NavBar from '@/scenes/navbar/index';
import Dashboard from "@/scenes/dashboard/Dashboard";
import Prediction from "./scenes/prediction";

function App() {
  const theme= useMemo(()=>createTheme(themeSettings),[]); //its use to store custom themesetting file AND its will load at first mount
  return (
      <div className="app">
        <BrowserRouter>
        
          <ThemeProvider theme={theme} > {/*If you wish to customize the theme, you need to use the ThemeProvider component in order to inject a theme into your application*/}
            <CssBaseline/>
            <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
              <NavBar />
              <Routes>
                <Route path="/" element={<Dashboard />} />

                <Route path="/predictions" element={<Prediction />} />
              </Routes>
            </Box>
          </ThemeProvider>
        </BrowserRouter>
      </div>
  )
}
export default App
