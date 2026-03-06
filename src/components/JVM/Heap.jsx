import React from 'react';
import { motion } from 'framer-motion';

const ObjectBlock = ({ name, size, index }) => (
  <motion.div
    className="bg-gradient-to-br from-red-600 to-pink-600 rounded-lg p-3 text-white text-xs"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.05 }}
  >
    <p className="font-semibold">{name}</p>
    <p className="opacity-75">{size}KB</p>
  </motion.div>
);

export default function Heap({ objects = [], isActive }) {
  const sampleObjects = objects.length > 0 ? objects : [
    { name: 'String obj', size: 12 },
    { name: 'Integer obj', size: 8 },
    { name: 'Array obj', size: 24 },
  ];

  return (
    <motion.div 
      className={`glass-panel p-6 ${isActive ? 'border-primary ring-1 ring-primary' : ''}`}
      layout
    >
      <h3 className="text-primary font-bold mb-4 flex items-center space-x-2">
        <span className="w-3 h-3 bg-red-500 rounded-full" />
        <span>Heap Memory</span>
      </h3>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        {sampleObjects.map((obj, idx) => (
          <ObjectBlock key={idx} {...obj} index={idx} />
        ))}
      </div>

      <div className="flex justify-between text-xs text-slate-400 mb-3">
        <span>Total Heap Usage</span>
        <span>{sampleObjects.reduce((sum, obj) => sum + obj.size, 0)}KB / 256MB</span>
      </div>

      <div className="w-full bg-slate-800 rounded-full h-2 mb-4">
        <motion.div 
          className="bg-gradient-to-r from-red-600 to-pink-600 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(sampleObjects.reduce((sum, obj) => sum + obj.size, 0) / 256000) * 100}%` }}
          transition={{ duration: 1 }}
        />
      </div>

      <div className="p-3 bg-red-600/10 rounded text-xs text-slate-300 border border-red-600/20">
        <p>Heap is shared across all threads. Garbage collector manages memory automatically.</p>
      </div>
    </motion.div>
  );
}
