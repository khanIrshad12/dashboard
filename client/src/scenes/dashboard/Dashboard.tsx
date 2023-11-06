import Row1 from "@/scenes/dashboard/Row1";
import Row2 from "@/scenes/dashboard/Row2";
import Row3 from "@/scenes/dashboard/Row3";
import { Box, useMediaQuery } from "@mui/material";
const gridTempleteLargeScreen = `
    "a b c"
    "a b c"
    "a b c"
    "a b f"
    "d e f"
    "d e f"
    "d h i"
    "g h i"
    "g h j"
    "g h j"  
 `;
const gridTempleteSmallScreen = `
    
      "a"
      "a"
      "a"
      "a"
      "b"
      "b"
      "b"
      "b"
      "c"
      "c"
      "c"
      "d"
      "d"
      "d"
      "e"
      "e"
      "f"
      "f"
      "f"
      "g"
      "g"
      "g"
      "h"
      "h"
      "h"
      "h"
      "i"
      "i"
      "j"
      "j"
       
 `;

const Dashboard = () => {
  const isAboveMediumScreen = useMediaQuery("(min-width:1200px)");
  return (
    <Box
      display="grid"
      position="relative"
      width="100%"
      height="100%"
      gap="1.5rem"
      sx={
        isAboveMediumScreen
          ? {
              gridTempleteColumns: "repeat(3,minmax(370px, 1fr))",
              gridTemplateRows: "repeat(10,minmax(60px,1fr))",
              gridTemplateAreas: gridTempleteLargeScreen,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: gridTempleteSmallScreen,
            }
      }
    >
      <Row1 />
      <Row2 />
      <Row3 />
    </Box>
  );
};

export default Dashboard;
