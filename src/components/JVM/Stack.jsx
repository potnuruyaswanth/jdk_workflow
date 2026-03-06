import React from 'react';
import { motion } from 'framer-motion';

const StackFrame = ({ method, locals, index }) => (
  <motion.div
    className="border-2 border-green-600 rounded-lg p-4 bg-green-600/5"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.15 }}
  >
    <h4 className="text-green-400 font-semibold text-sm">{method}</h4>
    <ul className="mt-2 space-y-1">
      {locals.map((local, idx) => (
        <li key={idx} className="text-xs text-slate-300 ml-2">• {local}</li>
      ))}
    </ul>
  </motion.div>
);

export default function Stack({ frames = [], isActive }) {
  const sampleFrames = frames.length > 0 ? frames : [
    { method: 'main()', locals: ['args: String[]', 'count: int = 0'] },
    { method: 'println()', locals: ['value: String', 'stream: PrintStream'] },
  ];

  return (
    <motion.div 
      className={`glass-panel p-6 ${isActive ? 'border-primary ring-1 ring-primary' : ''}`}
      layout
    >
      <h3 className="text-primary font-bold mb-4 flex items-center space-x-2">
        <span className="w-3 h-3 bg-green-500 rounded-full" />
        <span>Stack Memory</span>
      </h3>
      
      <div className="space-y-3 mb-4">
        {sampleFrames.map((frame, idx) => (
          <StackFrame 
            key={idx}
            method={frame.method}
            locals={frame.locals}
            index={idx}
          />
        ))}
      </div>

      <motion.div 
        className="border-l-4 border-green-600 bg-green-600/5 p-3 rounded text-xs text-slate-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p><strong>Lifo (Last In First Out)</strong></p>
        <p className="text-xs mt-1">Stack frames are created on method calls and destroyed on returns.</p>
      </motion.div>
    </motion.div>
  );
}
