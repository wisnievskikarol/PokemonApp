import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { typeColors } from "./typeColors";

const CardItem = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px 0",
      }}
    >
      <img
        style={{ width: "80%" }}
        src={props.data.sprites.front_default}
      ></img>
      <Typography
        style={{ fontWeight: "500", marginBottom: "15px" }}
        variant="h4"
      >
        {props.data.name}
      </Typography>
      <div style={{ display: "flex" }}>
        {props.data.types
          ? props.data.types.map((el, index) => {
              return (
                <div
                  style={{
                    backgroundColor: typeColors[el.type.name],
                    textAlign: "center ",
                    borderRadius: "30px",
                    lineHeight: "2px",
                    color: "white",
                    marginRight: "5px",
                  }}
                  key={index}
                >
                  <p style={{ padding: "0 15px" }}>{el.type.name}</p>
                </div>
              );
            })
          : "No type"}
      </div>
    </Box>
  );
};

export default CardItem;
