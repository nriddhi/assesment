import React from "react";
import "./App.css";
import axios from 'axios';
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { useSelector } from "react-redux";

axios.defaults.baseURL=process.env.REACT_APP_API_URL;

const CrudApp = () => {

  const {currentUser} = useSelector((state)=> state.user);

  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={currentUser? <Home />: <Auth/>} />
        <Route path="/home" element={currentUser? <Home />: <Auth/>} />
        <Route path="/products" element={currentUser? <Home />: <Auth/>} />
        <Route path="/auth" element={currentUser? <Home />: <Auth/>} />
      </Routes>
    </div>
  );
};

export default CrudApp;
