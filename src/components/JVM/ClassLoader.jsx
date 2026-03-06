import React from 'react';
import { motion } from 'framer-motion';

export default function ClassLoader({ isActive }) {
  const classLoaders = [
    { name: 'Bootstrap Class Loader', classes: 'Core Java classes' },
    { name: 'Extension Class Loader', classes: 'Extended classes' },
    { name: 'Application Class Loader', classes: 'User-defined classes' }
  ];

  return (
    <motion.div 
      className={`glass-panel p-6 ${isActive ? 'border-primary ring-1 ring-primary' : ''}`}
      layout
    >
      <h3 className="text-primary font-bold mb-4 flex items-center space-x-2">
        <span className="w-3 h-3 bg-primary rounded-full" />
        <span>Class Loader</span>
      </h3>
      
      <div className="space-y-3">
        {classLoaders.map((loader, idx) => (
          <motion.div
            key={idx}
            className="border-l-2 border-primary/50 pl-4 py-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <p className="text-sm font-semibold text-slate-200">{loader.name}</p>
            <p className="text-xs text-slate-400 mt-1">{loader.classes}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-primary/5 rounded text-xs text-slate-300">
        <p>The Class Loader loads .class files into memory and verifies bytecode.</p>
      </div>
    </motion.div>
  );
}
