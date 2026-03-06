import React from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, ChevronLeft, ChevronRight, Pause } from 'lucide-react';

export default function StepController({ 
  currentStep = 0, 
  totalSteps = 15,
  isRunning = false,
  onNext,
  onPrev,
  onRun,
  onReset
}) {
  return (
    <motion.div 
      className="glass-panel p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-primary font-bold mb-4">Execution Controls</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {/* Run Button */}
        <motion.button
          onClick={onRun}
          className="btn-primary flex items-center justify-center space-x-2 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isRunning ? (
            <>
              <Pause size={18} />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play size={18} />
              <span>Run</span>
            </>
          )}
        </motion.button>

        {/* Previous Button */}
        <motion.button
          onClick={onPrev}
          disabled={currentStep === 0}
          className="btn-secondary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft size={18} />
          <span>Previous</span>
        </motion.button>

        {/* Next Button */}
        <motion.button
          onClick={onNext}
          disabled={currentStep >= totalSteps - 1}
          className="btn-secondary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Next</span>
          <ChevronRight size={18} />
        </motion.button>

        {/* Reset Button */}
        <motion.button
          onClick={onReset}
          className="btn-secondary flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw size={18} />
          <span>Reset</span>
        </motion.button>
      </div>

      {/* Step Counter */}
      <div className="flex items-center justify-between text-sm text-slate-300 p-3 bg-slate-800/50 rounded">
        <span>Step Progress</span>
        <span className="text-primary font-bold">{currentStep + 1} / {totalSteps}</span>
      </div>

      {/* Speed Control */}
      <div className="mt-4">
        <label className="text-xs text-slate-400 mb-2 block">Simulation Speed</label>
        <input 
          type="range" 
          min="0.5" 
          max="2" 
          step="0.5"
          defaultValue="1"
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
          style={{
            background: 'linear-gradient(to right, rgba(0,217,255,0.2), rgba(0,217,255,0.5))'
          }}
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>Slow</span>
          <span>1x</span>
          <span>Fast</span>
        </div>
      </div>
    </motion.div>
  );
}
