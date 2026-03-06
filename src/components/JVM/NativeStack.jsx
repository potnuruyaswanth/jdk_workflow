import React from 'react';
import { motion } from 'framer-motion';

export default function NativeStack({ isActive }) {
  const nativeMethods = [
    'System.gc()',
    'Math.sqrt()',
    'File I/O operations',
    'Thread management'
  ];

  return (
    <motion.div 
      className={`glass-panel p-6 ${isActive ? 'border-primary ring-1 ring-primary' : ''}`}
      layout
    >
      <h3 className="text-primary font-bold mb-4 flex items-center space-x-2">
        <span className="w-3 h-3 bg-yellow-500 rounded-full" />
        <span>Native Method Stack</span>
      </h3>
      
      <div className="space-y-2 mb-4">
        {nativeMethods.map((method, idx) => (
          <motion.div
            key={idx}
            className="flex items-center space-x-2 text-sm text-slate-300 p-2 rounded hover:bg-slate-800/50"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <span className="w-2 h-2 bg-yellow-500 rounded-full" />
            <span>{method}</span>
          </motion.div>
        ))}
      </div>

      <div className="p-3 bg-yellow-600/10 rounded text-xs text-slate-300 border border-yellow-600/20">
        <p><strong>Native Code Execution</strong></p>
        <p className="mt-1">Contains native methods written in C/C++. Per-thread stack created when thread calls native code.</p>
      </div>
    </motion.div>
  );
}
