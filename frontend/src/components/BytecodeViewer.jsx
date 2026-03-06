import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BytecodeViewer({ instructions = [], currentIndex = -1, onInstructionClick }) {
  if (!instructions || instructions.length === 0) {
    return (
      <div className="devtools-panel h-full flex flex-col">
        <div className="devtools-header">📊 Bytecode Instructions</div>
        <div className="devtools-content flex items-center justify-center text-gray-500">
          <p>No bytecode available. Compile code to see instructions.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="devtools-panel h-full flex flex-col">
      <div className="devtools-header flex items-center justify-between">
        <span>📊 Bytecode Instructions</span>
        <span className="text-xs text-gray-500">{instructions.length} instructions</span>
      </div>
      <div className="devtools-content overflow-y-auto space-y-0.5">
        <AnimatePresence>
          {instructions.map((instr, idx) => (
            <motion.div
              key={idx}
              className={`bytecode-instruction cursor-pointer ${
                idx === currentIndex ? 'active' : ''
              }`}
              onClick={() => onInstructionClick && onInstructionClick(idx)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.02 }}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-start space-x-3">
                <span className="text-gray-500 w-8">{instr.index}:</span>
                <span className="text-jvm-blue font-semibold">{instr.opcode}</span>
                {instr.operand && (
                  <span className="text-gray-400">{instr.operand}</span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
