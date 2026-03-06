import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap } from 'lucide-react';

const MachineInstruction = ({ instruction, index }) => (
  <motion.div
    className="flex items-center space-x-3 p-2 font-mono text-xs bg-slate-800/50 rounded"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05 }}
  >
    <span className="text-cyan-400">mov</span>
    <span className="text-slate-400">{instruction}</span>
  </motion.div>
);

export default function NativeExecution({ isExecuting = false }) {
  const nativeInstructions = [
    'eax, [ebp-4]',
    'ecx, 5',
    'eax, ecx',
    'edx, [eax]'
  ];

  return (
    <motion.div className="glass-panel p-6">
      <h3 className="text-primary font-bold mb-4 flex items-center space-x-2">
        <span className="w-3 h-3 bg-cyan-500 rounded-full" />
        <span>Native Machine Code</span>
      </h3>
      
      {/* Speed Indicator */}
      <div className="mb-4 p-4 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-lg border border-cyan-600/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-slate-300">Execution Speed</span>
          <Zap size={16} className="text-cyan-400" />
        </div>
        <motion.div 
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"
          animate={{ 
            scale: isExecuting ? [1, 1.1, 1] : 1,
          }}
          transition={{ duration: 0.5, repeat: isExecuting ? Infinity : 0 }}
        >
          {isExecuting ? '⚡ MAX SPEED' : '✓ Optimized'}
        </motion.div>
      </div>

      {/* Native Instructions */}
      <div className="mb-4">
        <p className="text-sm text-slate-300 mb-2">Native x86-64 Instructions:</p>
        <div className="space-y-1">
          {nativeInstructions.map((instr, idx) => (
            <MachineInstruction key={idx} instruction={instr} index={idx} />
          ))}
        </div>
      </div>

      {/* Info Box */}
      <motion.div 
        className="p-3 bg-cyan-600/10 rounded text-xs text-slate-300 border border-cyan-600/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="flex items-center space-x-2 mb-1">
          <Cpu size={14} className="text-cyan-400" />
          <strong>Direct CPU Execution</strong>
        </p>
        <p className="ml-6">Compiled native code executes directly on the CPU without interpretation overhead.</p>
      </motion.div>
    </motion.div>
  );
}
