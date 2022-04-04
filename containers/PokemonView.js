import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Alert from "../components/Alert";
import Height from "../img/resize.png";
import Grid from "@mui/material/Grid";
import Weight from "../img/weight-scale.png";
import { useSelector, useDispatch } from "react-redux";
import { setValue, selectList, incrementAsync } from "../redux/itemsSlice.js";
import { Typography } from "@mui/material";
import { typeColors } from "../components/typeColors";
import Container from "@mui/material/Container";
const PokemonView = () => {
  const [loading, setLoading] = useState(true);
  let count = useSelector(selectList);
  const { id } = useParams();
  const store = count[id];

  useEffect(() => {
    if (store) {
      setLoading(false);
    }
  }, []);

  return (
    <Container>
      {loading ? (
        <Alert text="404 Not found" />
      ) : (
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{ width: "100%", maxWidth: "400px" }}
              src={store.sprites.front_default}
            />
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h3" style={{ fontWeight: "500" }}>
              {store.name}
            </Typography>
            <Typography
              variant="p"
              style={{ fontWeight: "200", margin: " 15px 0 10px 0" }}
            >
              Types:
            </Typography>
            <Box sx={{ display: "flex" }}>
              {store.types
                ? store.types.map((el, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          backgroundColor: typeColors[el.type.name],
                          textAlign: "center ",
                          borderRadius: "30px",
                          lineHeight: "2px",
                          color: "white",
                          marginRight: "5px",
                        }}
                      >
                        <p style={{ padding: "0 15px" }}>{el.type.name}</p>
                      </div>
                    );
                  })
                : "No type"}
            </Box>
            <Box sx={{ display: "flex", marginTop: "20px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img style={{ width: "35px" }} src={Height}></img>
                {store.height}
              </Box>
              <Box
                sx={{
                  marginLeft: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  style={{ width: "35px", marginRight: "10px" }}
                  src={Weight}
                ></img>
                {store.weight}
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default PokemonView;
