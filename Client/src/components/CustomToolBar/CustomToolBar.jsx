import React from 'react'
import { Button, Box } from "@mui/material";
import dayjs from "dayjs";

function CustomToolbar ({ handleCalenderSelect }) {
  const handleTodayClick = () => {
    handleCalenderSelect(dayjs());
  };

  const handleClearClick = () => {
    handleCalenderSelect(null);
  };
 
  return (
    <Box
      sx={{ marginTop: "-20px" , marginBottom: "5px"  , paddingLeft: "15px" , paddingRight: "15px" , width: "100%", display: "flex", justifyContent: "space-between" }}
    >
      <Button onClick={handleClearClick}>Clear</Button>
      <Button onClick={handleTodayClick}>Today</Button>
    </Box>
  );
};

export default CustomToolbar;