import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./home/About";
import Home from "./home/Home";
import Navigation from "./css/Navigation";

function App() {
  return (
  <BrowserRouter>
    <Navigation />
    <Routes>
    <Route path="/" exact={true} element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
