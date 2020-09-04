import React from 'react';
import { BrowserRouter as Router , Route } from 'react-router-dom';
import Navbar from "./component/layout/Navbar";
import Landing from "./component/layout/Landing";
import Footer from "./component/layout/Footer";
import Register from "./component/auth/Register";
import './App.css';

function App() {
  return (
    <div className="App">
        <Navbar />
        <Landing />
        <Footer />
    </div>
  );
}

export default App;