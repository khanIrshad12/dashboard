
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetwwen"


type Props = {
    icon?:React.ReactNode,
    title:string,
    subtitle?:string,
    sideText:string
}


const BoxHeader = ({icon,title,subtitle,sideText}: Props) => {
    const {palette}=useTheme();
  return (
    <FlexBetween 
    color={palette.grey[300]}
    margin="1.5rem 1rem 0 1rem"
    >
        <FlexBetween>
            {icon}
            <Box width="100%">
                <Typography variant="h4" >
                    {title}
                </Typography>
                <Typography variant="h6">
                    {subtitle}
                </Typography>
            </Box>
        </FlexBetween>
        <Typography variant="h5" fontWeight={700} color="#f5c377" >
            {sideText}
        </Typography>
    </FlexBetween>
  )
}

export default BoxHeader;