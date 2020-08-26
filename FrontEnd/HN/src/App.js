import React from 'react';
import './App.css';
import Navbar from "./component/layout/Navbar";
import Footer from "./component/layout/Footer";

function App() {
  return (
    <div className="App">
        <Navbar />
      <h1>Home Screen</h1>
        <Footer />
    </div>
  );
}

export default App;
