import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Visualizer from './pages/Visualizer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-jvm-darker text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visualizer" element={<Visualizer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
