import React from 'react';
import { motion } from 'framer-motion';

const BytecodeInstruction = ({ instruction, index, isActive }) => (
  <motion.div
    className={`flex items-center space-x-3 p-3 rounded-lg font-mono text-xs ${
      isActive ? 'bg-blue-600/20 border border-blue-400' : 'bg-slate-800/50'
    }`}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05 }}
    whileHover={{ x: 4 }}
  >
    <span className="text-blue-400 font-bold min-w-[30px]">{index + 1}.</span>
    <span className="text-slate-300">{instruction}</span>
  </motion.div>
);

export default function Interpreter({ step = 0 }) {
  const instructions = [
    'aload_0',
    'aload_1',
    'invokespecial #1 <init>',
    'return'
  ];

  return (
    <motion.div className="glass-panel p-6">
      <h3 className="text-primary font-bold mb-4 flex items-center space-x-2">
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
        <span>Bytecode Interpreter</span>
      </h3>
      
      <div className="space-y-2 mb-4">
        <p className="text-sm text-slate-300 mb-4">Executing bytecode instructions:</p>
        {instructions.map((instr, idx) => (
          <BytecodeInstruction 
            key={idx}
            instruction={instr}
            index={idx}
            isActive={idx === (step % instructions.length)}
          />
        ))}
      </div>

      <div className="p-3 bg-blue-600/10 rounded text-xs text-slate-300 border border-blue-600/20">
        <p><strong>Interpretation Process</strong></p>
        <p className="mt-1">Each bytecode instruction is interpreted and executed immediately in order.</p>
      </div>
    </motion.div>
  );
}
