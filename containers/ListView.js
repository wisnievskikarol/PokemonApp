import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { setValue, selectList, fetchItems } from "../redux/itemsSlice.js";
import { fetchPokemons } from "../api/fetchData";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import CardItem from "../components/CardItem";
import Alert from "../components/Alert";
import { Link } from "react-router-dom";
const ListView = () => {
  const [loading, setLoading] = useState(true);
  const [loadingFailed, setLoadingFailed] = useState(false);
  const [extraItemsLoading, setExtraItemsLoading] = useState(false);
  const store = useSelector(selectList);
  const [items, setItems] = useState(store);
  const offset = useSelector((state) => state.pokemons.currentEnd);
  const status = useSelector((state) => state.pokemons.status);
  const error = useSelector((state) => state.pokemons.error);
  const [filters, setFilters] = useState({ name: "", type: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading && !store.length) {
      const fetchData = async () => {
        try {
          const res = await fetchPokemons(1, 21);
          console.log("XDD", res);
          dispatch(setValue(res));
          setItems(res);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setLoadingFailed(true);
        }
      };
      fetchData();
    } else {
      setLoading(false);
      setItems(store);
    }
  }, []);

  useEffect(() => {
    switch (status) {
      case "idle":
        setExtraItemsLoading(false);
        break;
      case "failed":
        setExtraItemsLoading(true);
        break;
      case "loading":
        setExtraItemsLoading(true);
    }
    setItems(store);
    filterItems();
  }, [store, status]);

  useEffect(() => {
    filterItems();
  }, [filters]);

  const filterItems = () => {
    setItems(
      store.filter((el) => {
        return (
          el.name.includes(filters.name) &&
          el.types.filter((element) => {
            return element.type.name.startsWith(filters.type);
          }).length
        );
      })
    );
  };

  return (
    <Container>
      <Box sx={{ marginTop: "150px" }}>
        <p>Filters : </p>
        <TextField
          onChange={(e) => {
            setFilters({ ...filters, name: e.target.value });
          }}
          id="outlined-basic"
          label="Name"
          variant="outlined"
        />
        <TextField
          onChange={(e) => {
            setFilters({ ...filters, type: e.target.value });
          }}
          id="outlined-basic"
          label="Typ"
          variant="outlined"
        />
      </Box>
      {loading ? (
        <Box
          sx={{
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : !loadingFailed ? (
        <>
          {!items.length && !loading ? (
            <Alert text="no results" />
          ) : (
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {items.map((value, index) => (
                  <Grid item xs={4} sm={4} md={4} key={index}>
                    <Link to={`/profil/${index}`}>
                      <CardItem key={index} data={value}></CardItem>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {extraItemsLoading ? (
            error !== "SyntaxError" ? (
              <Box
                sx={{
                  margin: "100px 0",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              !extraItemsLoading && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "40px 0",
                  }}
                >
                  <p>No more results</p>
                </Box>
              )
            )
          ) : (
            <Box
              sx={{
                margin: "100px 0",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                sx={{
                  borderRadius: "30px",
                  "&:hover": {
                    backgroundColor: "#0093AB",
                    color: "white",
                    boxShadow: "0px 0px 50px -37px rgba(66, 68, 90, 1)",
                  },
                }}
                variant="outlined"
                onClick={() => {
                  dispatch(fetchItems(offset));
                }}
              >
                Load more
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Alert text="Failed loading " />
      )}
    </Container>
  );
};

export default ListView;
