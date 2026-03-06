import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';
import Home from './pages/Home';
import Simulator from './pages/Simulator';
import Architecture from './pages/Architecture';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-dark text-white">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/architecture" element={<Architecture />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
