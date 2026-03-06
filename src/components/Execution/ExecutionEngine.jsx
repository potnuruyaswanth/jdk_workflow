import React from 'react';
import { motion } from 'framer-motion';

export default function ExecutionEngine({ currentStep = 0, isActive }) {
  return (
    <motion.div 
      className={`glass-panel p-6 ${isActive ? 'border-primary ring-1 ring-primary' : ''}`}
      layout
    >
      <h3 className="text-primary font-bold mb-4">Execution Engine</h3>
      
      <div className="space-y-4">
        {/* Interpreter */}
        <motion.div 
          className="border-l-4 border-blue-600 bg-blue-600/5 p-4 rounded"
          whileHover={{ x: 4 }}
        >
          <h4 className="text-blue-400 font-semibold text-sm mb-2">Interpreter</h4>
          <p className="text-xs text-slate-300">Converts bytecode to machine code instruction by instruction.</p>
          <div className="mt-3 text-xs text-slate-400">
            <p>• Slower but startup is faster</p>
            <p>• No compilation overhead</p>
          </div>
        </motion.div>

        {/* JIT Compiler */}
        <motion.div 
          className="border-l-4 border-purple-600 bg-purple-600/5 p-4 rounded"
          whileHover={{ x: 4 }}
        >
          <h4 className="text-purple-400 font-semibold text-sm mb-2">JIT Compiler</h4>
          <p className="text-xs text-slate-300">Compiles frequently executed code into native machine code.</p>
          <div className="mt-3 text-xs text-slate-400">
            <p>• Faster execution after compilation</p>
            <p>• Used for hotspots</p>
          </div>
        </motion.div>

        {/* Garbage Collector */}
        <motion.div 
          className="border-l-4 border-green-600 bg-green-600/5 p-4 rounded"
          whileHover={{ x: 4 }}
        >
          <h4 className="text-green-400 font-semibold text-sm mb-2">Garbage Collector</h4>
          <p className="text-xs text-slate-300">Automatically manages memory by removing unused objects.</p>
          <div className="mt-3 text-xs text-slate-400">
            <p>• Prevents memory leaks</p>
            <p>• Runs on separate thread</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
