import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import PokemonView from "./containers/PokemonView";
import ListView from "./containers/ListView";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<ListView />} />
        <Route path="/profil/:id" element={<PokemonView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
