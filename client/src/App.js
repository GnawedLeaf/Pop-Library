import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";


// We import all the components we need in our app
import Navbar from "./components/Navbar/Navbar";
//import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Home from "./components/home"

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>

        <Route exact path="/" element={<Home />} /> 
        <Route path="/records" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />

      </Routes>
    </div>
  );
};

export default App;
