import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, RotateCcw } from 'lucide-react';

export default function BytecodeDebugger({ 
  currentStep, 
  totalSteps, 
  isRunning,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onReset,
  stack = [],
  locals = {},
  description = ''
}) {
  return (
    <div className="devtools-panel">
      <div className="devtools-header">🐛 Bytecode Debugger</div>
      <div className="devtools-content space-y-4">
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={isRunning ? onPause : onPlay}
              className="p-2 bg-jvm-blue hover:bg-jvm-blue/80 rounded text-black transition"
              disabled={currentStep >= totalSteps - 1}
            >
              {isRunning ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button
              onClick={onPrev}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition"
              disabled={currentStep === 0 || isRunning}
            >
              <SkipBack size={16} />
            </button>
            <button
              onClick={onNext}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition"
              disabled={currentStep >= totalSteps - 1 || isRunning}
            >
              <SkipForward size={16} />
            </button>
            <button
              onClick={onReset}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition"
            >
              <RotateCcw size={16} />
            </button>
          </div>
          <div className="text-sm text-gray-400">
            Step {currentStep + 1} / {totalSteps}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-jvm-blue"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Current Instruction Description */}
        {description && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3 text-sm text-gray-300">
            <p className="font-semibold text-jvm-blue mb-1">Current Operation:</p>
            <p>{description}</p>
          </div>
        )}

        {/* Stack State */}
        <div>
          <p className="text-xs font-semibold text-gray-400 mb-2">Stack State:</p>
          <div className="space-y-1">
            {stack.length === 0 ? (
              <div className="text-gray-600 text-xs italic">Stack is empty</div>
            ) : (
              stack.slice().reverse().map((item, idx) => (
                <motion.div
                  key={stack.length - idx}
                  className="stack-item"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  {typeof item === 'object' ? JSON.stringify(item) : item}
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Local Variables */}
        {Object.keys(locals).length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-400 mb-2">Local Variables:</p>
            <div className="bg-gray-800/50 rounded p-3 space-y-1 font-mono text-xs">
              {Object.entries(locals).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-400">var[{key}]:</span>
                  <span className="text-jvm-green">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
