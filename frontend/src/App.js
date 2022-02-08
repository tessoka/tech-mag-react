import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import News from "./Components/News";
import Footerbar from "./Components/Footerbar";
import Timer from './Components/Timer'
import { useState } from 'react'

function App() {
  
  return (
    <Router>
      <div className="App">
        {/* <Timer expiry={expiry} /> */}
        <header>
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            {/*<Route path="/login" element={<Login />} />*/}
          </Routes>
        </main>
        <footer>
          <Footerbar />
        </footer>
      </div>
    </Router>
   
  );
}

export default App;
