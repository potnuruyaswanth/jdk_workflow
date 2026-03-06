import React from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp } from 'lucide-react';

export default function JITCompiler({ hotspotDetected = false, compilationProgress = 0 }) {
  return (
    <motion.div className="glass-panel p-6">
      <h3 className="text-primary font-bold mb-4 flex items-center space-x-2">
        <span className="w-3 h-3 bg-purple-500 rounded-full" />
        <span>JIT Compiler</span>
      </h3>
      
      {/* Hotspot Detection */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-slate-300 mb-2">Hotspot Detection</h4>
        <motion.div
          className={`p-4 rounded-lg border-2 ${
            hotspotDetected 
              ? 'border-yellow-500 bg-yellow-500/10' 
              : 'border-slate-700 bg-slate-800/30'
          }`}
          animate={{
            boxShadow: hotspotDetected 
              ? ['0 0 0 0 rgba(234, 179, 8, 0.7)', '0 0 0 10px rgba(234, 179, 8, 0)']
              : 'none'
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-300">
              {hotspotDetected ? '🔥 Hotspot Active' : '⏳ Monitoring...'}
            </span>
            <Zap size={16} className={hotspotDetected ? 'text-yellow-500' : 'text-slate-500'} />
          </div>
        </motion.div>
      </div>

      {/* Compilation Progress */}
      {hotspotDetected && (
        <motion.div className="mb-4">
          <h4 className="text-sm font-semibold text-slate-300 mb-2">Compilation Progress</h4>
          <div className="space-y-2">
            {['Analysis', 'Optimization', 'Code Generation'].map((phase, idx) => (
              <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>{phase}</span>
                  <span>{Math.round((idx + 1) / 3 * 100)}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <motion.div 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-1.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(idx + 1) / 3 * 100}%` }}
                    transition={{ delay: idx * 0.3, duration: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Performance Metrics */}
      <motion.div 
        className="p-3 bg-purple-600/10 rounded text-xs text-slate-300 border border-purple-600/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="flex items-center space-x-2 mb-2">
          <TrendingUp size={14} className="text-purple-400" />
          <strong>Performance Improvement</strong>
        </p>
        <p className="ml-6">Compiled code executes 10-100x faster than interpreted bytecode.</p>
      </motion.div>
    </motion.div>
  );
}
