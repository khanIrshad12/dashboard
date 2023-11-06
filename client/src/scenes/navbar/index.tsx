import { useState } from "react";
import { Link } from "react-router-dom";
import PixIcon from '@mui/icons-material/Pix';
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetwwen";

type Props = {};

const NavBar = (props: Props) => {
  const { palette } = useTheme();{/* useTheme is use to select the customize themeSetting which we have created */ }
  const [selected, setselected] = useState("dashboard")
  return (
    <FlexBetween ml="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
        {/*left side*/}
      <FlexBetween gap="0.25rem">
        <PixIcon sx={{fontSize:'28px'}} />
        <Typography variant="h4">Financerr</Typography>
      </FlexBetween>

      {/*Right Side */}
      <FlexBetween gap="2rem">
        <Box sx={{"&hover":{color:palette.grey[300]}}}>
            <Link to="/"
            onClick={()=>setselected("dashboard")}
            style={{color: selected==="dashboard" ? "inherit" : palette.grey[700] ,textDecoration: "inherit"}}
            
            >
                Dashboard
            </Link>
        </Box>
        <Box sx={{"&hover":{color:palette.grey[300]}}}>
            <Link to="/Predictions"
            onClick={()=>setselected("Predictions")}
            style={{color: selected==="Predictions" ? "inherit" : palette.grey[700] ,textDecoration: "inherit"}}
            >
                Predictions
            </Link>
        </Box>
      </FlexBetween>

    </FlexBetween>
  );
};
export default NavBar;
