import React from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.nav 
      className="bg-glass backdrop-blur-md border-b border-primary/20 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/50 transition-all">
              <span className="text-dark font-bold">J</span>
            </div>
            <span className="text-white font-bold hidden sm:inline">Java Visualizer</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-white hover:text-primary transition-colors">Home</Link>
            <Link to="/simulator" className="text-white hover:text-primary transition-colors">Simulator</Link>
            <Link to="/architecture" className="text-white hover:text-primary transition-colors">Architecture</Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div 
            className="md:hidden pb-4 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Link to="/" className="block px-4 py-2 text-white hover:text-primary hover:bg-primary/10 rounded">Home</Link>
            <Link to="/simulator" className="block px-4 py-2 text-white hover:text-primary hover:bg-primary/10 rounded">Simulator</Link>
            <Link to="/architecture" className="block px-4 py-2 text-white hover:text-primary hover:bg-primary/10 rounded">Architecture</Link>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
