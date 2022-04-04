import React from "react";
import PsyDuck from "../img/psyduck2.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
const Alert = (props) => {
  return (
    <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <Box
        sx={{
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#FFD36E",
          margin: "40px 0",
          padding: "20px 50px",
        }}
      >
        <img alt="test" style={{ maxWidth: "300px" }} src={PsyDuck}></img>
        <Typography variant="h3" sx={{ fontWeight: "300" }}>
          {props.text}
        </Typography>
      </Box>
    </Box>
  );
};

export default Alert;
